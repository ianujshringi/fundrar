import { createContext, useState, useContext } from "react";

const WalletContext = createContext();

export function WalletProvider({ children }) {
  const [connected, setConnected] = useState(false);
  return (
    <WalletContext.Provider value={{ connected, setConnected }}>
      {children}
    </WalletContext.Provider>
  );
}

export const UseWalletContext = () => {
  return useContext(WalletContext);
};
