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
    uint interestRatePremium; // measured in bps on top of Bank of England base rate
    uint startTime;
    uint endTime;
    uint lendingTimePeriod; // in weeks
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

  function borrowFunds(uint _assetID, uint borrowAmount, /*bytes memory _hex_proof,*/ uint _premium, uint _lending_period) public payable {
    require(!allAssets[_assetID].borrowedAgainst);
    require(allAssets[_assetID].value >= borrowAmount);
    require(allAssets[_assetID].owner == msg.sender);

    // Work out the Bank of England Base Interest Rate from Hex Proof

    // Check that the funds transferred into the contract are equl to the number of weeks money required and above base rate
    // The individual will need to transfer enough funds in to cover the entire period, even if withdraw early

    // Setup Contract
    uint lendingID = (lendingContractCount++)+1000;
    lendingIDs.push(lendingID);
    allLendingContracts[lendingID] = LendingContract(lendingID, msg.sender, 0, borrowAmount, _premium, 0, 0, _lending_period, _assetID, false, false);
    LendingContractChange(lendingID);
  }

  function lendFunds(uint _lendingID) public payable {
    require(msg.value == allLendingContracts[_lendingID].borrowedAmount);
    allLendingContracts[_lendingID].proposer.transfer(msg.value);
    allLendingContracts[_lendingID].filled = true;
    allLendingContracts[_lendingID].acceptor = msg.sender;
    allLendingContracts[_lendingID].startTime = now;
    allLendingContracts[_lendingID].endTime = now + (allLendingContracts[_lendingID].lendingTimePeriod * 1 weeks);
  }

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
  }

  function reportLatePayment(uint _lendingID) public payable {
    require(allLendingContracts[_lendingID].acceptor == msg.sender);
    require(allLendingContracts[_lendingID].filled);
    require(now > allLendingContracts[_lendingID].endTime);

    transferOwnership(msg.sender,allLendingContracts[_lendingID].collateralAssetID);
    allAssets[allLendingContracts[_lendingID].collateralAssetID].borrowedAgainst = false;
    allLendingContracts[_lendingID].deleted = true;
  }

  function addAsset(address _owner, uint _value) public isOwner {
    uint assetID = (assetCount++)+1000;
    assetIDs.push(assetID);
    allAssets[assetID] = AssetOwnership(assetID, _owner, _value, false);
    AssetChange(assetID);
  }

  function removeOwnership(uint _assetID) public isOwner {
    allAssets[_assetID].owner = 0;
  }

  function transferOwnership(address _recipient, uint _assetID) public {
    require(allAssets[_assetID].owner == msg.sender || msg.sender == master);
    allAssets[_assetID].owner = _recipient;
  }

  function changeValue(uint _assetID, uint _new_value) public isOwner {
    allAssets[_assetID].value = _new_value;
  }

  /***********************************/
  /******** PRIVATE FUNCTIONS ********/
  /***********************************/

}
