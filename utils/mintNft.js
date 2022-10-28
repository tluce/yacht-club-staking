const { ethers } = require("ethers");

/**
 * Mints an NFT.
 *
 * @param {string} contractAddress address of the NFT contract
 * @param {string} abi abi of the NFT contract
 * @param {Wallet} wallet ethers wallet minting the NFT
 * @return {number} token ID of the minted NFT
 */
const mintNft = async (contractAddress, abi, wallet) => {
  console.log(`minting an NFT on ${contractAddress}...`);
  let tokenId;
  try {
    const nftContract = new ethers.Contract(contractAddress, abi, wallet);
    const txResponse = await nftContract.mint(1);
    await txResponse.wait();
    const nbOfTokens = await nftContract.balanceOf(wallet.address);
    tokenId = await nftContract.tokenOfOwnerByIndex(
      wallet.address,
      nbOfTokens - 1
    );
    console.log(`minted token #${tokenId}`);
  } catch (error) {
    console.error(error);
  } finally {
    return tokenId.toNumber();
  }
};

module.exports = { mintNft };
