const { ethers } = require("ethers");
const fs = require("fs");
const {
  APE_COIN_PRECISION,
  STAKING_CONTRACT_ADDRESS,
} = require("../staking-config.js");

/**
 * Mints Ape coins and approve spending.
 *
 * @param {Wallet} wallet ethers wallet minting the coins
 * @param {string} mintingAmount how many coins to mint
 */
const mintAndApproveApeCoin = async (wallet, mintingAmount) => {
  console.log("minting ApeCoin...");
  try {
    const apeCoinContractAbi = fs.readFileSync(
      "./abi/ApeCoin.abi.json",
      "utf8"
    );
    const apeCoinContract = new ethers.Contract(
      process.env.APECOIN_GOERLI_CONTRACT_ADDRESS,
      apeCoinContractAbi,
      wallet
    );
    let txResponse = await apeCoinContract.mint(
      wallet.address,
      ethers.utils.parseUnits(mintingAmount, APE_COIN_PRECISION)
    );
    await txResponse.wait();
    console.log(`minted ${mintingAmount} APE`);

    // approve APE coin spending
    console.log("approving APE spending...");
    const spendingAmount = "1000";
    txResponse = await apeCoinContract.approve(
      STAKING_CONTRACT_ADDRESS,
      ethers.utils.parseUnits(spendingAmount, APE_COIN_PRECISION)
    );
    await txResponse.wait();
    console.log(`approved ${spendingAmount} APE spending`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { mintAndApproveApeCoin };
