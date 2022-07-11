import { useEffect, useState } from "react";
import Image from "next/image";
import { ethers } from "ethers";
import CampaignFactory from "../artifacts/contracts/campaign.sol/CampaignFactory.json";
import Campaign from "../artifacts/contracts/campaign.sol/Campaign.json";
import { UseWalletContext } from "../components/WalletProvider";

export default function Detail({ data, donationData }) {
  const handler = UseWalletContext();
  const [myDonations, setMyDonations] = useState([]);
  const [amount, setAmount] = useState();
  const [change, setChange] = useState(false);

  useEffect(() => {
    if (!handler.connected) return;
    const Request = async () => {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const Web3provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = Web3provider.getSigner();
      const address = await signer.getAddress();

      const provider = new ethers.providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_PROVIDER
      );
      const contract = new ethers.Contract(
        data.address,
        Campaign.abi,
        provider
      );

      const myDonations = contract.filters.donated(address);
      const myAllDonations = await contract.queryFilter(myDonations);

      setMyDonations(
        myAllDonations.map((e) => {
          return {
            donar: e.args.donar,
            amount: ethers.utils.formatEther(e.args.amount),
            timestamp: parseInt(e.args.timestamp),
          };
        })
      );
    };
    Request();
  }, [change, handler.connected]);

  const Donate = async () => {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const Web3provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = Web3provider.getSigner();

      const contract = new ethers.Contract(data.address, Campaign.abi, signer);

      const tx = await contract.donate({
        value: ethers.utils.parseEther(amount),
      });
      await tx.wait();
      setChange(true);
      setAmount("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="mt-6 px-8">
      <main className="grid lg:gap-8 gap-3 md:grid-cols-10 justify-items-center w-full">
        <div className="md:col-start-2 md:col-span-3 w-full justify-items-center rounded-lg p-2">
          <div className="relative h-52 lg:h-80 border-4 border-violet-500 dark:border-none">
            <Image
              alt="Dapp Image"
              priority
              layout="fill"
              objectFit="fill"
              className="rounded-lg dark:rounded-b-none"
              src={"https://ipfs.io/ipfs/" + data.image}
            ></Image>
          </div>
          <div className="grid dark:bg-gray-800 rounded-b-lg p-2">
            <div className="text-lg text-center font-bold tracking-tight text-violet-800 dark:text-white">
              {data.title}
            </div>
            <div className=" pt-1 font-mono text-sm dark:text-gray-200 text-left">
              {data.story}
            </div>
          </div>
        </div>
        <div className="md:col-start-5 md:col-span-5 w-full row-span-1 rounded-lg dark:bg-gray-800 space-y-6 p-2">
          {handler.connected && (
            <div className="flex justify-items-center space-x-2">
              <div className="flex w-full">
                <input
                  className="rounded-none rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600  dark:text-white"
                  placeholder="0.00"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  name="requiredAmount"
                  type="number"
                  min="0"
                  step={0.1}
                />
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-r-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  MATIC
                </span>
              </div>
              <button
                onClick={Donate}
                className="inline-flex items-center py-2 px-10 text-sm font-medium text-center text-white bg-gradient-to-r from-purple-500 to-violet-700 rounded-lg hover:bg-gradient-to-l focus:ring-2 focus:outline-none focus:ring-violet-300 "
              >
                Donate
              </button>
            </div>
          )}
          <div className="flex flex-col justify-center pb-3">
            <div className="flex items-center justify-between dark:text-gray-300">
              <p
                className="flex items-center text-lg 
              font-mono"
              >
                Amount
              </p>
              <p>{data.requiredAmount} MATIC</p>
            </div>
            <div className="w-full h-5 bg-gray-200 rounded-full dark:bg-gray-700">
              <div
                className=" bg-gradient-to-r from-purple-600 to-violet-600 text-sm p-1 h-5 font-medium text-violet-100 text-center leading-none rounded-full"
                style={{
                  width:
                    parseInt(
                      (data.recievedAmount / data.requiredAmount) * 100
                    ).toString() + "%",
                }}
              ></div>
            </div>
            <p className="pt-0.5 text-xs text-gray-600 dark:text-gray-400 text-right">
              {data.recievedAmount} MATIC raised so far
            </p>
          </div>

          <div className="donations space-y-2">
            <span className="flex justify-center w-full p-1 text-white rounded-lg font-mono bg-gradient-to-r from-teal-400 to-emerald-400">
              Recent Donations
            </span>

            <div className="flex flex-col w-full shadow-md overflow-y-hidden">
              <ul className="bg-gray-200 text-sm rounded-t-lg dark:bg-gray-700 flex justify-between py-1 px-8">
                <li>Address</li>
                <li>Amount</li>
                <li>Date & Time</li>
              </ul>
              {donationData.map((e) => (
                <div
                  key={e.timestamp}
                  className="flex justify-between items-center dark:text-gray-400 text-xs bg-white border-b dark:bg-gray-800 dark:border-gray-700 px-6 py-2"
                >
                  <p>
                    {e.donar.slice(0, 6)}...{e.donar.slice(39)}
                  </p>
                  <p className="ml-6">{e.amount} MATIC</p>
                  <p>{new Date(e.timestamp * 1000).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
          {handler.connected && (
            <div className="donations space-y-2">
              <span className="flex justify-center w-full p-1 text-white rounded-lg font-mono bg-gradient-to-r from-teal-400 to-emerald-400">
                My Past Donations
              </span>
              <div className="flex flex-col w-full shadow-md overflow-y-hidden">
                <ul className="bg-gray-200 text-sm rounded-t-lg dark:bg-gray-700 flex justify-between py-1 px-8">
                  <li>Address</li>
                  <li>Amount</li>
                  <li>Date & Time</li>
                </ul>
                {myDonations.map((e) => (
                  <div
                    key={e.timestamp}
                    className="flex justify-between items-center dark:text-gray-400 text-xs bg-white border-b dark:bg-gray-800 dark:border-gray-700 px-6 py-2"
                  >
                    <p>
                      {e.donar.slice(0, 6)}...{e.donar.slice(39)}
                    </p>
                    <p className="ml-6">{e.amount} MATIC</p>
                    <p>{new Date(e.timestamp * 1000).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_PROVIDER
  );
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    CampaignFactory.abi,
    provider
  );
  const getAllCampaigns = contract.filters.campaignCreated();
  const AllCampaigns = await contract.queryFilter(getAllCampaigns);

  return {
    paths: AllCampaigns.map((e) => ({
      params: { address: e.args.campaignAddress.toString() },
    })),
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_PROVIDER
  );
  const contract = new ethers.Contract(
    context.params.address,
    Campaign.abi,
    provider
  );

  const uri = await contract.img();
  let uriData = await fetch("https://ipfs.io/ipfs//" + uri);
  if (!uriData.ok) throw new Error("Failed to fetch data from ipfs");
  uriData = await uriData.json();
  if (!uriData.image) {
    uriData = JSON.parse(Object.keys(uriData).at(0));
  }
  const title = uriData.title;
  const story = uriData.story;
  const image = uriData.image;
  const requiredAmount = await contract.requiredAmount();
  const recievedAmount = await contract.recievedAmount();
  const owner = await contract.owner();

  const donations = contract.filters.donated();
  const Alldonations = await contract.queryFilter(donations);

  const data = {
    address: context.params.address,
    title: title,
    requiredAmount: ethers.utils.formatEther(requiredAmount),
    image: image,
    recievedAmount: ethers.utils.formatEther(recievedAmount),
    story: story,
    owner: owner,
  };

  const donationData = Alldonations.map((e) => {
    return {
      donar: e.args.donar,
      amount: ethers.utils.formatEther(e.args.amount),
      timestamp: parseInt(e.args.timestamp),
    };
  });

  return {
    props: { data, donationData },
  };
}
