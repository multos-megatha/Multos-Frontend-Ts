import {TrendingUp, DollarSign } from "lucide-react";
import { ElementType } from "react";


// NAVBAR
export interface Network {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export const networks: Network[] = [
  {
    id: 'aptos',
    name: 'Aptos',
    icon: './aptos.svg',
    color: 'from-blue-400 to-blue-600'
  },
];

// LEFT HERO
export interface KeyFeature {
  icon: ElementType;
  title: string
  description: string
  stats: string
  gradient: string
  iconBg: string
  borderColor: string
}

export const keyFeatures: KeyFeature[] = [
  {
    icon: TrendingUp,
    title: "Token Distribution Doesn’t Have to Be Hard ❗",
    description:
      "DAOs, DeFi protocols, and communities often need to send tokens to hundreds or even thousands of wallets – for airdrops, rewards, salaries, or liquidity incentives.",
    stats: "Simplify Airdrops & Rewards",
    gradient: "from-rose-50 to-red-50",
    iconBg: "from-red-500 to-rose-600",
    borderColor: "border-red-200/50",
  },
  {
    icon: DollarSign,
    title: "One Transaction, Many Recipients 📩",
    description:
      "Multisender lets you distribute tokens to multiple addresses in a single Aptos transaction – making token distribution faster, cheaper, and transparent.",
    stats: "Fewer Transactions, Lower Costs",
    gradient: "from-red-50 to-rose-50",
    iconBg: "from-rose-500 to-pink-600",
    borderColor: "border-rose-200/50",
  },
]


// LEFT HERO WALLET
export interface Wallet {
  id: number
  name: string
  icon: string  
}

export const wallets: Wallet[] = [
        {
            id: 1,
            name: 'Petra',
            icon: './petra.svg',
        },
        {
            id: 2,
            name: 'Bitget Wallet',
            icon: './bidget.svg',
        },
        {
            id: 3,
            name: 'OKX Wallet',
            icon: './okx.svg',
        },
    ];