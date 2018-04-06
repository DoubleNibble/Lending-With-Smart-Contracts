
var ECMath = artifacts.require("./ECMath.sol");
var JsmnSolLib = artifacts.require("jsmnsol-lib/JsmnSolLib.sol");
var Lending = artifacts.require("./Lending.sol");
var tlsnutils = artifacts.require("tlsnutils.sol");
var bytesutils = artifacts.require("bytesutils.sol");

module.exports = function(deployer) {
  deployer.deploy(JsmnSolLib);
  deployer.deploy(ECMath);
  deployer.deploy(bytesutils);
  deployer.link(ECMath,tlsnutils);
  deployer.link(bytesutils,tlsnutils);
  deployer.deploy(tlsnutils);
  deployer.link(JsmnSolLib, Lending);
  deployer.link(tlsnutils, Lending);
  deployer.deploy(Lending);
};
