import { useEffect, useState } from "react";
import Image from "next/image";
import { ethers } from "ethers";
import CampaignFactory from "../artifacts/contracts/campaign.sol/CampaignFactory.json";
import Campaign from "../artifacts/contracts/campaign.sol/Campaign.json";
import Link from "next/link";
import { UseWalletContext } from "../components/WalletProvider";

function Dashboard() {
  const [campaignData, setCampaignData] = useState([]);
  const [flag, setflag] = useState(false);
  const handler = UseWalletContext();

  useEffect(() => {
    if (!handler.connected) return;

    const getUriData = async (uri) => {
      let uriData = await fetch("https://ipfs.io/ipfs//" + uri);
      if (!uriData.ok) return null;
      uriData = await uriData.json();
      if (!uriData.image) {
        uriData = JSON.parse(Object.keys(uriData).at(0));
      }
      return uriData;
    };
    const Request = async () => {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const Web3provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = Web3provider.getSigner();
      const address = await signer.getAddress();

      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_PROVIDER
      );

      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        CampaignFactory.abi,
        provider
      );
      const getDeployedContract = contract.filters.campaignCreated(
        null,
        address
      );
      const events = await contract.queryFilter(getDeployedContract);
      const getData = async () => {
        const data = events.map(async (e) => {
          const imgUri = await getUriData(e.args.imgURI);
          if (imgUri)
            return {
              amount: ethers.utils.formatEther(e.args.requiredAmount),
              owner: e.args.owner,
              image: imgUri.image,
              title: imgUri.title,
              category: imgUri.category,
              timestamp: parseInt(e.args.timestamp),
              address: e.args.campaignAddress,
              recievedAmount: ethers.utils.formatEther(
                await new ethers.Contract(
                  e.args.campaignAddress,
                  Campaign.abi,
                  provider
                ).recievedAmount()
              ),
            };
        });
        return Promise.all(data);
      };
      const data = await getData();
      setCampaignData(data);
      setflag(true);
    };
    Request();
  }, [handler.connected]);

  return handler.connected ? (
    flag ? (
      campaignData.length > 0 ? (
        <div className="flex flex-col gap-3 p-2 md:p-4">
          <div className="grid grid-cols-6 gap-1 bg-gray-200 font-semibold rounded-lg dark:bg-gray-700 justify-items-center items-center py-3 text-sm lg:text-base">
            <span className="col-span-2">Campaign</span>
            <span>Category</span>
            <span>Required Amount</span>
            <span>Recieved Amount</span>
          </div>
          {campaignData.map((e) => (
            <div
              key={e.timestamp}
              className="grid grid-cols-6 gap-1 md:h-20 rounded-lg text-xs p-1  lg:text-sm shadow-md bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-gray-500 dark:text-gray-400"
            >
              <div className="grid gap-2 md:grid-cols-4 col-span-2 w-full">
                <div className="col-span-1 hidden md:block">
                  <div className="relative h-full">
                    <Image
                      layout="fill"
                      objectFit="fill"
                      className=" rounded-lg"
                      alt="Dapp Image"
                      src={"https://ipfs.io/ipfs/" + e.image}
                    ></Image>
                  </div>
                </div>
                <div className="md:col-span-3 w-full justify-center flex flex-col px-4 md:px-1">
                  <p>{e.title}</p>
                  <p>
                    Date:{" "}
                    {
                      new Date(e.timestamp * 1000)
                        .toLocaleString()
                        .split(",")[0]
                    }
                  </p>
                </div>
              </div>
              <div className="flex w-full justify-center items-center">
                {e.category}
              </div>
              <div className="flex w-full justify-center items-center">
                {e.amount} MATIC
              </div>
              <div className="flex w-full justify-center items-center">
                {e.recievedAmount} MATIC
              </div>
              <div className="flex w-full justify-center items-center">
                <Link href={"/" + e.address} passHref>
                  <button className="inline-flex items-center p-1 md:p-2 text-xs md:text-sm font-medium text-center text-white bg-gradient-to-r from-purple-500 to-violet-700 rounded-lg hover:bg-gradient-to-l focus:ring-2 focus:outline-none focus:ring-violet-300 ">
                    Go To Campaign
                    <svg
                      className="ml-2 mt-0.5 -mr-1 w-4 h-4 hidden md:block"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center my-52">
          <div className="flex flex-col items-center rounded-lg border-gray-200 bg-gray-200 shadow-md dark:border-gray-700 dark:bg-gray-700 border-2 p-8 space-y-8">
            <h1 className="text-lg font-mono font-semibold">
              You have not created any campaigns!
            </h1>
            <div className="flex justify-center items-center space-x-8">
              <Link href={"/createCampaign"} passHref>
                <div className="inline-flex cursor-pointer mt-3 items-center py-2 px-3 text-sm font-medium text-center text-white bg-gradient-to-r from-purple-500 to-violet-700 rounded-lg hover:bg-gradient-to-l focus:ring-2 focus:outline-none focus:ring-violet-300 ">
                  Create Campaign
                  <svg
                    className="ml-2 mt-0.5 -mr-1 w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )
    ) : (
      <h1 className="flex justify-center h-80 text-amber-400 text-2xl font-mono items-end">
        Please Wait while we are fetching data...
      </h1>
    )
  ) : (
    <h1 className="flex justify-center h-80 text-amber-400 text-2xl font-mono items-end">
      Please Connect To Wallet
    </h1>
  );
}
export default Dashboard;
