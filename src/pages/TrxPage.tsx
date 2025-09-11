'use client'

import React from 'react'
import NavbarTrx from '@/sections/NavbarTrx';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import HeroTrx from '@/sections/HeroTrx';

const TrxPage = () => {
    return (
        <div>
          <NavbarTrx/>
          <HeroTrx/>
        </div>
    )
}

export default TrxPage