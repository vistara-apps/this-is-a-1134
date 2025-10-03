# 🚀 OkieLaunch X Layer Blockchain Integration Guide

## 🎯 Overview

OkieLaunch is now fully integrated with X Layer blockchain, providing complete on-chain functionality for token launches, swaps, and liquidity management. This guide covers the deployment and usage of the platform.

## 🏗️ Architecture

### Smart Contracts
- **TokenFactory.sol**: Handles token deployment and launch management
- **OkieToken.sol**: ERC20 token template with advanced features
- **LiquidityLocker.sol**: Manages liquidity locking and vesting

### Frontend Integration
- **X Layer Network Support**: Native integration with X Layer mainnet and testnet
- **Wagmi/Viem**: Modern Web3 integration for wallet connections and transactions
- **RainbowKit**: Beautiful wallet connection UI
- **Real-time Updates**: Live blockchain data integration

## 🔧 Setup Instructions

### 1. Environment Configuration

Create a `.env` file based on `.env.example`:

```bash
# Blockchain Configuration
PRIVATE_KEY=your_private_key_here
XLAYER_RPC_URL=https://rpc.xlayer.tech
XLAYER_TESTNET_RPC_URL=https://testrpc.xlayer.tech

# Contract Addresses (will be filled after deployment)
VITE_TOKEN_FACTORY_ADDRESS=
VITE_LIQUIDITY_LOCKER_ADDRESS=
VITE_OKIE_TOKEN_ADDRESS=
VITE_OKIE_SWAP_ADDRESS=

# Network Configuration
VITE_CHAIN_ID=196
VITE_TESTNET_CHAIN_ID=195
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Compile Smart Contracts

```bash
npm run compile
```

### 4. Deploy to X Layer Testnet

```bash
npm run deploy:testnet
```

### 5. Deploy to X Layer Mainnet

```bash
npm run deploy:xlayer
```

### 6. Update Environment Variables

After deployment, update your `.env` file with the deployed contract addresses from `deployment-xlayer.json`.

### 7. Build and Deploy Frontend

```bash
npm run build
```

## 🌐 Network Configuration

### X Layer Mainnet
- **Chain ID**: 196
- **RPC URL**: https://rpc.xlayer.tech
- **WebSocket**: wss://ws.xlayer.tech
- **Explorer**: https://www.okx.com/web3/explorer/xlayer
- **Native Token**: OKB

### X Layer Testnet
- **Chain ID**: 195
- **RPC URL**: https://testrpc.xlayer.tech
- **WebSocket**: wss://testws.xlayer.tech
- **Explorer**: https://www.okx.com/web3/explorer/xlayer-test
- **Native Token**: OKB (testnet)

## 🎮 Core Features

### 1. Token Launch
- **One-Click Deployment**: Deploy ERC20 tokens with advanced features
- **Liquidity Bundling**: Automatic liquidity pool creation
- **Safety Features**: Built-in liquidity locking and team vesting
- **Real-time Validation**: Form validation with blockchain checks

### 2. Token Swapping
- **DEX Integration**: Swap tokens through OkieSwap
- **Price Impact Calculation**: Real-time price impact and slippage
- **Gas Estimation**: Accurate gas fee predictions
- **Multi-token Support**: Support for all launched tokens

### 3. Liquidity Management
- **Liquidity Locking**: Time-locked liquidity with customizable duration
- **Vesting Schedules**: Team token vesting with cliff periods
- **Lock Extensions**: Ability to extend lock periods
- **Ownership Transfer**: Transfer lock ownership

### 4. Dashboard & Analytics
- **Portfolio Tracking**: Track all your launched tokens
- **Performance Metrics**: Real-time price, volume, and holder data
- **Health Scores**: Automated token health scoring
- **Transaction History**: Complete transaction tracking

## 🔐 Security Features

### Smart Contract Security
- **OpenZeppelin Standards**: Using battle-tested OpenZeppelin contracts
- **Reentrancy Protection**: Protection against reentrancy attacks
- **Access Control**: Proper role-based access control
- **Emergency Functions**: Emergency pause and recovery functions

### Frontend Security
- **Input Validation**: Comprehensive input validation and sanitization
- **Network Verification**: Automatic network switching and verification
- **Transaction Confirmation**: Multi-step transaction confirmation
- **Error Handling**: Robust error handling and user feedback

## 🚀 Deployment Process

### Smart Contract Deployment

1. **Prepare Environment**
   ```bash
   cp .env.example .env
   # Fill in your private key and RPC URLs
   ```

2. **Compile Contracts**
   ```bash
   npm run compile
   ```

3. **Deploy to Testnet**
   ```bash
   npm run deploy:testnet
   ```

4. **Verify Deployment**
   - Check `deployment-xlayer.json` for contract addresses
   - Verify contracts on X Layer explorer

5. **Deploy to Mainnet**
   ```bash
   npm run deploy:xlayer
   ```

### Frontend Deployment

1. **Update Environment**
   - Add deployed contract addresses to `.env`
   - Set correct network configuration

2. **Build Application**
   ```bash
   npm run build
   ```

3. **Deploy to Hosting**
   - Deploy `dist/` folder to your hosting provider
   - Ensure environment variables are set correctly

## 📊 Contract Addresses

### X Layer Mainnet (Chain ID: 196)
```
TokenFactory: [To be deployed]
LiquidityLocker: [To be deployed]
OkieToken: [To be deployed]
OkieSwap: [To be deployed]
```

### X Layer Testnet (Chain ID: 195)
```
TokenFactory: [To be deployed]
LiquidityLocker: [To be deployed]
OkieToken: [To be deployed]
OkieSwap: [To be deployed]
```

## 🔧 API Reference

### TokenFactory Contract

#### createToken
```solidity
function createToken(
    string memory _name,
    string memory _symbol,
    uint256 _totalSupply,
    uint256 _initialPrice,
    uint256 _liquidityAmount,
    uint256 _lockDuration,
    bool _teamVesting,
    uint256 _vestingCliff
) external payable returns (address)
```

#### getTokensByCreator
```solidity
function getTokensByCreator(address creator) external view returns (address[] memory)
```

### LiquidityLocker Contract

#### lockLiquidity
```solidity
function lockLiquidity(
    address token,
    uint256 amount,
    uint256 unlockTime
) external payable returns (uint256 lockId)
```

#### unlockLiquidity
```solidity
function unlockLiquidity(uint256 lockId) external
```

## 🎯 Usage Examples

### Launch a Token

```typescript
import { useTokenFactory } from './hooks/useTokenFactory';

