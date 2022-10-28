const { ethers } = require("ethers");
require("dotenv").config();
const fs = require("fs");
const {
  stakingConfig,
  ETHEREUM_RPC_URL,
  STAKING_CONTRACT_ADDRESS,
  APE_COIN_PRECISION,
  OPENSEA_URL,
} = require("../staking-config.js");

/**
 * Returns a list of staking data objects.
 *
 * @param {string} collectionName The name of the NFT collection to check.
 * It can be 'bayc', 'mayc' or 'bakc' (defined in staking-config.js).
 * undefined if the script was called from the command line.
 * @param {number[]} tokens The token IDs of the NFTsto check.
 * undefined if the script was called from the command line.
 * @return {Object[]} list of staking data objects.
 */
const checkStaking = async (collectionName, tokens) => {
  const nftCollection = collectionName ? collectionName : process.argv[2];
  const tokenIds = tokens ? tokens : process.argv.slice(3);

  // get the staking contract
  const provider = new ethers.providers.JsonRpcProvider(ETHEREUM_RPC_URL);
  const abi = fs.readFileSync("./abi/ApeCoinStakingLight.abi.json", "utf8");
  const stakingContract = new ethers.Contract(
    STAKING_CONTRACT_ADDRESS,
    abi,
    provider
  );

  let result = [];
  for await (const tokenId of tokenIds) {
    if (isNaN(tokenId)) {
      console.error("The token ID must be a number.");
    } else {
      const nftPosition = await stakingContract.nftPosition(
        stakingConfig[nftCollection].poolId,
        tokenId
      );
      const stakingData = {
        tokenId: tokenId,
        stakedAmount: `${ethers.utils.formatUnits(
          nftPosition.stakedAmount,
          APE_COIN_PRECISION
        )} APE`,
        rewards: `${ethers.utils.formatUnits(
          nftPosition.rewardsDebt,
          APE_COIN_PRECISION
        )} APE`,
        url: `${OPENSEA_URL}/${stakingConfig[nftCollection].contractAddress}/${tokenId}`,
      };
      result.push(stakingData);
    }
  }

  return result;
};

module.exports = { checkStaking };
