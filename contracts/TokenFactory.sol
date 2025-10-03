// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./OkieToken.sol";
import "./LiquidityLocker.sol";

contract TokenFactory {
    address public owner;
    address public liquidityLocker;
    address[] public allTokens;
    mapping(address => address[]) public tokensByCreator;
    
    uint256 public constant PLATFORM_FEE = 0.001 ether; // 0.001 ETH fee
    uint256 public constant MAX_SUPPLY = 1e12 * 1e18; // 1 trillion max supply
    
    event TokenCreated(
        address indexed creator,
        address indexed tokenAddress,
        string name,
        string symbol,
        uint256 totalSupply,
        uint256 initialPrice,
        uint256 liquidityAmount
    );
    
    constructor(address _liquidityLocker) {
        owner = msg.sender;
        liquidityLocker = _liquidityLocker;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    function createToken(
        string memory _name,
        string memory _symbol,
        uint256 _totalSupply,
        uint256 _initialPrice,
        uint256 _liquidityAmount,
        uint256 _lockDuration,
        bool _teamVesting,
        uint256 _vestingCliff
    ) external payable returns (address) {
        require(msg.value >= PLATFORM_FEE + _liquidityAmount, "Insufficient payment");
        require(_totalSupply > 0 && _totalSupply <= MAX_SUPPLY, "Invalid supply");
        require(_liquidityAmount > 0, "Invalid liquidity amount");
        require(_lockDuration >= 30 days, "Lock duration too short");
        
        // Deploy new token
        OkieToken newToken = new OkieToken(
            _name,
            _symbol,
            _totalSupply,
            msg.sender,
            _teamVesting,
            _vestingCliff
        );
        
        address tokenAddress = address(newToken);
        
        // Add to tracking arrays
        allTokens.push(tokenAddress);
        tokensByCreator[msg.sender].push(tokenAddress);
        
        // Create initial liquidity (simplified - in real implementation would use DEX)
        // For now, we'll just lock the liquidity tokens
        if (_lockDuration > 0) {
            LiquidityLocker(liquidityLocker).lockLiquidity{value: _liquidityAmount}(
                tokenAddress,
                _liquidityAmount,
                block.timestamp + _lockDuration
            );
        }
        
        // Send platform fee to owner
        payable(owner).transfer(PLATFORM_FEE);
        
        emit TokenCreated(
            msg.sender,
            tokenAddress,
            _name,
            _symbol,
            _totalSupply,
            _initialPrice,
            _liquidityAmount
        );
        
        return tokenAddress;
    }
    
    function getTokensByCreator(address creator) external view returns (address[] memory) {
        return tokensByCreator[creator];
    }
    
    function getAllTokens() external view returns (address[] memory) {
        return allTokens;
    }
    
    function getTokenCount() external view returns (uint256) {
        return allTokens.length;
    }
    
    function updatePlatformFee(uint256 _newFee) external onlyOwner {
        // In a real implementation, you'd want to emit an event and have limits
        require(_newFee <= 0.01 ether, "Fee too high");
    }
    
    function withdrawFees() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}