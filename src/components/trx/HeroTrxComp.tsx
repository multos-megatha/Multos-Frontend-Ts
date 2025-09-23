import React, { useState } from 'react'
import Method1 from './Method1'
import Method2 from './Method2'

interface BalanceProps {
    balance: number;
}

const HeroTrxComp: React.FC<BalanceProps> = ({ balance }) => {
    const [batchOpen, setBatchOpen] = useState(true)
    const [isCustom, setIsCustom] = useState(false)

    return (
        <div className="relative min-h-screen overflow-hidden p-4">


            {/* Header */}
            <div className='flex justify-center items-center'>
                <div className='flex flex-col md:flex-row items-center justify-center lg:justify-center space-y-2 lg:space-y-0 lg:space-x-3'>
                    <img src='./multosfinal.svg' alt="logo" className='h-16 sm:h-20 md:h-24 rounded-xl' />

                    <div className='flex flex-col justify-start text-center lg:text-left'>
                        <h1 className='text-2xl sm:text-3xl md:text-4xl font-black text-gray-900'>Multos</h1>
                        <div className='flex items-center justify-center mt-1 lg:justify-start space-x-2'>
                            <div className='w-2 h-2 bg-red-500 rounded-full animate-pulse'></div>
                            <span className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">
                                Multi Transaction Token On Aptos
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subtext */}
            <div>
                <div className='space-y-6 text-center mt-4 md:mt-10'>
                    <div className='space-y-5 md:space-y-11'>
                        <div className="flex justify-center">
                            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border shadow-lg px-10 py-6 w-[320px] hover:scale-105 transition-transform duration-300">
                                <div className="flex items-center justify-center">
                                    <div>
                                        <p className="text-sm text-red-600 font-bold text-center mb-3">Your Balance</p>
                                        <p className="text-3xl font-extrabold text-black text-center">{balance} APT</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>


            {/* Toggle Button */}
            <div className="flex justify-center mt-10 px-4">
                <div className="relative w-full max-w-md">
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-red-300/30 to-rose-300/30 rounded-full blur-lg"></div>

                    {/* Button container */}
                    <div className="relative flex sm:flex-row rounded-full border-2 border-red/50 bg-white/40 backdrop-blur-lg py-1.5 px-2.5 shadow-xl gap-2 sm:gap-0">
                        {/* Manual Button */}
                        <button
                            onClick={() => setBatchOpen(true)}
                            className={`flex-1 py-3 px-6 rounded-full font-bold transition-all duration-300 ${batchOpen
                                ? "bg-gradient-to-r from-rose-500 via-red-700 to-rose-900 text-white shadow-lg scale-105"
                                : "text-gray-600 hover:text-gray-800 hover:bg-white/30"
                                }`}
                        >
                            Manual
                        </button>

                        {/* Batch Button */}
                        <button
                            onClick={() => setBatchOpen(false)}
                            className={`flex-1 py-3 px-6 rounded-full font-bold transition-all duration-300 ${!batchOpen
                                ? "bg-gradient-to-r from-rose-500 via-red-700 to-rose-900 text-white shadow-lg scale-105"
                                : "text-gray-600 hover:text-gray-800 hover:bg-white/30"
                                }`}
                        >
                            Batch
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-10">
                <div className="relative flex gap-8 text-lg font-bold text-gray-600">
                    <button
                        onClick={() => setIsCustom(false)}
                        className={`relative pb-1 transition-all ${!isCustom ? "text-red-600" : "hover:text-gray-900"
                            }`}
                    >
                        APT
                        <span
                            className={`absolute left-0 -bottom-1 h-[2px] bg-red-600 transition-all duration-300 ${!isCustom ? "w-full" : "w-0"
                                }`}
                        />
                    </button>

                    <button
                        onClick={() => setIsCustom(true)}
                        className={`relative pb-1 transition-all ${isCustom ? "text-red-600" : "hover:text-gray-900"
                            }`}
                    >
                        Custom
                        <span
                            className={`absolute left-0 -bottom-1 h-[2px] bg-red-600 transition-all duration-300 ${isCustom ? "w-full" : "w-0"
                                }`}
                        />
                    </button>
                </div>
            </div>






            {/* Conditional Rendering */}
            <div className="mt-10">
                {batchOpen ? <Method1 balance={balance} isCustom={isCustom} /> : <Method2 balance={balance} isCustom={isCustom} />}
            </div>

        </div>
    )
}

export default HeroTrxComp
