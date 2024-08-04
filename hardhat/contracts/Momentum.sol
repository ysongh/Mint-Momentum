// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

contract Momentum {
    constructor(){}

    MotivationalTip[] public motivationalTips;

    struct MotivationalTip {
        address owner;
        string text;
    }

    function getMotivationalTips() public view returns (MotivationalTip[] memory){
        return motivationalTips;
    }

    function createMotivationalTip(string memory _text) public {
        motivationalTips.push(MotivationalTip(msg.sender, _text));
    }
}
