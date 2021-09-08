/* Contracts in this test */

const DizzyDolphinAccessory = artifacts.require(
  "../contracts/DizzyDolphinAccessory.sol"
);


contract("DizzyDolphinAccessory", (accounts) => {
  const URI_BASE = 'https://creatures-api.opensea.io';
  const CONTRACT_URI = `${URI_BASE}/contract/opensea-erc1155`;
  let creatureAccessory;

  before(async () => {
    creatureAccessory = await DizzyDolphinAccessory.deployed();
  });

  // This is all we test for now

  // This also tests contractURI()

  describe('#constructor()', () => {
    it('should set the contractURI to the supplied value', async () => {
      assert.equal(await creatureAccessory.contractURI(), CONTRACT_URI);
    });
  });
});
