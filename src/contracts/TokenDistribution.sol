// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract TokenDistribution is Ownable, Pausable {
    IERC20 public token;
    
    struct Distribution {
        address[] recipients;
        uint256[] amounts;
        uint256 timestamp;
        string distributionType;
    }
    
    Distribution[] public distributions;
    
    event DistributionExecuted(
        uint256 indexed distributionId,
        string distributionType,
        uint256 totalAmount
    );
    
    constructor(address _token) {
        token = IERC20(_token);
    }
    
    function batchTransfer(
        address[] calldata recipients,
        uint256[] calldata amounts,
        string calldata distributionType
    ) external onlyOwner whenNotPaused {
        require(
            recipients.length == amounts.length,
            "Recipients and amounts length mismatch"
        );
        
        uint256 totalAmount = 0;
        for (uint256 i = 0; i < amounts.length; i++) {
            totalAmount += amounts[i];
        }
        
        require(
            token.balanceOf(address(this)) >= totalAmount,
            "Insufficient balance"
        );
        
        for (uint256 i = 0; i < recipients.length; i++) {
            token.transfer(recipients[i], amounts[i]);
        }
        
        distributions.push(Distribution({
            recipients: recipients,
            amounts: amounts,
            timestamp: block.timestamp,
            distributionType: distributionType
        }));
        
        emit DistributionExecuted(
            distributions.length - 1,
            distributionType,
            totalAmount
        );
    }
}