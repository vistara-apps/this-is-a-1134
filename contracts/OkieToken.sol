// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract OkieToken is ERC20, Ownable, ReentrancyGuard {
    uint256 public constant MAX_SUPPLY = 1e12 * 1e18; // 1 trillion tokens max
    uint256 public immutable TOTAL_SUPPLY;
    
    // Vesting parameters
    bool public hasTeamVesting;
    uint256 public vestingCliff;
    uint256 public vestingStart;
    uint256 public teamTokens;
    uint256 public teamTokensReleased;
    
    // Launch parameters
    address public creator;
    uint256 public launchTime;
    bool public tradingEnabled;
    
    // Anti-bot measures
    mapping(address => bool) public isBlacklisted;
    mapping(address => uint256) public lastTransactionTime;
    uint256 public constant TRANSACTION_COOLDOWN = 1 seconds;
    
    event TradingEnabled();
    event TeamTokensReleased(uint256 amount);
    event AddressBlacklisted(address indexed account, bool blacklisted);
    
    modifier onlyCreator() {
        require(msg.sender == creator, "Not creator");
        _;
    }
    
    modifier tradingActive() {
        require(tradingEnabled || msg.sender == creator || msg.sender == owner(), "Trading not enabled");
        _;
    }
    
    modifier notBlacklisted(address account) {
        require(!isBlacklisted[account], "Address blacklisted");
        _;
    }
    
    modifier cooldownPassed(address account) {
        require(
            block.timestamp >= lastTransactionTime[account] + TRANSACTION_COOLDOWN,
            "Transaction cooldown active"
        );
        _;
    }
    
    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _totalSupply,
        address _creator,
        bool _hasTeamVesting,
        uint256 _vestingCliff
    ) ERC20(_name, _symbol) {
        require(_totalSupply > 0 && _totalSupply <= MAX_SUPPLY, "Invalid total supply");
        require(_creator != address(0), "Invalid creator address");
        
        TOTAL_SUPPLY = _totalSupply;
        creator = _creator;
        launchTime = block.timestamp;
        hasTeamVesting = _hasTeamVesting;
        vestingCliff = _vestingCliff;
        vestingStart = block.timestamp;
        
        if (_hasTeamVesting) {
            // Reserve 10% for team vesting
            teamTokens = (_totalSupply * 10) / 100;
            uint256 liquidityTokens = _totalSupply - teamTokens;
            _mint(_creator, liquidityTokens);
        } else {
            _mint(_creator, _totalSupply);
        }
        
        // Transfer ownership to creator
        _transferOwnership(_creator);
    }
    
    function enableTrading() external onlyCreator {
        require(!tradingEnabled, "Trading already enabled");
        tradingEnabled = true;
        emit TradingEnabled();
    }
    
    function releaseTeamTokens() external onlyCreator nonReentrant {
        require(hasTeamVesting, "No team vesting");
        require(block.timestamp >= vestingStart + vestingCliff, "Vesting cliff not reached");
        
        uint256 vestedAmount = calculateVestedAmount();
        uint256 releasableAmount = vestedAmount - teamTokensReleased;
        
        require(releasableAmount > 0, "No tokens to release");
        
        teamTokensReleased += releasableAmount;
        _mint(creator, releasableAmount);
        
        emit TeamTokensReleased(releasableAmount);
    }
    
    function calculateVestedAmount() public view returns (uint256) {
        if (!hasTeamVesting || block.timestamp < vestingStart + vestingCliff) {
            return 0;
        }
        
        // Linear vesting over 2 years after cliff
        uint256 vestingDuration = 730 days; // 2 years
        uint256 timeVested = block.timestamp - (vestingStart + vestingCliff);
        
        if (timeVested >= vestingDuration) {
            return teamTokens;
        }
        
        return (teamTokens * timeVested) / vestingDuration;
    }
    
    function blacklistAddress(address account, bool blacklisted) external onlyOwner {
        isBlacklisted[account] = blacklisted;
        emit AddressBlacklisted(account, blacklisted);
    }
    
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override tradingActive notBlacklisted(from) notBlacklisted(to) cooldownPassed(from) {
        super._beforeTokenTransfer(from, to, amount);
        
        // Update last transaction time for cooldown
        if (from != address(0) && from != creator && from != owner()) {
            lastTransactionTime[from] = block.timestamp;
        }
    }
    
    // Emergency functions
    function emergencyPause() external onlyOwner {
        tradingEnabled = false;
    }
    
    function emergencyUnpause() external onlyOwner {
        tradingEnabled = true;
    }
    
    // View functions
    function getTokenInfo() external view returns (
        string memory name,
        string memory symbol,
        uint256 totalSupply,
        uint256 decimals,
        address tokenCreator,
        uint256 tokenLaunchTime,
        bool isTradingEnabled
    ) {
        return (
            name(),
            symbol(),
            totalSupply(),
            decimals(),
            creator,
            launchTime,
            tradingEnabled
        );
    }
    
    function getVestingInfo() external view returns (
        bool vestingEnabled,
        uint256 totalTeamTokens,
        uint256 releasedTeamTokens,
        uint256 vestedAmount,
        uint256 cliffTime
    ) {
        return (
            hasTeamVesting,
            teamTokens,
            teamTokensReleased,
            calculateVestedAmount(),
            vestingStart + vestingCliff
        );
    }
}