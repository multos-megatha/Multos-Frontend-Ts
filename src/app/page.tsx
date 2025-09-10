'use client'

import MainPage from "@/pages/MainPage";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import TrxPage from "@/pages/TrxPage";

export default function Home() {
  const {connected} = useWallet()

  return (
    <>
      {connected ? (
        <TrxPage />   
      ) : (
        <MainPage /> 
      )}
    </>
  );
}
