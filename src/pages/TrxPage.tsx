'use client'

import React from 'react'
import NavbarTrx from '@/sections/NavbarTrx';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import HeroTrx from '@/sections/HeroTrx';


interface BalanceProps {
    balance: number; 
}

const TrxPage: React.FC<BalanceProps> = ({ balance }) => {
    return (
        <div>
          <NavbarTrx/>
          <HeroTrx balance={balance}/>
        </div>
    )
}

export default TrxPage