import Head from "next/head";
import { ethers } from "ethers";
import CampaignFactory from "../artifacts/contracts/campaign.sol/CampaignFactory.json";
import { useState } from "react";
import CampaignCard from "../components/CampaignCard";

export default function Home({ data }) {
  const styles = {
    category:
      "cursor-pointer inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-purple-500 hover:border-purple-300 group",
    svg: "mr-1 w-5 h-5",
  };
  const [category, setCategory] = useState("All");
  return (
    <div className="container overflow-x-hidden">
      <Head>
        <title>FUNDRAR</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
            <div className="pr-4">
              <a
                onClick={() => setCategory("All")}
                className={`${styles.category} ${
                  category == "All" ? "text-violet-500" : ""
                }`}
              >
                <svg
                  className={`${styles.svg} ${
                    category == "All" ? "text-violet-500" : ""
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                </svg>
                All
              </a>
            </div>
            <div className="pr-2">
              <a
                onClick={() => setCategory("Health")}
                className={`${styles.category} ${
                  category == "Health" ? "text-purple-500" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${styles.svg} ${
                    category == "Health" ? "text-purple-500" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Health
              </a>
            </div>
            <div className="pr-2">
              <a
                onClick={() => setCategory("Education")}
                className={`${styles.category} ${
                  category == "Education" ? "text-purple-500" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${styles.svg} ${
                    category == "Education" ? "text-purple-500" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                </svg>
                Education
              </a>
            </div>
            <div className="pr-2">
              <a
                onClick={() => setCategory("Technology")}
                className={`${styles.category} ${
                  category == "Technology" ? "text-purple-500" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${styles.svg} ${
                    category == "Technology" ? "text-purple-500" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                Technology
              </a>
            </div>
          </div>
        </div>
        <div className=" p-10 grid justify-items-center md:grid-cols-3 lg:grid-cols-4 gap-6 w-full box-border">
          {(category == "All"
            ? data
            : data.filter((t) => t.category == category)
          ).map((e) => (
            <div key={e.campaignAddress} className="w-10/12 md:w-full">
              <CampaignCard e={e} key={e.timestamp} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_PROVIDER
  );

  await provider.ready;

  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    CampaignFactory.abi,
    provider
  );

  const getDeployedContract = contract.filters.campaignCreated();
  const events = await contract.queryFilter(getDeployedContract);

  const getUriData = async (uri) => {
    let uriData = await fetch("https://ipfs.io/ipfs//" + uri);
    if (!uriData.ok) return null;
    uriData = await uriData.json();
    if (!uriData.image) {
      uriData = JSON.parse(Object.keys(uriData).at(0));
    }
    return uriData;
  };

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
          story: imgUri.story,
          timestamp: parseInt(e.args.timestamp),
          campaignAddress: e.args.campaignAddress,
        };
    });
    return Promise.all(data);
  };

  const data = await getData();

  return { props: { data } };
}
