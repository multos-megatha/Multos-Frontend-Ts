import React, { useState } from 'react'
import Method1 from './Method1'
import Method2 from './Method2'
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from '@/utils/motion'
import clsx from 'clsx';

interface BalanceProps {
    balance: number;
}

const HeroTrxComp: React.FC<BalanceProps> = ({ balance }) => {
    const [batchOpen, setBatchOpen] = useState(true)
    const [isCustom, setIsCustom] = useState(false)

    return (
        <motion.div className="relative min-h-screen overflow-hidden p-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible">
            {/* Header */}
            <div className='flex justify-center items-center'>
                <motion.div variants={itemVariants} className='flex flex-col md:flex-row items-center justify-center lg:justify-center space-y-2 lg:space-y-0 lg:space-x-3'>
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
                </motion.div>
            </div>

            {/* Subtext */}
            <motion.div variants={itemVariants} className='space-y-6 text-center mt-4 md:mt-10'>
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
            </motion.div>


            {/* Toggle Button */}
            <div className="flex justify-center mt-10 px-4">
                <motion.div variants={itemVariants} className="relative w-full max-w-md">
                    {/* Glow effect belakang */}


                    {/* Button container */}
                    <div className="relative flex sm:flex-row rounded-full border-2 border-red-500/50 bg-white/40 backdrop-blur-lg py-1.5 px-2.5 shadow-xl overflow-hidden">
                        {/* Sliding highlight */}
                        <div
                            className={clsx(
                                "absolute top-1.5 left-1.5 h-[calc(100%-12px)] w-[calc(50%-8px)] rounded-full bg-gradient-to-r from-rose-500 via-red-700 to-rose-900 shadow-lg transition-transform duration-500",
                                batchOpen ? "translate-x-0" : "translate-x-full"
                            )}
                        />

                        {/* Manual Button */}
                        <button
                            onClick={() => setBatchOpen(true)}
                            className={clsx(
                                "relative z-10 flex-1 py-3 px-6 rounded-full font-bold transition-colors duration-300",
                                batchOpen
                                    ? "text-white"
                                    : "text-gray-600 hover:text-gray-800"
                            )}
                        >
                            Batch
                        </button>

                        {/* Batch Button */}
                        <button
                            onClick={() => setBatchOpen(false)}
                            className={clsx(
                                "relative z-10 flex-1 py-3 px-6 rounded-full font-bold transition-colors duration-300",
                                !batchOpen
                                    ? "text-white"
                                    : "text-gray-600 hover:text-gray-800"
                            )}
                        >
                            Manual
                        </button>
                    </div>
                </motion.div>
            </div>


            <div className="flex justify-center mt-10">
                <motion.div variants={itemVariants} className="relative flex gap-8 text-lg font-bold text-gray-600">
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
                </motion.div>
            </div>






            {/* Conditional Rendering */}
            <motion.div variants={itemVariants} className="mt-10">
                {batchOpen ? <Method2 balance={balance} isCustom={isCustom} /> : <Method1 balance={balance} isCustom={isCustom} />}
            </motion.div>

        </motion.div>
    )
}

export default HeroTrxComp
