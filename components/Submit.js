import { useState, useContext } from "react";
import { create as IPFSHTTPCLIENT } from "ipfs-http-client";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import CampaignFactory from "../artifacts/contracts/campaign.sol/CampaignFactory.json";
import { FormState } from "../pages/createCampaign";
import axios from "axios";
import FormData from "form-data";

const client = IPFSHTTPCLIENT("https://ipfs.infura.io:5001/api/v0");

const UploadToIPFS = async (file) => {
  try {
    const tx = await client.add(file);
    // console.log(tx.path);
    return tx.path;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const UploadToPinata = async (file, isImage) => {
  try {
    const url = isImage
      ? "https://api.pinata.cloud/pinning/pinFileToIPFS"
      : "https://api.pinata.cloud/pinning/pinJSONToIPFS";
    const data = isImage ? new FormData() : file;
    if (isImage) data.append("file", file);
    const res = await axios({
      method: "post",
      url: url,
      data: data,
      headers: {
        pinata_api_key: `${process.env.NEXT_PUBLIC_PINATA_API_KEY}`,
        pinata_secret_api_key: `${process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY}`,
      },
    });
    return res.data.IpfsHash;
  } catch (error) {
    console.log(error);
    return null;
  }
};

function Submit({ image, form }) {
  const formStateHandler = useContext(FormState);
  const [isUploading, setIsUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const UploadFiles = async () => {
    if (uploaded) return false;
    // Upload image
    const imageUri = process.env.NEXT_PUBLIC_DEVELOPMENT
      ? await UploadToPinata(image, true)
      : await UploadToIPFS(image);
    if (!imageUri) return false;
    const metadata = {
      image: imageUri,
      title: form.campaignTitle,
      story: form.story,
      category: form.category,
      amount: form.requiredAmount,
    };
    // upload metadata
    const URI = process.env.NEXT_PUBLIC_DEVELOPMENT
      ? await UploadToPinata(JSON.stringify(metadata), false)
      : await UploadToIPFS(JSON.stringify(metadata));
    return URI
      ? (toast.success("Files uploaded successfully"), setUploaded(true), URI)
      : false;
  };

  const CreateCampaign = async (uri) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        CampaignFactory.abi,
        signer
      );
      console.log("Starting new campaign.......");
      const campaignData = await contract.create_campaign(
        ethers.utils.parseEther(form.requiredAmount),
        uri
      );
      await campaignData.wait();
      console.log(campaignData);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const HandleSubmit = async (e) => {
    if (
      !image ||
      !form.campaignTitle ||
      !form.story ||
      !form.requiredAmount ||
      !form.category
    )
      return;
    e.preventDefault();
    setIsUploading(true);
    const tx = await UploadFiles();
    if (!tx) {
      toast.error("Failed To upload files");
      setIsUploading(false);
      return;
    }

    const ctx = await CreateCampaign(tx);
    ctx
      ? (toast.success("Campaign created successfully"),
        formStateHandler.setShowForm(false))
      : toast.error("An error occured while creating campaign");
    setIsUploading(false);
    setUploaded(false);
  };

  return (
    <button
      type="submit"
      className="lg:mt-5 text-white disabled:text-gray-300 bg-violet-600 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 disabled:hover:bg-violet-600 text-center cursor-pointer"
      onClick={HandleSubmit}
      disabled={isUploading}
    >
      <div className="flex justify-center items-center space-x-2">
        {isUploading && (
          <div className="flex justify-center items-center">
            <div className="relative w-7 h-7 animate-spin rounded-full bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
              <div className="absolute w-6 h-6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-violet-600 rounded-full"></div>
            </div>
          </div>
        )}
        <div>
          {!isUploading
            ? "Create Campaign"
            : !uploaded && isUploading
            ? "Uploading Files To IPFS..."
            : "Creating Campaign..."}
        </div>
      </div>
    </button>
  );
}

export default Submit;
