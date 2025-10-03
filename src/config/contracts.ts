import { Address } from 'viem';

// Contract addresses (these will be updated after deployment)
export const CONTRACT_ADDRESSES = {
  [196]: { // X Layer Mainnet
    TOKEN_FACTORY: (import.meta.env.VITE_TOKEN_FACTORY_ADDRESS || '0xeb554444b5c49bab7781b1cfc0e3be211053c6d7') as Address,
    OKIE_SWAP: (import.meta.env.VITE_OKIE_SWAP_ADDRESS || '0x') as Address,
    OKIE_TOKEN: (import.meta.env.VITE_OKIE_TOKEN_ADDRESS || '0x') as Address,
    LIQUIDITY_LOCKER: (import.meta.env.VITE_LIQUIDITY_LOCKER_ADDRESS || '0x') as Address,
  },
  [195]: { // X Layer Testnet
    TOKEN_FACTORY: (import.meta.env.VITE_TOKEN_FACTORY_ADDRESS || '0xeb554444b5c49bab7781b1cfc0e3be211053c6d7') as Address,
    OKIE_SWAP: (import.meta.env.VITE_OKIE_SWAP_ADDRESS || '0x') as Address,
    OKIE_TOKEN: (import.meta.env.VITE_OKIE_TOKEN_ADDRESS || '0x') as Address,
    LIQUIDITY_LOCKER: (import.meta.env.VITE_LIQUIDITY_LOCKER_ADDRESS || '0x') as Address,
  },
} as const;

// ERC20 Token ABI
export const ERC20_ABI = [
  {
    inputs: [
      { name: '_name', type: 'string' },
      { name: '_symbol', type: 'string' },
      { name: '_totalSupply', type: 'uint256' },
      { name: '_decimals', type: 'uint8' }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'name',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { name: 'from', type: 'address' },
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    name: 'transferFrom',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const;

// Token Factory ABI
export const TOKEN_FACTORY_ABI = [
  {
    inputs: [
      { name: '_name', type: 'string' },
      { name: '_symbol', type: 'string' },
      { name: '_totalSupply', type: 'uint256' },
      { name: '_initialPrice', type: 'uint256' },
      { name: '_liquidityAmount', type: 'uint256' },
      { name: '_lockDuration', type: 'uint256' },
      { name: '_teamVesting', type: 'bool' },
      { name: '_vestingCliff', type: 'uint256' }
    ],
    name: 'createToken',
    outputs: [{ name: 'tokenAddress', type: 'address' }],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [{ name: 'creator', type: 'address' }],
    name: 'getTokensByCreator',
    outputs: [{ name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getAllTokens',
    outputs: [{ name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: 'creator', type: 'address' },
      { indexed: true, name: 'tokenAddress', type: 'address' },
      { indexed: false, name: 'name', type: 'string' },
      { indexed: false, name: 'symbol', type: 'string' }
    ],
    name: 'TokenCreated',
    type: 'event'
  }
] as const;

// OkieSwap DEX ABI
export const OKIE_SWAP_ABI = [
  {
    inputs: [
      { name: 'tokenA', type: 'address' },
      { name: 'tokenB', type: 'address' },
      { name: 'amountADesired', type: 'uint256' },
      { name: 'amountBDesired', type: 'uint256' },
      { name: 'amountAMin', type: 'uint256' },
      { name: 'amountBMin', type: 'uint256' },
      { name: 'to', type: 'address' },
      { name: 'deadline', type: 'uint256' }
    ],
    name: 'addLiquidity',
    outputs: [
      { name: 'amountA', type: 'uint256' },
      { name: 'amountB', type: 'uint256' },
      { name: 'liquidity', type: 'uint256' }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { name: 'amountOutMin', type: 'uint256' },
      { name: 'path', type: 'address[]' },
      { name: 'to', type: 'address' },
      { name: 'deadline', type: 'uint256' }
    ],
    name: 'swapExactETHForTokens',
    outputs: [{ name: 'amounts', type: 'uint256[]' }],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      { name: 'amountIn', type: 'uint256' },
      { name: 'amountOutMin', type: 'uint256' },
      { name: 'path', type: 'address[]' },
      { name: 'to', type: 'address' },
      { name: 'deadline', type: 'uint256' }
    ],
    name: 'swapExactTokensForETH',
    outputs: [{ name: 'amounts', type: 'uint256[]' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { name: 'amountOut', type: 'uint256' },
      { name: 'path', type: 'address[]' }
    ],
    name: 'getAmountsIn',
    outputs: [{ name: 'amounts', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { name: 'amountIn', type: 'uint256' },
      { name: 'path', type: 'address[]' }
    ],
    name: 'getAmountsOut',
    outputs: [{ name: 'amounts', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function'
  }
] as const;

// Liquidity Locker ABI
export const LIQUIDITY_LOCKER_ABI = [
  {
    inputs: [
      { name: 'token', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'unlockTime', type: 'uint256' }
    ],
    name: 'lockLiquidity',
    outputs: [{ name: 'lockId', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ name: 'lockId', type: 'uint256' }],
    name: 'unlockLiquidity',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ name: 'token', type: 'address' }],
    name: 'getLockInfo',
    outputs: [
      { name: 'amount', type: 'uint256' },
      { name: 'unlockTime', type: 'uint256' },
      { name: 'owner', type: 'address' }
    ],
    stateMutability: 'view',
    type: 'function'
  }
] as const;