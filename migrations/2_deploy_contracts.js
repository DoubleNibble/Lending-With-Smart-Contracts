var ECMath = artifacts.require("./ECMath.sol");
var JsmnSolLib = artifacts.require("jsmnsol-lib/JsmnSolLib.sol");
var Lending = artifacts.require("./Lending.sol");
var tlsnutils = artifacts.require("tlsnutils.sol");
var bytesutils = artifacts.require("bytesutils.sol");

module.exports = function(deployer, network) {
  if(network == "rinkeby"){
    deployer.deploy(JsmnSolLib, {overwrite: false});
    deployer.deploy(ECMath, {overwrite: false});
    deployer.deploy(bytesutils, {overwrite: false});
    deployer.link(ECMath,tlsnutils);
    deployer.link(bytesutils,tlsnutils);
    deployer.deploy(tlsnutils, {overwrite: false});
    deployer.link(JsmnSolLib, Lending);
    deployer.link(tlsnutils, Lending);
    deployer.deploy(Lending);
  }
  else if(network == "development"){
    deployer.deploy(JsmnSolLib, {overwrite: false});
    deployer.deploy(ECMath, {overwrite: false});
    deployer.deploy(bytesutils, {overwrite: false});
    deployer.link(ECMath,tlsnutils);
    deployer.link(bytesutils,tlsnutils);
    deployer.deploy(tlsnutils, {overwrite: false});
    deployer.link(JsmnSolLib, Lending);
    deployer.link(tlsnutils, Lending);
    deployer.deploy(Lending);
  }
};