const { createToken, isPending, isSuccess } = useTokenFactory();

const launchToken = async () => {
  await createToken({
    name: "My Token",
    symbol: "MTK",
    supply: "1000000",
    initialPrice: "0.001",
    liquidityAmount: "1",
    lockDuration: 90,
    teamVesting: true,
    vestingCliff: 30,
    // ... other parameters
  });
};
```

### Swap Tokens

```typescript
import { useSwap } from './hooks/useSwap';

const { swapETHForTokens, isPending } = useSwap();

const executeSwap = async () => {
  await swapETHForTokens(
    tokenAddress,
    "0.1", // 0.1 ETH
    0.5 // 0.5% slippage
  );
};
```

## 🐛 Troubleshooting

### Common Issues

1. **Wrong Network**
   - Ensure you're connected to X Layer (Chain ID: 196 or 195)
   - Use the network switcher in the header

2. **Insufficient Gas**
   - Ensure you have enough OKB for gas fees
   - Gas fees are typically very low on X Layer

3. **Contract Not Deployed**
   - Verify contract addresses in environment variables
   - Check deployment status on X Layer explorer

4. **Transaction Failures**
   - Check slippage tolerance for swaps
   - Ensure sufficient token allowances
   - Verify lock durations meet minimum requirements

### Getting Help

1. **Check Console**: Browser console for detailed error messages
2. **Explorer**: Use X Layer explorer to verify transactions
3. **Documentation**: Refer to X Layer and wagmi documentation
4. **Community**: Join the OkieLaunch community for support

## 🎉 Success Metrics

### Platform Statistics
- **Total Tokens Launched**: Real-time counter
- **Total Volume**: Aggregated trading volume
- **Active Users**: Daily/monthly active users
- **Success Rate**: Token launch success rate

### Token Health Scoring
- **Liquidity Lock**: +30 points (bonus for longer locks)
- **Verification**: +20 points
- **Holder Distribution**: +20 points
- **Volume Activity**: +20 points
- **Age Factor**: +10 points

## 🔮 Future Enhancements

### Phase 2 Features
- **Advanced DEX**: Full AMM implementation
- **Governance**: DAO governance for platform decisions
- **NFT Integration**: NFT-based membership and rewards
- **Cross-chain**: Bridge to other networks

### Phase 3 Features
- **AI Trading**: AI-powered trading recommendations
- **Social Features**: Enhanced social trading features
- **Mobile App**: Native mobile application
- **Enterprise**: Enterprise-grade features for institutions

---

## 🚀 Ready to Launch!

Your OkieLaunch platform is now fully integrated with X Layer blockchain and ready for production use. The platform provides:

✅ **Complete On-chain Functionality**  
✅ **X Layer Native Integration**  
✅ **Professional UI/UX**  
✅ **Security Best Practices**  
✅ **Scalable Architecture**  

Deploy your contracts, update your environment variables, and start launching tokens on X Layer! 🎯