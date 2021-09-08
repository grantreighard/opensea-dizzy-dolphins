// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC1155Tradable.sol";

/**
 * @title DizzyDolphinAccessory
 * DizzyDolphinAccessory - a contract for DizzyDolphin Accessory semi-fungible tokens.
 */
contract DizzyDolphinAccessory is ERC1155Tradable {
    constructor(address _proxyRegistryAddress)
        ERC1155Tradable(
            "Dizzy Dolphin Accessory",
            "DIZA",
            "https://creatures-api.opensea.io/api/accessory/{id}",
            _proxyRegistryAddress
        )
    {}

    function contractURI() public pure returns (string memory) {
        return "https://creatures-api.opensea.io/contract/opensea-erc1155";
    }
}
