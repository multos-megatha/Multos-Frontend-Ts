'use client'
import React from 'react'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import multoslogo from '../../public/multoslogo.png'
import Image from 'next/image'
import clsx from 'clsx'


const NavbarTrx = () => {
    const { connected, disconnect, account } = useWallet()

    const shortenAddress = (address?: string | null): string => {
        if (!address) return "";
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };




    return (
        <nav className="w-full fixed px-[1rem] md:px-0 max-w-3xl z-50 py-0 md:py-4 left-1/2 -translate-x-1/2 top-[1rem]">
            <div className="flex flex-row items-center justify-between bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-md border border-gray-100 min-h-[4.5rem]">

                {/* Logo */}
                <a href="" className="flex items-center">
                    <Image src={multoslogo} alt='logo' className='h-12 w-12 rounded-xl' />
                    <span className="flex items-center text-lg font-bold pl-2">Multos</span>
                </a>

                {/* Wallet Info + Disconnect */}
                {connected && (
                    <div className="flex flex-row items-center gap-2">
                        {/* Show Wallet Address */}
                        <button
                            className={clsx(
                                'bg-gray-100 backdrop-blur-sm rounded-3xl px-4 py-2 transition-all duration-200',
                                'flex items-center justify-center hover:bg-gray-200 text-gray-800 text-sm font-medium'
                            )}
                        >
                            {shortenAddress(account?.address?.toString())}
                        </button>

                        {/* Disconnect Button */}
                        <button
                            onClick={disconnect}
                            className={clsx(
                                'bg-red-100 text-red-600 rounded-3xl px-4 py-2 transition-all duration-200',
                                'flex items-center justify-center hover:bg-red-200 text-sm font-medium'
                            )}
                        >
                            Disconnect
                        </button>
                    </div>
                )}


            </div>
        </nav>
    )
}

export default NavbarTrx