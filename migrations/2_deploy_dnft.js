const DynamicNFT = artifacts.require('DynamicNFT')

module.exports = function (deployer) {
  deployer.deploy(DynamicNFT, 'uri must be input')
}
