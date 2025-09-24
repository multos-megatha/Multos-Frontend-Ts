MULTOS
An Aptos-based application that mirrors the functionality of a token dispersal service, similar to the Disperse app on the Ethereum blockchain. This project provides a simple and efficient way to send a single token to multiple addresses in one transaction on the Aptos network.

Tech Stack
This project is built using the following technologies:

Framework: Next.js with TypeScript (next@15.5.2, react@19.1.0, react-dom@19.1.0)

Aptos SDKs: The official Aptos TypeScript SDK (@aptos-labs/ts-sdk@3.1.3) and the Aptos wallet adapter for React (@aptos-labs/wallet-adapter-react@7.0.4).

Styling: Tailwind CSS (tailwindcss@3.4.0) with autoprefixer@10.4.21 and postcss@8.5.6 for utility-first styling.

UI Components: Utilizes framer-motion@12.23.18 for animations and lucide-react@0.543.0 for icons.

Features
Disperse APT & Custom Tokens: Send native APT or any other custom token on the Aptos network.

Batch & Manual Dispersal: Choose between a manual, one-by-one input or a more efficient batch entry system.

Connect Aptos Wallet: Seamlessly connect your wallet to manage and disperse your assets.

Installation
Follow these steps to get the project up and running on your local machine.

Clone the repository

git clone [your-repository-url]
cd MULTOS



Install dependencies

npm install



Run the development server

npm run dev



The application will be available at http://localhost:3000.

Usage
Connect Wallet: On the homepage, click the "Connect Wallet" button and select your preferred Aptos wallet.

Input Details: Enter the token address, a list of recipient addresses, and the amount to be sent to each address.

Disperse Tokens: Click the "Disperse" button to initiate the transaction through your connected wallet. Review and confirm the transaction to disperse the tokens.