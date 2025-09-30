'use client'

import React from 'react'
import Image from 'next/image'
import multoslogo from '../../public/multosfinal.svg'
import clsx from 'clsx'
import { useState, useRef, useEffect } from 'react'
import { ChevronDown, ChevronUp, Check } from 'lucide-react'
import { networks, Network } from '@/constants'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedNetwork, setSelectedNetwork] = useState<Network['id']>('aptos')

    const dropdownRef = useRef<HTMLDivElement | null>(null)

    const selectedNetworkData = networks.find((net) => net.id === selectedNetwork)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleSelect = (networkId: string) => {
        setSelectedNetwork(networkId)
        setIsOpen(false)
    }

    return (
        <nav className='w-full fixed px-[1rem] md:px-0 max-w-3xl z-50 py-0 md:py-4 left-1/2 -translate-x-1/2 top-[1rem]'>
            <div className='flex flex-row items-center justify-between bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-md border border-gray-100 min-h-[4.5rem]'>
                <a href="/" className="flex items-center">
                    <Image
                        src={multoslogo}
                        alt="logo"
                        className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-xl"
                    />
                    <span className="flex items-center text-base sm:text-lg md:text-xl font-bold pl-2">
                        Multos
                    </span>
                </a>


                <div className="flex flex-row items-center gap-0 md:gap-1.5 h-full">
                    <div className="relative">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="bg-gray-100 backdrop-blur-sm rounded-3xl px-3 py-2.5 md:py-3 transition-all duration-200 flex items-center justify-between hover:bg-gray-200 min-w-28 sm:min-w-32"
                        >
                            <div className="flex items-center gap-1.5">
                                <div className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 flex items-center justify-center">
                                    {typeof selectedNetworkData?.icon === "string" ? (
                                        <img
                                            src={selectedNetworkData?.icon}
                                            alt={selectedNetworkData?.name}
                                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain"
                                        />
                                    ) : (
                                        selectedNetworkData?.icon
                                    )}
                                </div>
                                <span className="font-normal w-full text-start text-gray-800 text-xs sm:text-sm md:text-base">
                                    {selectedNetworkData?.name}
                                </span>
                            </div>
                            <div className="transition-all duration-500">
                                {isOpen ? (
                                    <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
                                ) : (
                                    <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
                                )}
                            </div>
                        </button>

                        {isOpen && (
                            <div className="absolute top-full right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 min-w-28 sm:min-w-32 animate-in slide-in-from-top-2 duration-500">
                                <div className="p-1 space-y-0.5">
                                    {networks.map((network) => (
                                        <button
                                            key={network.id}
                                            onClick={() => handleSelect(network.id)}
                                            className={clsx(
                                                "w-full rounded-lg px-3 py-2 sm:py-2.5 transition-all duration-150 flex items-center justify-between group text-left",
                                                {
                                                    "bg-gray-200 shadow-sm": selectedNetwork === network.id,
                                                    "hover:bg-gray-25": selectedNetwork !== network.id,
                                                }
                                            )}
                                        >
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0">
                                                    {typeof network.icon === "string" ? (
                                                        <img src={network.icon} alt={network.name} className="w-full h-full object-contain" />
                                                    ) : (
                                                        network.icon
                                                    )}
                                                </div>
                                                <span className="font-medium text-gray-800 text-xs sm:text-sm md:text-base">
                                                    {network.name}
                                                </span>
                                            </div>
                                            {selectedNetwork === network.id && (
                                                <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-black flex-shrink-0" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>



                    <a
                        href="https://aptosfoundation.org/"
                        target='blank'
                        className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 ml-3 sm:ml-4 rounded-xl"
                    >
                        <Image
                            src="/aptos.svg"
                            alt="aptos"
                            width={32}
                            height={32}
                            className="h-7 w-auto sm:h-8"
                        />
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar