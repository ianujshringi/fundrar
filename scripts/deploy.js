const fs = require("fs");
const { ethers } = require("hardhat");

async function main() {
  const CampaignFactory = await ethers.getContractFactory("CampaignFactory");
  const campaignFactory = await CampaignFactory.deploy();

  await campaignFactory.deployed();

  console.log(
    `campaignFactory deployed to address : ${campaignFactory.address}`
  );
  UpdateEnv(campaignFactory.address);
}

const UpdateEnv = (address) => {
  const arr = fs.readFileSync("./.env.local", "utf-8").split("\n");
  // console.log(arr);
  const updatedArr = arr.map((line) => {
    return line.split("=")[0] == "NEXT_PUBLIC_CONTRACT_ADDRESS"
      ? `NEXT_PUBLIC_CONTRACT_ADDRESS="${address}"`
      : line;
  });
  // console.log(updatedArr);
  fs.writeFileSync("./.env.local", updatedArr.join("\n"));
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
