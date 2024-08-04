const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MomentumModule", (m) => {
  const momentum = m.contract("Momentum");

  return { momentum };
});