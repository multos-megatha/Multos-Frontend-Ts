import type { Metadata } from "next";
import "./globals.css";
import WalletProvider from "./WalletProvider";

export const metadata: Metadata = {
  title: "Multos",
  description: "Multi Transaction Token On Aptos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  );
}
