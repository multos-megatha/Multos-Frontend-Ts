"use client";

import React, { useState, ReactNode } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { TrendingUp, ArrowRight, Zap, Shield, Globe } from "lucide-react";
import { itemVariants } from "@/utils/motion";

// Tipe untuk fitur
interface Feature {
  icon: ReactNode;
  label: string;
  color: string;
  bg: string;
}

const FeatureSection: React.FC = () => {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [isClicked, setIsClicked] = useState(false);

  const features: Feature[] = [
    {
      icon: <Zap className="w-4 h-4" />,
      label: "Efficient",
      color: "text-yellow-600",
      bg: "from-yellow-400 to-orange-500",
    },
    {
      icon: <Shield className="w-4 h-4" />,
      label: "Secure",
      color: "text-green-600",
      bg: "from-green-400 to-emerald-500",
    },
    {
      icon: <Globe className="w-4 h-4" />,
      label: "Scalable",
      color: "text-blue-600",
      bg: "from-blue-400 to-cyan-500",
    },
  ];

  // Variants
  const buttonVariants: Variants = {
    initial: { scale: 1, rotateY: 0 },
    hover: { scale: 1.05, rotateY: 5 },
    tap: { scale: 0.95, rotateY: -2 },
  };

  const shimmerVariants: Variants = {
    initial: { x: "-100%", opacity: 0 },
    animate: {
      x: "100%",
      opacity: [0, 1, 0],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const featurePillVariants: Variants = {
    initial: { scale: 1, y: 0 },
    hover: { scale: 1.08, y: -6 },
    tap: { scale: 0.95, y: 2 },
  };


  return (
    <motion.div
      className="space-y-6 w-full mx-auto mt-6"
    >
      {/* Button */}
      <motion.div variants={itemVariants} className="relative">
        <motion.button
          className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white font-bold py-4 px-6 rounded-full relative overflow-hidden"
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={() => setIsClicked(!isClicked)}
        >
          {/* Shimmer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
          />

          {/* Content */}
          <div className="relative flex items-center justify-center space-x-3">
            <TrendingUp className="w-5 h-5" />
            <span>View Deck Presentation</span>
            <ArrowRight className="w-4 h-4" />
          </div>

          {/* Ripple Effect */}
          <AnimatePresence>
            {isClicked && (
              <motion.div
                className="absolute inset-0 bg-white/10 rounded-full"
                initial={{ scale: 0, opacity: 0.6 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              />
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Features */}
      <motion.div variants={itemVariants} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          {features.slice(0, 2).map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white border-2 border-gray-100 rounded-2xl p-4 text-center relative overflow-hidden cursor-pointer"
              variants={featurePillVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onHoverStart={() => setHoveredFeature(index)}
              onHoverEnd={() => setHoveredFeature(null)}
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${feature.bg} opacity-0 rounded-2xl`}
                animate={{ opacity: hoveredFeature === index ? 0.1 : 0 }}
              />

              <div className={`${feature.color} flex justify-center mb-2 relative z-10`}>
                {feature.icon}
              </div>

              <span className="font-bold text-gray-800 text-sm relative z-10">
                {feature.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Third Feature */}
        <motion.div
          className="bg-white border-2 border-gray-100 rounded-2xl p-4 text-center relative overflow-hidden cursor-pointer"
          variants={featurePillVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onHoverStart={() => setHoveredFeature(2)}
          onHoverEnd={() => setHoveredFeature(null)}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-500 opacity-0 rounded-2xl"
            animate={{ opacity: hoveredFeature === 2 ? 0.1 : 0 }}
          />

          <div className="text-blue-600 flex justify-center mb-2 relative z-10">
            <Globe className="w-4 h-4" />
          </div>

          <span className="font-bold text-gray-800 text-sm relative z-10">
            Scalable
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FeatureSection;
