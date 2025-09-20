'use client'

import React from 'react'

const LoaderPopup = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-white/95 w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] rounded-3xl shadow-2xl flex flex-col items-center justify-center space-y-4 border-4 border-rose-200 animate-bounce-in">
        
        {/* GIF */}
        <div className="relative">
          <img
            src="./multosloading.gif"
            alt="loading"
            className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-lg animate-wiggle"
          />
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full blur-xl sm:blur-2xl bg-rose-400/40 animate-pulse"></div>
        </div>

        {/* Text */}
        <p className="text-gray-800 font-bold text-sm sm:text-base tracking-wide animate-pulse text-center">
          Connecting Wallet...
        </p>

        {/* Cute dots animation */}
        <div className="flex space-x-1.5 sm:space-x-2">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-rose-500 rounded-full animate-bounce"></span>
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-400 rounded-full animate-bounce [animation-delay:200ms]"></span>
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pink-400 rounded-full animate-bounce [animation-delay:400ms]"></span>
        </div>
      </div>
    </div>
  )
}

export default LoaderPopup
