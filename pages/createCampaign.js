import CampaignForm from "../components/Form/CampaignForm";
import { createContext, useState } from "react";
import { UseWalletContext } from "../components/WalletProvider";
import Link from "next/link";

const FormState = createContext();

function CreateCampaign() {
  const handler = UseWalletContext();
  const [showForm, setShowForm] = useState(true);
  return handler.connected ? (
    <FormState.Provider value={{ setShowForm }}>
      {showForm ? (
        <CampaignForm />
      ) : (
        <div className="flex justify-center my-52">
          <div className="flex flex-col items-center rounded-lg border-gray-200 bg-gray-200 shadow-md dark:border-gray-700 dark:bg-gray-700 border-2 p-8 space-y-8">
            <h1 className="text-lg font-mono font-semibold">
              Campaign Created Successfully!
            </h1>
            <div className="flex justify-center items-center space-x-8">
              <Link href={"/createCampaign"} passHref>
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex cursor-pointer mt-3 items-center py-2 px-3 text-sm font-medium text-center text-white bg-gradient-to-r from-purple-500 to-violet-700 rounded-lg hover:bg-gradient-to-l focus:ring-2 focus:outline-none focus:ring-violet-300 "
                >
                  Create Another Campaign
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
              <Link href={"/dashboard"} passHref>
                <button className="inline-flex cursor-pointer mt-3 items-center py-2 px-3 text-sm font-medium text-center text-white bg-gradient-to-r from-purple-500 to-violet-700 rounded-lg hover:bg-gradient-to-l focus:ring-2 focus:outline-none focus:ring-violet-300 ">
                  Go To Dashboard
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
      )}
    </FormState.Provider>
  ) : (
    <h1 className="flex justify-center h-80 text-amber-400 text-2xl font-mono items-end">
      Please Connect To Wallet
    </h1>
  );
}

export default CreateCampaign;
export { FormState };
