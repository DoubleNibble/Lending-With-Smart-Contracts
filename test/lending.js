var Lending = artifacts.require("Lending");

contract('Lending', function(accounts, app) {

  it("The starting number of assets should be 0", function() {
    return Lending.deployed().then(function(instance) {
      return instance.getAssetCount();
    }).then(function(assets) {
      assert.equal(assets.valueOf(), 0, "The starting number of assets is not 0");
    });
  });

  it("The starting number of lending contracts should be 0", function() {
    return Lending.deployed().then(function(instance) {
      return instance.getLendingContractCount();
    }).then(function(lending) {
      assert.equal(lending.valueOf(), 0, "The starting number of lending contracts is not 0");
    });
  });

  it("A random user should not be able to add an Asset", function() {
    var app;
    var adder = accounts[3];
    var value = 10;

    return Lending.deployed().then(function(instance) {
      app = instance;
      app.addAsset(adder, value, {from: adder, value: 0});
      return instance.getAssetCount();
    }).then(function(assets) {
      assert.equal(assets.valueOf(), 0, "A random user was able to add an asset");
    });
  });

  it("The owner of the contract should be able to add an Asset", function() {
    var app;
    var adder = accounts[0];
    var owner = accounts[3];
    var value = 10;

    return Lending.deployed().then(function(instance) {
      app = instance;
      app.addAsset(owner, value, {from: adder, value: 0});
      return app.getAssetCount();
    }).then(function(assets) {
      assert.equal(assets.valueOf(), 1, "The owner of the contract was not able to add an asset");
      return app.getAssetIds();
    }).then(function(assetID) {
      assert.equal(assetID[0], 1000, "The asset ID of the added asset is wrong");
    });
  });

  it("The owner of the contract should be able to change the value of an asset", function() {
    var app;
    var contractOwner = accounts[0];
    var assetID = 1000;
    var newValue = 5;

    return Lending.deployed().then(function(instance) {
      app = instance;
      app.changeValue(assetID, newValue, {from: contractOwner, value: 0});
      return app.allAssets(assetID);
    }).then(function(contract) {
      assert.equal(contract[2].toNumber(), 5, "The value of the asset is wrong");
    })
  });

  it("The owner of the contract should be able to change ownership of an asset", function() {
    var app;
    var contractOwner = accounts[0];
    var newOwner = accounts[4];
    var assetID = 1000;

    return Lending.deployed().then(function(instance) {
      app = instance;
      app.transferOwnership(newOwner, assetID, {from: contractOwner, value: 0});
      return app.allAssets(assetID);
    }).then(function(contract) {
      assert.equal(contract[1], newOwner, "The asset was not transferred to the right account");
    })
  });

  it("The owner of the asset should be able to change ownership of their asset", function() {
    var app;
    var contractOwner = accounts[0];
    var currentOwner = accounts[4];
    var newOwner = accounts[3];
    var assetID = 1000;

    return Lending.deployed().then(function(instance) {
      app = instance;
      app.transferOwnership(newOwner, assetID, {from: currentOwner, value: 0});
      return app.allAssets(assetID);
    }).then(function(contract) {
      assert.equal(contract[1], newOwner, "The asset was not transferred to the right account");
    })
  });

  it("The owner of an asset should be able to request a loan", function() {
    var app;
    var owner = accounts[3];
    var assetID = 1000;
    var borrowAmount = 1;
    var premium = 0.1;
    var lendingPeriod = 3;

    return Lending.deployed().then(function(instance) {
      app = instance;
      app.borrowFunds(assetID, borrowAmount, premium, lendingPeriod, {from: owner, value: premium});
      return app.getLendingContractCount();
    }).then(function(lending) {
      assert.equal(lending.valueOf(), 0, "The number of lending contracts has not been incremented");
    })
  });


});
