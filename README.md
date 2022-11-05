## Yacht Club Staking

This tool allows to know if a Bored Ape Yacht Club, Mutant Ape Yacht Club or Bored Ape Kennel Club NFT has staked APE or pending rewards.

The official documentation for ApeCoin staking is available here: https://docs.apestake.io/.

## Running Tests

1. Create a `.env` file to set the environment variables from `.env.example`.
2. Run this command in the root folder of the project:
```sh
yarn test
```

## Usage

The tool runs on Goerli testnet by default.
You must set the `APECOIN_STAKING_MAINNET_CONTRACT_ADDRESS` environment variable to run it on mainnet.

### Checking Bored Ape Yacht Club

From the command line:
```sh
yarn checkbayc 47 195
```

Output:
```sh
[
  {
    tokenId: '47',
    stakedAmount: '10094.0 APE',
    pendingRewards: '1398280.036453699813277808 APE',
    url: 'https://testnets.opensea.io/assets/goerli/0xF40299b626ef6E197F5d9DE9315076CAB788B6Ef/47'
  },
  {
    tokenId: '195',
    stakedAmount: '0.0 APE',
    pendingRewards: '0.0 APE',
    url: 'https://testnets.opensea.io/assets/goerli/0xF40299b626ef6E197F5d9DE9315076CAB788B6Ef/195'
  }
]
```

From code:
```js
const nfts = await checkStaking("bayc", [47, 195]);
```

### Checking Mutant Ape Yacht Club

From the command line:
```sh
yarn checkmayc 16 30
```

Output:
```sh
[
  {
    tokenId: '16',
    stakedAmount: '41.0 APE',
    pendingRewards: '3548.410565665228096466 APE',
    url: 'https://testnets.opensea.io/assets/goerli/0x3f228cBceC3aD130c45D21664f2C7f5b23130d23/16'
  },
  {
    tokenId: '30',
    stakedAmount: '0.0 APE',
    pendingRewards: '0.0 APE',
    url: 'https://testnets.opensea.io/assets/goerli/0x3f228cBceC3aD130c45D21664f2C7f5b23130d23/30'
  }
]
```

From code:
```js
const nfts = await checkStaking("mayc", [16, 30]);
```

### Checking Bored Ape Kennel Club

From the command line:
```sh
yarn checkbakc 12 50
```

Output:
```sh
[
  {
    tokenId: '12',
    stakedAmount: '37.0 APE',
    pendingRewards: '2494.80385771472556564 APE',
    url: 'https://testnets.opensea.io/assets/goerli/0xd60d682764Ee04e54707Bee7B564DC65b31884D0/12'
  },
  {
    tokenId: '50',
    stakedAmount: '0.0 APE',
    pendingRewards: '0.0 APE',
    url: 'https://testnets.opensea.io/assets/goerli/0xd60d682764Ee04e54707Bee7B564DC65b31884D0/50'
  }
]
```

From code:
```js
const nfts = await checkStaking("bakc", [12, 50]);
```
