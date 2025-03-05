// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract Faucet is Ownable, Pausable {
    IERC20 public token;
    
    uint256 public claimAmount;
    uint256 public cooldownPeriod;
    uint256 public maxClaimsPerUser;
    
    mapping(address => uint256) public lastClaimTime;
    mapping(address => uint256) public claimCount;
    
    event TokensClaimed(address indexed user, uint256 amount);
    
    constructor(
        address _token,
        uint256 _claimAmount,
        uint256 _cooldownPeriod,
        uint256 _maxClaimsPerUser
    ) {
        token = IERC20(_token);
        claimAmount = _claimAmount;
        cooldownPeriod = _cooldownPeriod;
        maxClaimsPerUser = _maxClaimsPerUser;
    }
    
    function claim() external whenNotPaused {
        require(
            block.timestamp >= lastClaimTime[msg.sender] + cooldownPeriod,
            "Cooldown period not elapsed"
        );
        require(
            claimCount[msg.sender] < maxClaimsPerUser,
            "Max claims reached"
        );
        require(
            token.balanceOf(address(this)) >= claimAmount,
            "Insufficient faucet balance"
        );
        
        lastClaimTime[msg.sender] = block.timestamp;
        claimCount[msg.sender]++;
        
        token.transfer(msg.sender, claimAmount);
        
        emit TokensClaimed(msg.sender, claimAmount);
    }
    
    function updateConfig(
        uint256 _claimAmount,
        uint256 _cooldownPeriod,
        uint256 _maxClaimsPerUser
    ) external onlyOwner {
        claimAmount = _claimAmount;
        cooldownPeriod = _cooldownPeriod;
        maxClaimsPerUser = _maxClaimsPerUser;
    }
}