import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { UseWalletContext } from "./WalletProvider";

const networks = {
  polygon: {
    chainId: ethers.utils.hexValue(80001),
    chainName: "Polygon Testnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
};

function Wallet() {
  useEffect(() => {
    const reset = () => {
      handler.setConnected(false);
      setAddress("");
    };
    window.ethereum.on("accountsChanged", reset);
  }, []);

  const handler = UseWalletContext();
  const [address, setAddress] = useState("");

  const connectWallet = async () => {
    if (address !== "") return;
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    if (provider.network !== "matic") {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks["polygon"],
          },
        ],
      });
      await provider.send("eth_requestAccounts");
      const account = provider.getSigner();
      const Address = await account.getAddress();
      setAddress(Address);
      handler.setConnected(true);
    }
  };
  return (
    <button
      type="button"
      className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      onClick={() => connectWallet()}
    >
      {address == ""
        ? "Connect wallet"
        : address.slice(0, 6) + "..." + address.slice(39)}
    </button>
  );
}

export default Wallet;
