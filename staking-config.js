require("dotenv").config();

const stakingConfig = {
  bayc: {
    poolId: 1,
    contractAddress: process.env.APECOIN_STAKING_MAINNET_CONTRACT_ADDRESS
      ? process.env.BAYC_MAINNET_CONTRACT_ADDRESS
      : process.env.BAYC_GOERLI_CONTRACT_ADDRESS,
  },
  mayc: {
    poolId: 2,
    contractAddress: process.env.APECOIN_STAKING_MAINNET_CONTRACT_ADDRESS
      ? process.env.MAYC_MAINNET_CONTRACT_ADDRESS
      : process.env.MAYC_GOERLI_CONTRACT_ADDRESS,
  },
  bakc: {
    poolId: 3,
    contractAddress: process.env.APECOIN_STAKING_MAINNET_CONTRACT_ADDRESS
      ? process.env.BAKC_MAINNET_CONTRACT_ADDRESS
      : process.env.BAKC_GOERLI_CONTRACT_ADDRESS,
  },
};

const ETHEREUM_RPC_URL = process.env.APECOIN_STAKING_MAINNET_CONTRACT_ADDRESS
  ? process.env.ETHEREUM_MAINNET_RPC_URL
  : process.env.ETHEREUM_GOERLI_RPC_URL;

const STAKING_CONTRACT_ADDRESS = process.env
  .APECOIN_STAKING_MAINNET_CONTRACT_ADDRESS
  ? process.env.APECOIN_STAKING_MAINNET_CONTRACT_ADDRESS
  : process.env.APECOIN_STAKING_GOERLI_CONTRACT_ADDRESS;

const APE_COIN_PRECISION = "18";

const OPENSEA_URL = process.env.APECOIN_STAKING_MAINNET_CONTRACT_ADDRESS
  ? process.env.OPENSEA_MAINNET_URL
  : process.env.OPENSEA_TESTNET_URL;

module.exports = {
  stakingConfig,
  ETHEREUM_RPC_URL,
  STAKING_CONTRACT_ADDRESS,
  APE_COIN_PRECISION,
  OPENSEA_URL,
};
