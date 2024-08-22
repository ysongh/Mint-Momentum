// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SimpleNFT is ERC721 {
    uint256 public nextTokenId;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function mint(address to) public returns (uint256) {
        uint256 tokenId = nextTokenId++;
        _mint(to, tokenId);
        return tokenId;
    }

    function nftBalance() public view returns (uint256) {
        return balanceOf(msg.sender);
    }
}
