'use client'

import MainPage from "@/pages/MainPage";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import TrxPage from "@/pages/TrxPage";
import { useState, useEffect } from "react";

const aptosConfig = new AptosConfig({ network: Network.TESTNET }); 
const aptos = new Aptos(aptosConfig);

export default function Home() {
  const {connected, account} = useWallet()
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const fetchBalance = async () => {
      if (connected && account?.address) {
        try {
          const rawBalance = await aptos.getAccountAPTAmount({
            accountAddress: account.address.toString(),
          });

          const aptBalance = Number(rawBalance) / 1e8;
          setBalance(aptBalance);
        } catch (err) {
          console.error("Failed to fetch balance", err);
          setBalance(0);
        }
      } else {
        setBalance(0);
      }
    };

    fetchBalance();
  }, [account, connected]);
  

  return (
    <>
      {connected ? (
        <TrxPage balance={balance}/>   
      ) : (
        <MainPage /> 
      )}
    </>
  );
}
