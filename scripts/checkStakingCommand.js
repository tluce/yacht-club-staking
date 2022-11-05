const { checkStaking } = require("./checkStaking");

// called from the command line
checkStaking()
  .then((stakingData) => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
