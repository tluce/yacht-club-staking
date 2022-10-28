const { ethers, BigNumber } = require("ethers");
const { assert } = require("chai");
const fs = require("fs");
const { stakingConfig, APE_COIN_PRECISION } = require("../staking-config.js");
const { mintAndApproveApeCoin } = require("../utils/mintAndApproveApeCoin");
const { mintNft } = require("../utils/mintNft");
const { checkStaking } = require("../scripts/checkStaking");

describe("checkStaking test", async () => {
  // get the staking contract
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.ETHEREUM_GOERLI_RPC_URL
  );
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const stakingContractAbi = fs.readFileSync(
    "./abi/ApeCoinStakingFull.abi.json",
    "utf8"
  );
  const stakingContract = new ethers.Contract(
    process.env.APECOIN_STAKING_GOERLI_CONTRACT_ADDRESS,
    stakingContractAbi,
    wallet
  );

  describe("checkStaking", () => {
    it("reads a BAYC's staked amount and rewards debt", async () => {
      // mint and approve APE coin spending
      await mintAndApproveApeCoin(wallet, "42");

      // mint a BAYC
      const tokenId = await mintNft(
        process.env.BAYC_GOERLI_CONTRACT_ADDRESS,
        fs.readFileSync("./abi/Bayc.abi.json", "utf8"),
        wallet
      );

      // deposit APE coins to the BAYC pool
      const amountToStake = "40";
      console.log(`depositing ${amountToStake} APE to the BAYC pool...`);
      const nft = {
        tokenId: tokenId,
        amount: ethers.utils.parseUnits(amountToStake, APE_COIN_PRECISION),
      };
      const txResponse = await stakingContract.depositBAYC([nft]);
      await txResponse.wait();

      // check staking data
      const stakedNft = (await checkStaking("bayc", [tokenId]))[0];
      console.log("Staked NFT:");
      console.log(stakedNft);

      // remove "APE" and the decimal point from stakedNft.stakedAmount
      const stakedAmount = BigNumber.from(
        stakedNft.stakedAmount.split(" ")[0].split(".")[0]
      );
      // remove "APE" and the decimal point from stakedNft.rewards
      const rewards = BigNumber.from(
        stakedNft.rewards.split(" ")[0].split(".")[0]
      );

      assert.equal(stakedNft.tokenId, tokenId);
      assert.equal(stakedAmount.toString(), amountToStake);
      assert.isTrue(rewards.gt(0));
    });
  });
});
