// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./SoonerBoomerToken.sol";

/**
 * @title AllowlistClaim
 * @dev Allows eligible users (on the allowlist) to claim a fixed amount of tokens once.
 * Only the contract owner can manage the allowlist and claim parameters.
 */
contract AllowlistClaim is Ownable {
    using SafeERC20 for IERC20;

    SoonerBoomerToken public token;
    uint256 public claimAmount;

    mapping(address => bool) public allowlist;
    mapping(address => bool) public claimed;

    event Allowlisted(address indexed user);
    event Claimed(address indexed user, uint256 amount);
    event ClaimAmountUpdated(uint256 newAmount);

    /**
     * @dev Constructor to initialize the token address and claim amount.
     * @param _token Address of the SoonerBoomerToken contract.
     * @param _claimAmount Amount of tokens each allowlisted user can claim.
     */
    constructor(address _token, uint256 _claimAmount) {
        require(_token != address(0), "Invalid token address");
        token = SoonerBoomerToken(_token);
        claimAmount = _claimAmount;
    }

    // --------------------
    // Owner-only Functions
    // --------------------

    /**
     * @dev Add a single address to the allowlist.
     * @param user The address to allow.
     */
    function addToAllowlist(address user) external onlyOwner {
        require(user != address(0), "Invalid address");
        allowlist[user] = true;
        emit Allowlisted(user);
    }

    /**
     * @dev Add multiple addresses to the allowlist in a single call.
     * @param users Array of addresses to allow.
     */
    function addManyToAllowlist(address[] calldata users) external onlyOwner {
        for (uint256 i = 0; i < users.length; i++) {
            require(users[i] != address(0), "Invalid address in list");
            allowlist[users[i]] = true;
            emit Allowlisted(users[i]);
        }
    }

    /**
     * @dev Update the claim amount for users.
     * @param amount The new claim amount in token's smallest units (e.g., 1000 * 10^18).
     */
    function setClaimAmount(uint256 amount) external onlyOwner {
        require(amount > 0, "Claim amount must be positive");
        claimAmount = amount;
        emit ClaimAmountUpdated(amount);
    }

    // ----------------------
    // Public Claim Interface
    // ----------------------

    /**
     * @dev Claim tokens if eligible. Can only be called once per user.
     */
    function claim() external {
        require(allowlist[msg.sender], "Not on allowlist");
        require(!claimed[msg.sender], "Already claimed");
        require(claimAmount > 0, "Claim amount not set");

        claimed[msg.sender] = true;

        token.safeTransfer(msg.sender, claimAmount);
        emit Claimed(msg.sender, claimAmount);
    }
}
