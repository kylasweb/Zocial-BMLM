// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract Token is Initializable, ERC20Upgradeable, PausableUpgradeable, OwnableUpgradeable {
    mapping(address => bool) public blacklisted;
    mapping(address => uint256) public lastTransferTimestamp;
    
    uint256 public maxTransactionLimit;
    uint256 public cooldownPeriod;
    bool public transferLocked;
    
    struct VestingSchedule {
        uint256 totalAmount;
        uint256 cliffPeriod;
        uint256 vestingDuration;
        uint256 startTime;
        uint256 releasedAmount;
    }
    
    mapping(address => VestingSchedule) public vestingSchedules;

    function initialize(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        uint8 decimals
    ) public initializer {
        __ERC20_init(name, symbol);
        __Pausable_init();
        __Ownable_init();
        _mint(msg.sender, initialSupply * 10**decimals);
    }

    // ... implement security and vesting functions
}