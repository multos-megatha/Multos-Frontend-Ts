'use client'

import React from 'react'
import { useWallet } from '@aptos-labs/wallet-adapter-react'

const TrxPage = () => {
    const { disconnect } = useWallet();
    return (
        <div>
             <button
            onClick={disconnect}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Disconnect
          </button>
        </div>
    )
}

export default TrxPage