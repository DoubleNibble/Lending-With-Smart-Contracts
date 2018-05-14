pragma solidity ^0.4.18;
import "../installed_contracts/jsmnsol-lib/contracts/JsmnSolLib.sol";
import "../installed_contracts/bytesutils.sol";
import "../installed_contracts/tlsnutils.sol";

contract Lending {

  /***********************************/
  /******* CONTRACT ATTRIBUTES *******/
  /***********************************/

  struct LendingContract {
    uint lendingID;
    address proposer;
    address acceptor;
    uint borrowedAmount;
    uint interestRatePremium;
    uint startTime;
    uint endTime;
    uint lendingTimePeriod;
    uint collateralAssetID;
    bool filled;
    bool deleted;
  }

  struct AssetOwnership {
    uint assetID;
    address owner;
    uint value;
    bool borrowedAgainst;
  }

  address public master;

  uint public time1;
  uint public time2;

  uint[] lendingIDs;
  uint lendingContractCount;
  mapping(uint => LendingContract) public allLendingContracts;

  uint[] assetIDs;
  uint assetCount;
  mapping(uint => AssetOwnership) public allAssets;

  /***********************************/
  /************* MODIFIERS ***********/
  /***********************************/

  modifier isOwner() {
    require(msg.sender == master);
    _; // continue executing rest of method body
  }

  /***********************************/
  /************** EVENTS *************/
  /***********************************/

  event AssetChange(uint assetID);
  event LendingContractChange(uint lendingID);

  /***********************************/
  /********* PUBLIC FUNCTIONS ********/
  /***********************************/

  /// @dev      Lending contract constructor sets initial lending contract count to 0
  function Lending() public {
    master = msg.sender;
    lendingContractCount = 0;
    assetCount = 0;
  }

  /// @dev                      Allows a user with an asset to request a loan
  /// @param  _assetID          The json file passing the interest rate
  /// @param  _borrowAmount     The amount wanted to be borrowed by the user
  /// @param  _premium          The number of basis points above the interest rate willing to be paid
  /// @param  _lending_period   The number of weeks the user wants to borrow the money for
  /// @param  _hex_proof        The number of weeks the user wants to borrow the money for
  function borrowFunds(uint _assetID, uint _borrowAmount, uint _premium, uint _lending_period, bytes memory _hex_proof) public payable {
    require(!allAssets[_assetID].borrowedAgainst);
    require(allAssets[_assetID].value >= _borrowAmount);
    require(allAssets[_assetID].owner == msg.sender);

    // Work out the Bank of England Base Interest Rate from Hex Proof
    // Verify the TLS-N Proof
    require(verifyProof(_hex_proof));

    // Check that the funds transferred into the contract are equl to the number of weeks money required and above base rate
    // The individual will need to transfer enough funds in to cover the entire period, even if withdraw early

    // Setup Contract
    uint lendingID = (lendingContractCount++)+1000;
    lendingIDs.push(lendingID);
    allLendingContracts[lendingID] = LendingContract(lendingID, msg.sender, 0, _borrowAmount, _premium, 0, 0, _lending_period, _assetID, false, false);
    LendingContractChange(lendingID);
  }

  /// @dev                  Allows a user to lend funds to another user
  /// @param  _lendingID    The ID of the lending contract to be fulfilled
  function lendFunds(uint _lendingID) public payable {
    require(msg.value == allLendingContracts[_lendingID].borrowedAmount);
    require(!allLendingContracts[_lendingID].filled);
    allLendingContracts[_lendingID].proposer.transfer(msg.value);
    allLendingContracts[_lendingID].filled = true;
    allLendingContracts[_lendingID].acceptor = msg.sender;
    allLendingContracts[_lendingID].startTime = now;
    allLendingContracts[_lendingID].endTime = now + (allLendingContracts[_lendingID].lendingTimePeriod * 1 weeks);
  }

  /// @dev                  Allows the original user who borrowed funds to pay the money back
  /// @param  _lendingID    The ID of the lending contract to be paid back
  function payFundsBack(uint _lendingID) public payable {
    require(allLendingContracts[_lendingID].proposer == msg.sender);
    require(allLendingContracts[_lendingID].borrowedAmount == msg.value);
    require(allLendingContracts[_lendingID].filled);
    require(now < allLendingContracts[_lendingID].endTime);

    // Also need to pay back some of the premium that the individual paid in
    // Proportional to how many days early they repaid

    allLendingContracts[_lendingID].acceptor.transfer(msg.value);
    allLendingContracts[_lendingID].deleted = true;
    allAssets[allLendingContracts[_lendingID].collateralAssetID].borrowedAgainst = false;
    lendingContractCount--;
  }

  /// @dev                  Allows a lender to report a late payment
  /// @param  _lendingID    The ID of the lending contract that has not been paid
  function reportLatePayment(uint _lendingID) public payable {
    uint time = now;
    time1 = now;
    time2 = allLendingContracts[_lendingID].endTime;

    require(allLendingContracts[_lendingID].acceptor == msg.sender);
    require(allLendingContracts[_lendingID].filled);
    require(!allLendingContracts[_lendingID].deleted);
    require(time > allLendingContracts[_lendingID].endTime);

    allAssets[allLendingContracts[_lendingID].collateralAssetID].owner = msg.sender;
    allAssets[allLendingContracts[_lendingID].collateralAssetID].borrowedAgainst = false;
    allLendingContracts[_lendingID].deleted = true;
  }

  /// @dev                  Allows the owner of the contract to add assets
  /// @param  _owner        The address of the owner of the asset
  /// @param  _value        The value of the asset being added
  function addAsset(address _owner, uint _value) public isOwner {
    uint assetID = (assetCount++)+1000;
    assetIDs.push(assetID);
    allAssets[assetID] = AssetOwnership(assetID, _owner, _value, false);
    AssetChange(assetID);
  }

  /// @dev                  Allows the owner of the contract or the owner of the asset to transfer ownership
  /// @param  _recipient    The address of the recipient of the asset
  /// @param  _assetID      The ID of the asset to be transferred
  function transferOwnership(address _recipient, uint _assetID) public {
    require(allAssets[_assetID].owner == msg.sender || msg.sender == master);
    allAssets[_assetID].owner = _recipient;
  }

  /// @dev                  Allows the owner of the contract to change the value of an asset
  /// @param  _assetID      The ID of the asset to be re-valued
  /// @param  _new_value    The new value of the asset
  function changeValue(uint _assetID, uint _new_value) public isOwner {
    allAssets[_assetID].value = _new_value;
  }

  /// @dev       Allows requestor to return all lending IDs
  /// @return    Returns the lending IDs of every outstanding lending contract
  function getLendingIds() public constant returns (uint[]) {
    return lendingIDs;
  }

  /// @dev       Allows requestor to return all asset IDs
  /// @return    Returns the asset IDs of every asset in the contract
  function getAssetIds() public constant returns (uint[]) {
    return assetIDs;
  }

  /// @dev       Allows requestor to return the number of outstanding lending contracts
  /// @return    Returns the number of lending contracts outstanding
  function getLendingContractCount() public constant returns (uint) {
    return lendingContractCount;
  }

  /// @dev       Allows requestor to return the number of assets
  /// @return    Returns the number of assets in the contract
  function getAssetCount() public constant returns (uint) {
    return assetCount;
  }

  // Delete this when done
  function getTime1() public constant returns (uint){
    return now;
  }

  // Delete this when done
  function getTime2(uint _lendingID) public constant returns (uint){
    return allLendingContracts[_lendingID].endTime;
  }

  function verifyProof(bytes memory proof) private returns (bool){
    uint qx = 0xe0a5793d275a533d50421b201c2c9a909abb58b1a9c0f9eb9b7963e5c8bc2295;
    uint qy = 0xf34d47cb92b6474562675127677d4e446418498884c101aeb38f3afb0cab997e;
    if(tlsnutils.verifyProof(proof, qx, qy)){
      return true;
    }
    return false;
  }

}
