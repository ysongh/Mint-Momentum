const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("SimpleNFTModule", (m) => {
  const simpleNFT = m.contract("SimpleNFT");

  return { simpleNFT };
});