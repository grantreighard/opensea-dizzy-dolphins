// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC721Tradable.sol";

/**
 * @title DizzyDolphin
 * DizzyDolphin - a contract for my non-fungible creatures.
 */
contract DizzyDolphin is ERC721Tradable {
    constructor(address _proxyRegistryAddress)
        ERC721Tradable("DizzyDolphin", "DIZ", _proxyRegistryAddress)
    {}

    function baseTokenURI() public pure override returns (string memory) {
        return
            "https://raw.githubusercontent.com/grantreighard/DizzyDolphinsData/main/metadata/";
    }

    function contractURI() public pure returns (string memory) {
        return
            "https://raw.githubusercontent.com/grantreighard/DizzyDolphinsData/main/metadata/metadata_project.txt";
    }
}
