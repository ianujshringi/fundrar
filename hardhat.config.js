require("@nomiclabs/hardhat-waffle");
require("dotenv").config({ path: "./.env.local" });

module.exports = {
  solidity: "0.8.10",
  networks: {
    ganache: {
      url: process.env.NEXT_PUBLIC_PROVIDER,
      accounts: [process.env.NEXT_PUBLIC_PRIVATE_KEY],
    },
    polygon: {
      url: process.env.NEXT_PUBLIC_RPC_URL,
      accounts: [process.env.NEXT_PUBLIC_PRIVATE_KEY],
    },
  },
};
