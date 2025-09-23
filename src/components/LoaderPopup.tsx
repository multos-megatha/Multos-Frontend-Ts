"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type LoaderPopupProps = {
  onClose: () => void;
  message?: string;
};

const LoaderPopup: React.FC<LoaderPopupProps> = ({ onClose, message }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="absolute inset-0" 
          onClick={onClose}
        />
        
        <motion.div 
          className="relative bg-gradient-to-br bg-white rounded-2xl p-8 shadow-2xl border border-slate-700/50 max-w-xs w-full mx-4"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: 0.4 
          }}
        >
          {/* Close Button */}
          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors duration-200 p-1 hover:bg-slate-700/50 rounded-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={20} />
          </motion.button>

          {/* Content Container */}
          <div className="flex flex-col items-center space-y-6">
            {/* GIF Loader with modern styling and animations */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 15,
                delay: 0.2 
              }}
            >
              <motion.img
                src="./multosloading.gif"
                alt="Loading..."
                className="w-24 h-24 object-contain drop-shadow-lg"
                animate={{ 
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Pulsing glow effect */}
              <motion.div 
                className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400/20 to-rose-500/20 blur-xl -z-10"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Message with stagger animation */}
            <motion.div 
              className="text-center space-y-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <motion.p 
                className="text-black font-medium text-lg"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {message || "Processing..."}
              </motion.p>
              
              {/* Animated bouncing dots */}
              <div className="flex justify-center space-x-1">
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    className="w-2 h-2 bg-red-400 rounded-full"
                    animate={{ 
                      y: [0, -8, 0],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: index * 0.1,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Animated progress bar */}
            {/* <motion.div 
              className="w-full bg-slate-700 rounded-full h-1 overflow-hidden"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <motion.div 
                className="h-full bg-gradient-to-r from-red-400 to-red-500 rounded-full"
                animate={{ 
                  x: ['-100%', '100%'],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div> */}
          </div>

          {/* Subtle animated background pattern */}
          <motion.div 
            className="absolute inset-0 opacity-5 pointer-events-none rounded-2xl"
            animate={{ 
              background: [
                'radial-gradient(circle at 20% 20%, rgba(34, 211, 238, 0.1) 0%, transparent 70%)',
                'radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
                'radial-gradient(circle at 20% 20%, rgba(34, 211, 238, 0.1) 0%, transparent 70%)'
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoaderPopup