'use client'

import React from "react";
import { motion, Variants } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

// Since we can't use Next.js Image and Link in artifact, using regular img and a tags
export default function NotFound() {
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const floatingVariants: Variants = {
    animate: {
      y: [0, -10, 0],
      rotate: [0, 2, -2, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-red-100 to-rose-100 rounded-full opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-br from-rose-100 to-red-100 rounded-full opacity-40"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 30, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Main Content Card */}
      <motion.div
        className="relative bg-white rounded-3xl shadow-2xl border border-gray-100/50 p-8 sm:p-12 flex flex-col items-center space-y-8 max-w-md w-full backdrop-blur-sm"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          background: "linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(254,242,242,0.95) 100%)"
        }}
      >
        {/* Animated GIF with floating effect */}
        <motion.div
          className="relative"
          variants={floatingVariants}
          animate="animate"
        >
          <motion.img
            src="/multoseror.gif"
            alt="404 Error"
            className="w-32 h-32 sm:w-40 sm:h-40 object-contain drop-shadow-xl"
            variants={itemVariants}
          />


          {/* Glowing ring around GIF */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "conic-gradient(from 0deg, transparent, rgba(239, 68, 68, 0.2), transparent)"
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Pulsing shadow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-rose-400/20 rounded-full blur-2xl -z-10"
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

        {/* 404 Large Text */}
        <motion.div
          className="text-center"
          variants={itemVariants}
        >
          <motion.h1
            className="text-6xl sm:text-7xl font-bold bg-gradient-to-r from-red-600 via-rose-600 to-red-600 bg-clip-text text-transparent mb-2"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ backgroundSize: "200% 100%" }}
          >
            404
          </motion.h1>
        </motion.div>

        {/* Title & Message */}
        <motion.div
          className="text-center space-y-3"
          variants={itemVariants}
        >
          <motion.h2
            className="text-2xl sm:text-3xl font-bold text-gray-800"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            Page Not Found
          </motion.h2>
          <motion.p
            className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Oops! The page you're looking for seems to have wandered off into the digital void.
          </motion.p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 pt-4"
          variants={itemVariants}
        >
          {/* Go Home Button */}
          <motion.a
            href="/"
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 25px -5px rgba(239, 68, 68, 0.3), 0 10px 10px -5px rgba(239, 68, 68, 0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Home size={18} className="group-hover:rotate-12 transition-transform duration-300" />
            Go Home
          </motion.a>

          {/* Go Back Button */}
          <motion.button
            onClick={() => window.history.back()}
            className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-red-200 text-red-600 font-semibold text-sm sm:text-base hover:bg-red-50 transition-all duration-300"
            whileHover={{
              scale: 1.05,
              borderColor: "rgb(239 68 68)"
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
            Go Back
          </motion.button>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-red-400 to-rose-400 rounded-full opacity-60"></div>
        <div className="absolute bottom-4 left-4 w-2 h-2 bg-gradient-to-r from-rose-400 to-red-400 rounded-full opacity-40"></div>

        {/* Animated dots pattern */}
        <div className="absolute top-1/2 left-2 flex flex-col space-y-2 opacity-20">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-1 h-1 bg-red-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Bottom decorative text */}
      <motion.p
        className="mt-8 text-gray-400 text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.4 }}
      >
        Error 404 • Page Not Found
      </motion.p>
    </div>
  );
}