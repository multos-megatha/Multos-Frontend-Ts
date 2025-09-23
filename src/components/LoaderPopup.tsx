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
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md w-full h-full"
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
          className="relative bg-white rounded-3xl p-8 shadow-2xl border border-red-100/50 max-w-xs w-full mx-4"
          style={{
            background: "linear-gradient(145deg, rgba(255,255,255,0.98) 0%, rgba(254,242,242,0.95) 100%)"
          }}
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
            className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition-colors duration-200 p-1 hover:bg-red-50 rounded-lg"
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
                className="w-28 h-28 object-contain drop-shadow-xl"
                animate={{ 
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Enhanced pulsing glow effect */}
              <motion.div 
                className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400/30 to-red-500/30 blur-2xl -z-10"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Rotating ring around GIF */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-transparent"
                style={{
                  background: "conic-gradient(from 0deg, transparent, rgba(239, 68, 68, 0.3), transparent)"
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>

            {/* Message with stagger animation */}
            <motion.div 
              className="text-center space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <motion.p 
                className="text-gray-800 font-semibold text-lg"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {message || "Processing..."}
              </motion.p>
              
              {/* Animated bouncing dots */}
              <div className="flex justify-center space-x-1.5">
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    className="w-2.5 h-2.5 bg-gradient-to-r from-red-500 to-red-500 rounded-full shadow-sm"
                    animate={{ 
                      y: [0, -10, 0],
                      opacity: [0.6, 1, 0.6],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: index * 0.15,
                      ease: "easeInOut"
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Enhanced progress bar */}
            <motion.div 
              className="w-full bg-red-100 rounded-full h-1.5 overflow-hidden shadow-inner"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <motion.div 
                className="h-full bg-gradient-to-r from-red-500 via-red-500 to-red-500 rounded-full shadow-sm"
                animate={{ 
                  x: ['-100%', '100%'],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ backgroundSize: "200% 100%" }}
              />
            </motion.div>
          </div>

          {/* Enhanced animated background pattern */}
          <motion.div 
            className="absolute inset-0 opacity-5 pointer-events-none rounded-3xl overflow-hidden"
            animate={{ 
              background: [
                'radial-gradient(circle at 30% 30%, rgba(239, 68, 68, 0.15) 0%, transparent 60%)',
                'radial-gradient(circle at 70% 70%, rgba(244, 63, 94, 0.15) 0%, transparent 60%)',
                'radial-gradient(circle at 30% 30%, rgba(239, 68, 68, 0.15) 0%, transparent 60%)'
              ]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Decorative corner elements */}
          <div className="absolute top-3 left-3 w-2 h-2 bg-gradient-to-r from-red-400 to-red-400 rounded-full opacity-40"></div>
          <div className="absolute bottom-3 right-3 w-1.5 h-1.5 bg-gradient-to-r from-red-400 to-red-400 rounded-full opacity-30"></div>
          
          {/* Side decorative dots */}
          <div className="absolute top-1/2 left-2 transform -translate-y-1/2 flex flex-col space-y-2 opacity-20">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-1 h-1 bg-red-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.2, 0.6, 0.2]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Subtle border glow */}
          <div className="absolute inset-0 rounded-3xl border border-gradient-to-r from-red-200/50 to-red-200/50 pointer-events-none"></div>
        </motion.div>
      </motion.div>
    </AnimatePresence>

  );
};

export default LoaderPopup