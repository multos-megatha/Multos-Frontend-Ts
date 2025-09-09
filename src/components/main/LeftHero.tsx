'use client'

import { User, X } from 'lucide-react'
import React from 'react'
import { keyFeatures, wallets } from '@/constants'
import { useState } from 'react'

const LeftHero = () => {
    const [isOpen, setIsOpen] = useState(false)


    return (
        <div className='col-span-12 lg:col-span-8 p-4 md:px-8'>
            <div className='flex flex-col items-center text-center'>

                {/* Logo & Title */}
                <div className='flex justify-center items-center'>
                    <div className='flex flex-col md:flex-row items-center justify-center lg:justify-center space-y-2 lg:space-y-0 lg:space-x-3'>
                        <img src='./multoslogo.png' alt="" className='h-16 sm:h-20 md:h-24 rounded-xl' />

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

                {/* Main Heading */}
                <div>
                    <div className='space-y-6 text-center mt-4 md:mt-10'>
                        <div className='space-y-4'>

                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-gray-900">
                                Send to Thousands,
                                <br />
                                <span className="bg-gradient-to-r from-rose-500 via-red-700 to-rose-900 bg-clip-text text-transparent">
                                    In One Transaction
                                </span>

                            </h2>

                            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                The most advanced, secure, and cost-efficient way to distribute tokens on the Aptos blockchain.
                                Built for enterprises and power users.
                            </p>

                        </div>
                    </div>
                </div>


                {/* Button */}
                <div className='flex flex-col items-center justify-center mt-6 md:mt-9 gap-3 w-full md:mb-9'>

                    <button className='w-full lg:max-w-[450px] group relative overflow-hidden bg-gradient-to-r from-red-500 to-red-700 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'>
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative flex items-center justify-center space-x-3">
                            <User className="w-5 h-5" />
                            <span>Continue with Google</span>
                        </div>
                    </button>

                    <button onClick={() => setIsOpen(true)} className='w-full lg:max-w-[450px] group bg-white border-2 border-gray-200 text-gray-800 font-bold py-4 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:border-red-300 hover:bg-gray-50'>
                        <div className="flex items-center justify-center space-x-3">
                            <div className="w-5 h-5 bg-gradient-to-r from-red-500 to-red-500 rounded"></div>
                            <span>Connect Wallet</span>
                        </div>
                    </button>

                </div>

                {/* Hero Items */}
                <div className='space-y-6 w-full mt-10 md:mt-4'>
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
                                            <h3 className="text-base sm:text-lg md:text-[1.1rem] font-semibold text-gray-800 group-hover:text-pink-600 transition-colors duration-300 leading-snug">
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
                </div>
            </div>

            {isOpen && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
                    <div className='bg-white rounded-2xl shadow-2xl w-full max-w-xs max-h-[90vh] overflow-y-auto'>
                        {/* Header */}
                        <div className="border-b border-gray-100 text-start px-6 pt-6 pb-3">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Connect Wallet
                                </h2>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                            <h3 className="text-sm font-medium text-gray-500 mt-2 tracking-wide">
                                Popular
                            </h3>
                        </div>

                        {/* Wallets */}
                        <div className='p-2'>
                            {wallets.map((wallet, index) => (
                                <button key={wallet.id} className="w-full flex items-center px-4 py-2 hover:bg-gray-50 rounded-xl transition-colors group">
                                    <img src={wallet.icon} alt={wallet.name} />
                                    <span className="ml-3 font-medium text-gray-900 group-hover:text-gray-700">
                                        {wallet.name} Wallet
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="mt-8 pt-2 px-5 pb-5 border-t border-gray-100">
                            <p className="text-sm text-gray-500 text-start">
                                New to Aptos?{" "}
                                <button className="text-blue-600 hover:text-blue-700 font-medium">
                                    Learn More Here
                                </button>
                            </p>
                        </div>

                    </div>
                </div>
            )}

        </div>
    )
}

export default LeftHero