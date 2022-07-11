import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Wallet from "./Wallet";
import { useRouter } from "next/router";
import Link from "next/link";
import { UseWalletContext } from "./WalletProvider";

function Navbar() {
  const handler = UseWalletContext();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const [isNavOpen, setNavOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTheme((theme === systemTheme) === "dark" ? "light" : "dark");
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleNav = () => {
    setNavOpen((prev) => !prev);
    const nav = document.getElementById("mobile-menu").classList;
    isNavOpen === true ? nav.remove("hidden") : nav.add("hidden");
  };

  if (!mounted) return null;
  return (
    <nav className="dark:from-transparent dark:to-transparent bg-gradient-to-r from-slate-50 to-grey-50 border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <div className="flex items-center text-2xl text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-fuchsia-700 font-display font-extrabold tracking-wide whitespace-nowrap">
          <Link href={"/"}>FUNDRAR</Link>
        </div>
        <div className="flex md:order-2 justify-center items-start">
          <Wallet></Wallet>
          <button
            type="button"
            className="hidden md:block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
            onClick={() => toggleTheme()}
          >
            {theme !== "dark" && (
              <svg
                id="theme-toggle-dark-icon"
                className="w-5 h-5 fill-violet-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
            )}
            {theme === "dark" && (
              <svg
                id="theme-toggle-light-icon"
                className="w-5 h-5 fill-violet-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            )}
          </button>
          <button
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={() => toggleNav()}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
          id="mobile-menu"
        >
          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 font-display md:font-semibold">
            <li
              key="Home"
              className={`block py-2 pr-4 pl-3 md:transition md:ease-in-out md:delay-150 md:hover:-translate-y-1 md:hover:scale-110 cursor-pointer md:duration-300 border-b border-gray-100  md:hover:bg-transparent md:border-0 md:hover:text-violet-700 md:p-0 md:dark:hover:text-white  dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${
                router.pathname == "/"
                  ? "dark:md:text-white md:text-violet-700 md:bg-transparent text-white bg-violet-700"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              }`}
            >
              <Link href={"/"}>Home</Link>
            </li>
            {handler.connected && (
              <>
                <li
                  key="createCampaign"
                  className={`block py-2 pr-4 pl-3 md:transition md:ease-in-out md:delay-150 md:hover:-translate-y-1 md:hover:scale-110 cursor-pointer md:duration-300 border-b border-gray-100  md:hover:bg-transparent md:border-0 md:hover:text-violet-700 md:p-0 md:dark:hover:text-white  dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${
                    router.pathname == "/createCampaign"
                      ? "dark:md:text-white md:text-violet-700 md:bg-transparent text-white bg-violet-700"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                  }`}
                >
                  <Link href={"/createCampaign"}>Create Campaign</Link>
                </li>

                <li
                  key="dashboard"
                  className={`block py-2 pr-4 pl-3 md:transition md:ease-in-out md:delay-150 md:hover:-translate-y-1 md:hover:scale-110 cursor-pointer md:duration-300 border-b border-gray-100  md:hover:bg-transparent md:border-0 md:hover:text-violet-700 md:p-0 md:dark:hover:text-white  dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${
                    router.pathname == "/dashboard"
                      ? "dark:md:text-white md:text-violet-700 md:bg-transparent text-white bg-violet-700"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                  }`}
                >
                  <Link href={"/dashboard"}>Dashboard</Link>
                </li>
              </>
            )}
            <li
              key="theme"
              className="md:hidden flex flex-wrap justify-between items-center"
            >
              <span className="block py-2 pr-4 pl-3 text-gray-700 border-gray-100 dark:text-gray-400 dark:border-gray-700">
                Dark Mode
              </span>
              <label className="relative mx-4 items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="small-toggle"
                  className="sr-only peer"
                  onChange={() => toggleTheme()}
                  checked={theme === "dark" ? true : false}
                />
                <div className="w-9 h-5 bg-gray-200 peer-hover:ring-opacity-20 peer-hover:ring-2 peer-hover:ring-violet-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-violet-700"></div>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
