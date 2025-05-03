// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MerkleClaim {
    IERC20 public immutable token;
    bytes32 public immutable merkleRoot;
    mapping(address=>bool) public claimed;

    constructor(address _token, bytes32 _root) {
        token = IERC20(_token);
        merkleRoot = _root;
    }

    function claim(bytes32[] calldata proof) external {
        require(!claimed[msg.sender], "Already claimed");
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
        require(
            MerkleProof.verify(proof, merkleRoot, leaf),
            "Invalid proof"
        );
        claimed[msg.sender] = true;
        token.transfer(msg.sender, 1000 * 10**18);
    }
}