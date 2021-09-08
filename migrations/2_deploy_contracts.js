const DizzyDolphin = artifacts.require("./DizzyDolphin.sol");
const DizzyDolphinFactory = artifacts.require("./DizzyDolphinFactory.sol");
const DizzyDolphinLootBox = artifacts.require("./DizzyDolphinLootBox.sol");
const DizzyDolphinAccessory = artifacts.require("../contracts/DizzyDolphinAccessory.sol");
const DizzyDolphinAccessoryFactory = artifacts.require("../contracts/DizzyDolphinAccessoryFactory.sol");
const DizzyDolphinAccessoryLootBox = artifacts.require(
  "../contracts/DizzyDolphinAccessoryLootBox.sol"
);
const LootBoxRandomness = artifacts.require(
  "../contracts/LootBoxRandomness.sol"
);

const setupDizzyDolphinAccessories = require("../lib/setupDizzyDolphinAccessories.js");

// If you want to hardcode what deploys, comment out process.env.X and use
// true/false;
const DEPLOY_ALL = process.env.DEPLOY_ALL;
const DEPLOY_ACCESSORIES_SALE = process.env.DEPLOY_ACCESSORIES_SALE || DEPLOY_ALL;
const DEPLOY_ACCESSORIES = process.env.DEPLOY_ACCESSORIES || DEPLOY_ACCESSORIES_SALE || DEPLOY_ALL;
const DEPLOY_CREATURES_SALE = process.env.DEPLOY_CREATURES_SALE || DEPLOY_ALL;
// Note that we will default to this unless DEPLOY_ACCESSORIES is set.
// This is to keep the historical behavior of this migration.
const DEPLOY_CREATURES = process.env.DEPLOY_CREATURES || DEPLOY_CREATURES_SALE || DEPLOY_ALL || (! DEPLOY_ACCESSORIES);

module.exports = async (deployer, network, addresses) => {
  // OpenSea proxy registry addresses for rinkeby and mainnet.
  let proxyRegistryAddress = "";
  if (network === 'rinkeby') {
    proxyRegistryAddress = "0xf57b2c51ded3a29e6891aba85459d600256cf317";
  } else {
    proxyRegistryAddress = "0xa5409ec958c83c3f309868babaca7c86dcb077c1";
  }

  if (DEPLOY_CREATURES) {
    await deployer.deploy(DizzyDolphin, proxyRegistryAddress, {gas: 5000000});
  }

  if (DEPLOY_CREATURES_SALE) {
    await deployer.deploy(DizzyDolphinFactory, proxyRegistryAddress, DizzyDolphin.address, {gas: 7000000});
    const creature = await DizzyDolphin.deployed();
    await creature.transferOwnership(DizzyDolphinFactory.address);
  }

  // if (DEPLOY_ACCESSORIES) {
  //   await deployer.deploy(
  //     DizzyDolphinAccessory,
  //     proxyRegistryAddress,
  //     { gas: 5000000 }
  //   );
  //   const accessories = await DizzyDolphinAccessory.deployed();
  //   await setupDizzyDolphinAccessories.setupAccessory(
  //     accessories,
  //     addresses[0]
  //   );
  // }

  // if (DEPLOY_ACCESSORIES_SALE) {
  //   await deployer.deploy(LootBoxRandomness);
  //   await deployer.link(LootBoxRandomness, DizzyDolphinAccessoryLootBox);
  //   await deployer.deploy(
  //     DizzyDolphinAccessoryLootBox,
  //     proxyRegistryAddress,
  //     { gas: 6721975 }
  //   );
  //   const lootBox = await DizzyDolphinAccessoryLootBox.deployed();
  //   await deployer.deploy(
  //     DizzyDolphinAccessoryFactory,
  //     proxyRegistryAddress,
  //     DizzyDolphinAccessory.address,
  //     DizzyDolphinAccessoryLootBox.address,
  //     { gas: 5000000 }
  //   );
  //   const accessories = await DizzyDolphinAccessory.deployed();
  //   const factory = await DizzyDolphinAccessoryFactory.deployed();
  //   await accessories.transferOwnership(
  //     DizzyDolphinAccessoryFactory.address
  //   );
  //   await setupDizzyDolphinAccessories.setupAccessoryLootBox(lootBox, factory);
  //   await lootBox.transferOwnership(factory.address);
  // }
};
