// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./SoonerBoomerToken.sol";

contract AllowlistClaim {
    SoonerBoomerToken public token;
    address public owner;
    mapping(address => bool) public allowlist;
    mapping(address => bool) public claimed;

    constructor(address _token) {
        token = SoonerBoomerToken(_token);
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    function addToAllowlist(address user) external onlyOwner {
        allowlist[user] = true;
    }

    function claim() external {
        require(allowlist[msg.sender], "Not eligible");
        require(!claimed[msg.sender], "Already claimed");

        claimed[msg.sender] = true;
        token.transfer(msg.sender, 100 * 10 ** token.decimals());
    }
}
