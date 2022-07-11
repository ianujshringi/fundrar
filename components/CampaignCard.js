import Image from "next/image";
import Link from "next/link";
import Campaign from "../artifacts/contracts/campaign.sol/Campaign.json";
import { ethers } from "ethers";
import { useState, useEffect } from "react";

function CampaignCard({ e }) {
  const [rAmount, setRAmount] = useState(0);

  useEffect(() => {
    const getRecievedAmount = async () => {
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_PROVIDER
      );
      const contract = new ethers.Contract(
        e.campaignAddress,
        Campaign.abi,
        provider
      );
      const ramt = await contract.recievedAmount();
      setRAmount(ethers.utils.formatEther(ramt));
    };
    getRecievedAmount();
  }, []);
  return (
    <div>
      <div className="grid grid-rows-2 transform w-full transition duration-500 hover:scale-105 rounded-lg border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700">
        <div className="relative">
          <Image
            priority
            layout="fill"
            objectFit="fill"
            className="rounded-t-lg"
            alt="Dapp Image"
            src={"https://ipfs.io/ipfs/" + e.image}
          ></Image>
        </div>
        <div className="py-3 px-4">
          <div className="mb-2 font-serif font-bold text-violet-800 dark:text-white">
            {e.title}
          </div>
          <div className=" flex flex-col space-y-1 justify-between pb-3 font-normal text-gray-700 dark:text-gray-400">
            <div className="flex justify-between">
              <p className="flex items-center text-lg font-mono">
                Owner
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                  />
                </svg>
              </p>
              <p>
                {e.owner.slice(0, 6)}...{e.owner.slice(39)}
              </p>
            </div>
            <div className="flex flex-col justify-center space-y-1.5 pb-3">
              <div className="flex items-center justify-between">
                <p className="flex items-center text-lg font-mono">
                  Amount
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </p>
                <p>{e.amount} MATIC</p>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full dark:bg-gray-700">
                <div
                  className=" bg-gradient-to-r from-purple-600 to-violet-600 text-[0.6rem] h-3 font-medium text-violet-100 text-center py-[0.08rem] leading-none rounded-full"
                  style={{
                    width:
                      parseInt((rAmount / e.amount) * 100).toString() + "%",
                  }}
                >
                  {parseInt((rAmount / e.amount) * 100)}%
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p>{new Date(e.timestamp * 1000).toLocaleString()}</p>
            </div>
          </div>
          <Link prefetch={false} passHref href={"/" + e.campaignAddress}>
            <button className="inline-flex mt-3 items-center py-2 px-3 text-sm font-medium text-center text-white bg-gradient-to-r from-purple-500 to-violet-700 rounded-lg hover:bg-gradient-to-l focus:ring-2 focus:outline-none focus:ring-violet-300 ">
              Go To Campaign
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
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CampaignCard;
