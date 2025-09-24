<pre align="center">
███╗   ███╗ ██╗   ██╗ ██╗    ███████████╗  ██████╗  ███████╗
████╗ ████║ ██║   ██║ ██║     ╚══██╔════╝ ██╔═══██╗ ██╔════╝
██╔████╔██║ ██║   ██║ ██║        ██║      ██║   ██║ ███████
██║╚██╔╝██║ ██║   ██║ ██║        ██║      ██║   ██║ ╔══╝███
██║ ╚═╝ ██║ ╚██████╔╝ ███████╗   ██║      ╚██████╔╝ ███████╗
╚═╝     ╚═╝  ╚═════╝  ╚══════╝   ╚═╝       ╚═════╝  ╚══════╝
</pre>

An Aptos-based application that provides a simple and efficient way to send a single token to multiple addresses in one transaction on the Aptos network. 

## 🛠️ Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| **Framework** | Next.js with TypeScript | `next@15.5.2` |
| **React DOM** | React DOM | `react-dom@19.1.0` |
| **Aptos SDK** | Aptos TypeScript SDK | `@aptos-labs/ts-sdk@3.1.3` |
| **Wallet Adapter** | Aptos Wallet Adapter React | `@aptos-labs/wallet-adapter-react@7.0.4` |
| **Styling** | Tailwind CSS | `tailwindcss@3.4.0` |
| **Animations** | Framer Motion | `framer-motion@12.23.18` |
| **Icons** | Lucide React | `lucide-react@0.543.0` |

# ✨ Features

* **💎 Disperse APT & Custom Tokens**: Send native APT or any other custom token on the Aptos network
* **⚡ Batch & Manual Dispersal**: Choose between a manual, one-by-one input or a more efficient batch entry system
* **🔗 Connect Aptos Wallet**: Seamlessly connect your wallet to manage and disperse your assets

## ❌ The Problem We Solve

* **⏰ Inefficiency of manual token transfers**: The current method of sending tokens to multiple people is slow and tedious, requiring a separate transaction for each recipient
* **💸 High transaction fees**: A separate transaction for each recipient means you pay gas fees multiple times, which can add up quickly

### 💡 How MULTOS Solves It

* **🎯 Batch Dispersal**: MULTOS allows you to send tokens to hundreds of addresses in a single, efficient transaction, saving time and effort
* **💰 Cost-Effective**: By bundling multiple transfers into one transaction, you pay significantly less in gas fees

## 📦 Installation

```bash
git clone https://github.com/multos-megatha/Multos-Frontend-Ts.git
cd Multos-Frontend-Ts
npm i
npm run dev
```