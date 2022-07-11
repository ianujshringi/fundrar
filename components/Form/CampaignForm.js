import { useState } from "react";
import Submit from "../Submit";

function CampaignForm() {
  const [form, setForm] = useState({
    campaignTitle: "",
    category: "",
    story: "",
    requiredAmount: "",
  });

  const FormHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [image, setImage] = useState(null);

  const ImageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const styles = {
    input:
      "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600  dark:text-white",
    amount:
      "rounded-none rounded-l-lg bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600  dark:text-white",
    category:
      "bg-gray-50 border invalid:focus:text-gray-900 invalid:text-gray-400 dark:text-white dark:invalid:focus:text-white dark:invalid:text-gray-400 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600",
    label: "block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400",
  };

  return (
    <form className="m-6 flex flex-col justify-center">
      <div className="grid lg:gap-6 gap-3 mb-6 lg:grid-cols-2">
        <div>
          <label className={styles.label}>Campaign Title *</label>
          <input
            type="text"
            id="first_name"
            className={styles.input}
            placeholder="Write a title"
            required
            name="campaignTitle"
            value={form.campaignTitle}
            onChange={FormHandler}
          />
        </div>
        <div>
          <label className={styles.label}>Select a category *</label>
          <select
            id="default"
            className={styles.category}
            required
            name="category"
            value={form.category}
            onChange={FormHandler}
          >
            <option value="" disabled hidden>
              Choose a category
            </option>
            <option>Education</option>
            <option>Technology</option>
            <option>Health</option>
          </select>
        </div>
        <div>
          <label className={styles.label}>Story *</label>
          <textarea
            id="story"
            rows="4"
            className={styles.input}
            placeholder="Write your story..."
            required
            name="story"
            value={form.story}
            onChange={FormHandler}
          ></textarea>
        </div>
        <div className="lg:row-auto row-start-4">
          <label className={styles.label}>Amount *</label>
          <div className="flex">
            <input
              id="website-admin"
              className={styles.amount}
              placeholder="0.00"
              required
              name="requiredAmount"
              value={form.requiredAmount}
              onChange={FormHandler}
              type="number"
              min="0"
              step={0.1}
            />
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-r-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              MATIC
            </span>
          </div>
        </div>
        <div className="lg:row-auto row-start-3 lg:col-span-full">
          <label className={styles.label}>Upload Image</label>
          <label className="flex relative flex-col justify-center items-center w-full h-auto bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col justify-center items-center pt-5 pb-6">
              <svg
                className="mb-3 w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {image ? image.name : "PNG, JPG or JPEG"}
              </p>
            </div>
            <input
              name="image"
              onChange={ImageHandler}
              id="dropzone-file"
              type="file"
              accept=".png, .jpeg, .jpg"
              className="absolute inset-0 file:hidden text-transparent cursor-pointer"
              required
            />
          </label>
        </div>
      </div>
      <Submit image={image} form={form} />
    </form>
  );
}

export default CampaignForm;
