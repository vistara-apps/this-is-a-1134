import { defineChain } from 'viem';

// X Layer Mainnet configuration
export const xLayer = defineChain({
  id: 196,
  name: 'X Layer Mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'OKB',
    symbol: 'OKB',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.xlayer.tech'],
      webSocket: ['wss://ws.xlayer.tech'],
    },
  },
  blockExplorers: {
    default: {
      name: 'X Layer Explorer',
      url: 'https://www.okx.com/web3/explorer/xlayer',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 47416,
    },
  },
});

// X Layer Testnet configuration
export const xLayerTestnet = defineChain({
  id: 195,
  name: 'X Layer Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'OKB',
    symbol: 'OKB',
  },
  rpcUrls: {
    default: {
      http: ['https://testrpc.xlayer.tech'],
      webSocket: ['wss://testws.xlayer.tech'],
    },
  },
  blockExplorers: {
    default: {
      name: 'X Layer Testnet Explorer',
      url: 'https://www.okx.com/web3/explorer/xlayer-test',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 47416,
    },
  },
  testnet: true,
});

// Chain configuration for the app
export const supportedChains = [xLayer, xLayerTestnet] as const;
export const defaultChain = xLayer;