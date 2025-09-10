'use client'

import type { Metadata } from "next";
import "./globals.css";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { Network } from '@aptos-labs/ts-sdk'

// export const metadata: Metadata = {
//   title: "Multos",
//   description: "Multi Transaction Token On Aptos",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AptosWalletAdapterProvider
          autoConnect={true}
          dappConfig={{
            network: Network.MAINNET,
            aptosApiKeys: {
              mainnet: process.env.APTOS_API_KEY_MAINNET,
            }
          }}
          onError={(error) => {
            console.log("error", error);
          }}
        >
          {children}
        </AptosWalletAdapterProvider>
      </body>
    </html>
  );
}
