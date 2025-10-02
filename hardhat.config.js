require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("hardhat-gas-reporter");
require("solidity-coverage");

// Load environment variables
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x0000000000000000000000000000000000000000000000000000000000000000";
const XLAYER_RPC_URL = process.env.XLAYER_RPC_URL || "https://rpc.xlayer.tech";
const XLAYER_TESTNET_RPC_URL = process.env.XLAYER_TESTNET_RPC_URL || "https://testrpc.xlayer.tech";

module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 31337,
    },
    xlayer: {
      url: XLAYER_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 196,
      gasPrice: 20000000000, // 20 gwei
    },
    xlayerTestnet: {
      url: XLAYER_TESTNET_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 195,
      gasPrice: 20000000000, // 20 gwei
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    // X Layer explorer API (if available)
    apiKey: {
      xlayer: "your-api-key-here",
      xlayerTestnet: "your-api-key-here",
    },
    customChains: [
      {
        network: "xlayer",
        chainId: 196,
        urls: {
          apiURL: "https://www.okx.com/web3/explorer/xlayer/api",
          browserURL: "https://www.okx.com/web3/explorer/xlayer",
        },
      },
      {
        network: "xlayerTestnet",
        chainId: 195,
        urls: {
          apiURL: "https://www.okx.com/web3/explorer/xlayer-test/api",
          browserURL: "https://www.okx.com/web3/explorer/xlayer-test",
        },
      },
    ],
  },
};