import "../styles/globals.css";
import Navbar from "../components/navbar";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WalletProvider } from "../components/WalletProvider";

function MyApp({ Component, pageProps }) {
  return (
    <div className="dark:from-transparent dark:to-transparent bg-gradient-to-r from-slate-50 to-grey-50 dark:bg-gray-900 w-screen min-h-screen overflow-hidden">
      <ThemeProvider attribute="class">
        <ToastContainer theme="dark" />
        <WalletProvider>
          <Navbar />
          <Component {...pageProps} />
        </WalletProvider>
      </ThemeProvider>
    </div>
  );
}

export default MyApp;
