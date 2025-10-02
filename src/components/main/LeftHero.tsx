'use client'

import { Loader2, User, X } from 'lucide-react'
import React from 'react'
import { keyFeatures, wallets } from '@/constants'
import { useState } from 'react'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import LoaderPopup from '../LoaderPopup'
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from '@/utils/motion'

const ALL_WALLETS = [
    { name: "Bitget Wallet", icon: "/bitget.svg", installUrl: "https://web3.bitget.com/en/wallet" },
    { name: "OKX Wallet", icon: "/okx.svg", installUrl: "https://www.okx.com/web3" },
    { name: "Petra", icon: "/petra.svg", installUrl: "https://petra.app/" },
    { name: "Nightly", icon: "/nightly.png", installUrl: "https://nightly.app/" },
    { name: "Pontem Wallet", icon: "/pontem.svg", installUrl: "https://pontem.network/" },
    { name: "Backpack", icon: "/backpack.png", installUrl: "https://backpack.app/" },
    { name: "Continue with Apple", icon: "/apple.svg", installUrl: "" },
];


const LeftHero = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { connect, disconnect, connected, account, wallets } = useWallet();
    const [loading, setLoading] = useState(false);




    return (
        <div className='col-span-12 lg:col-span-8 p-4 md:px-8'>
            <motion.div className='flex flex-col items-center text-center'
                variants={containerVariants}
                initial="hidden"
                animate="visible">

                <motion.div variants={itemVariants} className='flex justify-center items-center'>
                    <div className='flex flex-col md:flex-row items-center justify-center lg:justify-center space-y-2 lg:space-y-0 lg:space-x-3'>
                        <img src='./multosfinal.svg' alt="" className='h-16 sm:h-20 md:h-24 rounded-xl' />

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
                </motion.div>


                <motion.div variants={itemVariants} className='space-y-6 text-center mt-4 md:mt-10'>
                    <div className='space-y-4'>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-gray-900">
                            Send to Thousands,
                            <br />
                            <span className="bg-gradient-to-r from-rose-500 via-red-700 to-rose-900 bg-clip-text text-transparent">
                                In One Transaction
                            </span>

                        </h2>

                        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                            The fastest, most secure, and cost-efficient way to distribute tokens on the Aptos blockchain.
                        </p>

                    </div>
                </motion.div>



                <motion.div variants={itemVariants} className='flex flex-col items-center justify-center mt-6 md:mt-9 gap-3 w-full md:mb-9'>
                    {(wallets || []).filter((wallet) => wallet.name === "Continue with Google").map((wallet) => (
                        <button
                            key={wallet.name}
                            onClick={async () => {
                                setLoading(true);
                                try {
                                    await connect(wallet.name);
                                } finally {
                                    setLoading(false);
                                    setIsOpen(false);
                                }
                            }}
                            className="w-full lg:max-w-[450px] group relative overflow-hidden bg-gradient-to-r from-red-500 to-red-700 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            <div className="relative flex items-center justify-center space-x-3">
                                <User className="w-5 h-5" />

                                <span>Continue with Google</span>
                            </div>
                        </button>
                    ))}


                    <button onClick={() => setIsOpen(true)} className='w-full lg:max-w-[450px] group bg-white border-2 border-gray-200 text-gray-800 font-bold py-4 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-red-300 hover:bg-gray-50'>
                        <div className="flex items-center justify-center space-x-3">
                            <div className="w-5 h-5 bg-gradient-to-r from-red-500 to-red-500 rounded"></div>
                            <span>Connect Wallet</span>
                        </div>
                    </button>

                </motion.div>

                {/* Hero Items */}
                <motion.div variants={itemVariants} className='space-y-6 w-full mt-10 md:mt-4'>
                    {keyFeatures.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <div
                                key={index}
                                className={`relative bg-gradient-to-br ${feature.gradient} border ${feature.borderColor} rounded-[2rem] p-6 sm:p-8 shadow-md hover:shadow-lg shadow-pink-100/50 transition-all duration-500 hover:scale-[1.02] group cursor-pointer overflow-hidden`}
                            >
                                <div className="absolute top-0 right-0 w-full h-32 opacity-5">
                                    <div className="grid grid-cols-8 gap-1">
                                        {[...Array(64)].map((_, i) => (
                                            <div key={i} className="w-1 h-1 bg-pink-400 rounded-full"></div>
                                        ))}
                                    </div>
                                </div>

                                <div className="relative z-10 flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                                    <div
                                        className={`w-14 h-14 bg-gradient-to-br ${feature.iconBg} rounded-2xl flex items-center justify-center text-white shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300 hidden md:flex`}
                                    >
                                        <Icon className="w-7 h-7" />
                                    </div>

                                    {/* CONTENT */}
                                    <div className="flex-1 space-y-2 text-center md:text-left">
                                        {/* Title + Stats */}
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
                                            <h3 className="text-base sm:text-lg md:text-[1.1rem] font-semibold text-gray-800  transition-colors duration-300 leading-snug">
                                                {feature.title}
                                            </h3>
                                            <div className="px-2.5 py-0.5 mx-auto md:mx-0 bg-white/80 backdrop-blur-sm rounded-full border border-pink-100 shadow-sm w-fit">
                                                <span className="text-[0.7rem] sm:text-xs font-medium text-gray-700">
                                                    {feature.stats}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-gray-600 leading-relaxed text-xs sm:text-sm md:text-[0.9rem]">
                                            {feature.description}
                                        </p>
                                    </div>

                                </div>
                            </div>
                        )
                    })}
                </motion.div>
            </motion.div>

            {/* Popup Modal */}
            {isOpen && !loading && (
                <motion.div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setIsOpen(false)}
                >
                    <motion.div
                        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-red-50"
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header with gradient accent */}
                        <div className="relative border-b border-gray-100 px-6 pt-6 pb-4 bg-gradient-to-br from-white to-red-50/30">
                            <div className="flex items-center justify-between mb-3">
                                <motion.h2
                                    className="text-2xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    Connect Wallet
                                </motion.h2>
                                <motion.button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-red-50 rounded-full transition-colors text-gray-500 hover:text-red-600"
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    initial={{ opacity: 0, rotate: -90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <X className="w-5 h-5" />
                                </motion.button>
                            </div>

                            <motion.div
                                className="flex items-center gap-2"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}
                            >
                                <div className="w-1.5 h-1.5 bg-gradient-to-r from-red-500 to-rose-500 rounded-full"></div>
                                <h3 className="text-sm font-semibold text-gray-600 tracking-wide uppercase">
                                    Popular Wallets
                                </h3>
                            </motion.div>

                            {/* Decorative gradient line */}
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-300 to-transparent opacity-50"></div>
                        </div>

                        {/* Wallets Grid */}
                        <div className="p-5 max-h-[380px] overflow-y-auto">
                            <div className="space-y-3">
                                {ALL_WALLETS.map((wallet, index) => {
                                    const isInstalled = wallets.some((w) => w.name === wallet.name);

                                    return (
                                        <motion.div
                                            key={wallet.name}
                                            className="group relative"
                                            initial={{ opacity: 0, x: -30 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                delay: index * 0.08,
                                                duration: 0.4,
                                                ease: "easeOut"
                                            }}
                                        >
                                            <div className="relative w-full flex items-center justify-between px-5 py-4 rounded-2xl border-2 border-gray-200 bg-white hover:border-red-300 hover:bg-gradient-to-r hover:from-red-50/50 hover:to-rose-50/30 transition-all duration-300 shadow-sm hover:shadow-md">
                                                {/* Hover accent line */}
                                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-rose-500 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                                {/* Left: Icon + Name */}
                                                <div className="flex items-center gap-4">
                                                    <motion.div
                                                        className="relative"
                                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                                    >
                                                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center border border-gray-200 group-hover:border-red-200 transition-colors">
                                                            <img
                                                                src={wallet.icon}
                                                                alt={wallet.name}
                                                                className="w-7 h-7 object-contain"
                                                            />
                                                        </div>

                                                        {/* Installed badge */}
                                                        {isInstalled && (
                                                            <motion.div
                                                                className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full border-2 border-white"
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                transition={{ delay: index * 0.08 + 0.3, type: "spring", stiffness: 500 }}
                                                            />
                                                        )}
                                                    </motion.div>

                                                    <div>
                                                        <span className="font-semibold text-gray-800 text-base">
                                                            {wallet.name}
                                                        </span>
                                                        {isInstalled && (
                                                            <motion.p
                                                                className="text-xs text-green-600 font-medium"
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                transition={{ delay: index * 0.08 + 0.2 }}
                                                            >
                                                                Installed
                                                            </motion.p>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Right: Action Button */}
                                                {isInstalled ? (
                                                    <motion.button
                                                        onClick={async () => {
                                                            setLoading(true);
                                                            try {
                                                                await connect(wallet.name);
                                                            } finally {
                                                                setLoading(false);
                                                                setIsOpen(false);
                                                            }
                                                        }}
                                                        className="flex items-center gap-1.5 text-sm px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        Connect
                                                    </motion.button>
                                                ) : wallet.installUrl ? (
                                                    <motion.a
                                                        href={wallet.installUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-1.5 text-sm px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-all duration-200 border border-gray-300"
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        Install
                                                    </motion.a>
                                                ) : null}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Footer */}
                        <motion.div
                            className="border-t border-gray-200 px-6 py-5 bg-gradient-to-br from-gray-50 to-red-50/20"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                                    <span className="text-sm text-gray-600">New to Aptos?</span>
                                </div>
                                <motion.a
                                    href="https://aptosfoundation.org/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
                                    whileHover={{ x: 3 }}
                                >
                                    Learn More
                                </motion.a>

                            </div>
                        </motion.div>

                        {/* Decorative corner dots */}
                        <div className="absolute top-4 right-16 w-1.5 h-1.5 bg-red-300 rounded-full opacity-40"></div>
                        <div className="absolute bottom-6 left-6 w-1 h-1 bg-rose-300 rounded-full opacity-30"></div>
                    </motion.div>
                </motion.div>
            )}


            {loading && <LoaderPopup onClose={() => setLoading(false)} message='Connecting Wallet...' />}


        </div>
    )
}

export default LeftHero