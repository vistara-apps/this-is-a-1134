// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LiquidityLocker is ReentrancyGuard, Ownable {
    struct LockInfo {
        address token;
        address owner;
        uint256 amount;
        uint256 unlockTime;
        bool isWithdrawn;
    }
    
    mapping(uint256 => LockInfo) public locks;
    mapping(address => uint256[]) public locksByOwner;
    mapping(address => uint256[]) public locksByToken;
    
    uint256 public nextLockId = 1;
    uint256 public totalLocksCreated;
    uint256 public totalValueLocked;
    
    event LiquidityLocked(
        uint256 indexed lockId,
        address indexed token,
        address indexed owner,
        uint256 amount,
        uint256 unlockTime
    );
    
    event LiquidityUnlocked(
        uint256 indexed lockId,
        address indexed token,
        address indexed owner,
        uint256 amount
    );
    
    function lockLiquidity(
        address token,
        uint256 amount,
        uint256 unlockTime
    ) external payable nonReentrant returns (uint256 lockId) {
        require(token != address(0), "Invalid token address");
        require(amount > 0, "Amount must be greater than 0");
        require(unlockTime > block.timestamp, "Unlock time must be in future");
        require(unlockTime <= block.timestamp + 1095 days, "Lock period too long"); // Max 3 years
        
        lockId = nextLockId++;
        
        // Handle ETH locks
        if (token == address(0)) {
            require(msg.value == amount, "ETH amount mismatch");
        } else {
            require(msg.value == 0, "ETH not needed for token locks");
            // Transfer tokens to this contract
            IERC20(token).transferFrom(msg.sender, address(this), amount);
        }
        
        locks[lockId] = LockInfo({
            token: token,
            owner: msg.sender,
            amount: amount,
            unlockTime: unlockTime,
            isWithdrawn: false
        });
        
        locksByOwner[msg.sender].push(lockId);
        locksByToken[token].push(lockId);
        
        totalLocksCreated++;
        totalValueLocked += amount;
        
        emit LiquidityLocked(lockId, token, msg.sender, amount, unlockTime);
        
        return lockId;
    }
    
    function unlockLiquidity(uint256 lockId) external nonReentrant {
        LockInfo storage lockInfo = locks[lockId];
        
        require(lockInfo.owner == msg.sender, "Not lock owner");
        require(!lockInfo.isWithdrawn, "Already withdrawn");
        require(block.timestamp >= lockInfo.unlockTime, "Lock period not expired");
        
        lockInfo.isWithdrawn = true;
        totalValueLocked -= lockInfo.amount;
        
        // Transfer tokens/ETH back to owner
        if (lockInfo.token == address(0)) {
            // ETH lock
            payable(msg.sender).transfer(lockInfo.amount);
        } else {
            // Token lock
            IERC20(lockInfo.token).transfer(msg.sender, lockInfo.amount);
        }
        
        emit LiquidityUnlocked(lockId, lockInfo.token, msg.sender, lockInfo.amount);
    }
    
    function extendLock(uint256 lockId, uint256 newUnlockTime) external {
        LockInfo storage lockInfo = locks[lockId];
        
        require(lockInfo.owner == msg.sender, "Not lock owner");
        require(!lockInfo.isWithdrawn, "Lock already withdrawn");
        require(newUnlockTime > lockInfo.unlockTime, "New unlock time must be later");
        require(newUnlockTime <= block.timestamp + 1095 days, "Lock period too long");
        
        lockInfo.unlockTime = newUnlockTime;
        
        emit LiquidityLocked(lockId, lockInfo.token, msg.sender, lockInfo.amount, newUnlockTime);
    }
    
    function transferLockOwnership(uint256 lockId, address newOwner) external {
        require(newOwner != address(0), "Invalid new owner");
        
        LockInfo storage lockInfo = locks[lockId];
        require(lockInfo.owner == msg.sender, "Not lock owner");
        require(!lockInfo.isWithdrawn, "Lock already withdrawn");
        
        // Remove from old owner's list
        uint256[] storage oldOwnerLocks = locksByOwner[msg.sender];
        for (uint256 i = 0; i < oldOwnerLocks.length; i++) {
            if (oldOwnerLocks[i] == lockId) {
                oldOwnerLocks[i] = oldOwnerLocks[oldOwnerLocks.length - 1];
                oldOwnerLocks.pop();
                break;
            }
        }
        
        // Add to new owner's list
        locksByOwner[newOwner].push(lockId);
        lockInfo.owner = newOwner;
    }
    
    // View functions
    function getLockInfo(uint256 lockId) external view returns (
        address token,
        address owner,
        uint256 amount,
        uint256 unlockTime,
        bool isWithdrawn,
        bool canUnlock
    ) {
        LockInfo memory lockInfo = locks[lockId];
        return (
            lockInfo.token,
            lockInfo.owner,
            lockInfo.amount,
            lockInfo.unlockTime,
            lockInfo.isWithdrawn,
            block.timestamp >= lockInfo.unlockTime && !lockInfo.isWithdrawn
        );
    }
    
    function getLocksByOwner(address owner) external view returns (uint256[] memory) {
        return locksByOwner[owner];
    }
    
    function getLocksByToken(address token) external view returns (uint256[] memory) {
        return locksByToken[token];
    }
    
    function getActiveLocksByOwner(address owner) external view returns (uint256[] memory activeLocks) {
        uint256[] memory allLocks = locksByOwner[owner];
        uint256 activeCount = 0;
        
        // Count active locks
        for (uint256 i = 0; i < allLocks.length; i++) {
            if (!locks[allLocks[i]].isWithdrawn) {
                activeCount++;
            }
        }
        
        // Create array of active locks
        activeLocks = new uint256[](activeCount);
        uint256 index = 0;
        
        for (uint256 i = 0; i < allLocks.length; i++) {
            if (!locks[allLocks[i]].isWithdrawn) {
                activeLocks[index] = allLocks[i];
                index++;
            }
        }
        
        return activeLocks;
    }
    
    function getTotalStats() external view returns (
        uint256 totalLocks,
        uint256 totalValue,
        uint256 activeLocks
    ) {
        uint256 active = 0;
        for (uint256 i = 1; i < nextLockId; i++) {
            if (!locks[i].isWithdrawn) {
                active++;
            }
        }
        
        return (totalLocksCreated, totalValueLocked, active);
    }
    
    // Emergency function (only owner)
    function emergencyWithdraw(uint256 lockId) external onlyOwner {
        LockInfo storage lockInfo = locks[lockId];
        require(!lockInfo.isWithdrawn, "Already withdrawn");
        
        lockInfo.isWithdrawn = true;
        totalValueLocked -= lockInfo.amount;
        
        if (lockInfo.token == address(0)) {
            payable(lockInfo.owner).transfer(lockInfo.amount);
        } else {
            IERC20(lockInfo.token).transfer(lockInfo.owner, lockInfo.amount);
        }
        
        emit LiquidityUnlocked(lockId, lockInfo.token, lockInfo.owner, lockInfo.amount);
    }
}