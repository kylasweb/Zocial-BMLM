// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract TokenDistributor is ReentrancyGuard, AccessControl {
    IERC20 public token;
    
    struct Distribution {
        bytes32 id;
        address[] recipients;
        uint256[] amounts;
        uint256 timestamp;
        string distributionType;
        bool executed;
    }
    
    mapping(bytes32 => Distribution) public distributions;
    mapping(address => uint256) public claimedAmount;
    
    event DistributionCreated(bytes32 indexed id, string distributionType);
    event DistributionExecuted(bytes32 indexed id, uint256 totalAmount);
    
    constructor(address _token) {
        token = IERC20(_token);
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }
    
    function createDistribution(
        address[] calldata recipients,
        uint256[] calldata amounts,
        string calldata distributionType
    ) external onlyRole(DEFAULT_ADMIN_ROLE) returns (bytes32) {
        bytes32 id = keccak256(abi.encodePacked(
            block.timestamp,
            recipients,
            amounts,
            distributionType
        ));
        
        distributions[id] = Distribution({
            id: id,
            recipients: recipients,
            amounts: amounts,
            timestamp: block.timestamp,
            distributionType: distributionType,
            executed: false
        });
        
        emit DistributionCreated(id, distributionType);
        return id;
    }
    
    function executeDistribution(bytes32 id) external nonReentrant {
        Distribution storage dist = distributions[id];
        require(!dist.executed, "Distribution already executed");
        
        uint256 totalAmount = 0;
        for (uint256 i = 0; i < dist.amounts.length; i++) {
            totalAmount += dist.amounts[i];
        }
        
        require(
            token.balanceOf(address(this)) >= totalAmount,
            "Insufficient balance"
        );
        
        for (uint256 i = 0; i < dist.recipients.length; i++) {
            token.transfer(dist.recipients[i], dist.amounts[i]);
            claimedAmount[dist.recipients[i]] += dist.amounts[i];
        }
        
        dist.executed = true;
        emit DistributionExecuted(id, totalAmount);
    }
}