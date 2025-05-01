// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SoonerBoomerToken (SBMR)
 * @dev A capped, burnable ERC20 token with optional future minting controlled by the owner.
 */
contract SoonerBoomerToken is ERC20Capped, ERC20Burnable, Ownable {
    /**
     * @dev Constructor that mints the total supply to the deployer.
     * Total supply is fixed via ERC20Capped.
     */
    constructor() 
        ERC20("SoonerBoomer", "SBMR") 
        ERC20Capped(1_000_000 * 10 ** decimals()) 
    {
        _mint(msg.sender, cap());
    }

    /**
     * @dev Override required by Solidity for ERC20Capped.
     */
    function _mint(address to, uint256 amount) internal override(ERC20, ERC20Capped) {
        super._mint(to, amount);
    }

    /**
     * @dev Owner-only minting function. Enforces cap.
     * Use only if you plan to mint tokens in future via multisig/admin.
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    /**
     * @dev Override decimals if you want to set a custom value (e.g., 6)
     */
    function decimals() public pure override returns (uint8) {
        return 18;
    }
}
