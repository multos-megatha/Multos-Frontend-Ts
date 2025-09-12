import React, { useState } from 'react'
import Method1 from './Method1'
import Method2 from './Method2'

interface Method1Props {
    balance: number; 
}

const HeroTrxComp: React.FC<Method1Props> = ({ balance }) => {
    const [batchOpen, setBatchOpen] = useState(true)

    return (
        <div>
            {/* Header */}
            <div className="flex justify-center items-center text-center">
                <div className="flex flex-col md:flex-row items-center justify-center lg:justify-start space-y-2 lg:space-y-0 lg:space-x-2">
                    <img src='./multoslogo.png' alt="logo" className='h-16 sm:h-20 md:h-24 rounded-xl' />
                    <div className="flex flex-col justify-start text-center lg:text-left">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900">
                            Multos
                        </h1>
                        <div className="flex items-center justify-center mt-1 lg:justify-start space-x-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            <span className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">
                                Multi Transaction Token On Aptos
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subtext */}
            <div className="px-8 py-6 space-y-4">
                <p className="text-sm sm:text-base md:text-lg text-center text-gray-600 max-w-2xl mx-auto">
                    verb distribute aptos or tokens to multiple addresses
                </p>
            </div>

            {/* Toggle Button */}
            <div className="relative z-4 mx-auto flex w-[375px] rounded-3xl border-[3px] border-gray-300 bg-white/50 p-2 backdrop-blur-[6px]">
                <button
                    onClick={() => setBatchOpen(true)}
                    className={`flex-1 py-2 rounded-2xl font-bold transition ${batchOpen ? "bg-blue-500 text-white" : "text-gray-600"
                        }`}
                >
                    Manual
                </button>
                <button
                    onClick={() => setBatchOpen(false)}
                    className={`flex-1 py-2 rounded-2xl font-bold transition ${!batchOpen ? "bg-blue-500 text-white" : "text-gray-600"
                        }`}
                >
                    Batch
                </button>
            </div>

            {/* Conditional Rendering */}
            <div className="mt-6">
                {batchOpen ? <Method1 balance={balance}/> : <Method2 balance={balance}/>}
            </div>
        </div>
    )
}

export default HeroTrxComp
