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
    initial: {
      scale: 1,
      rotateY: 0,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    },
    hover: {
      scale: 1.05,
      rotateY: 5,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95,
      rotateY: -2,
      transition: {
        type: "spring",
        stiffness: 600,
        damping: 15
      }
    }
  };

  const shimmerVariants: Variants = {
    initial: { x: "-100%", opacity: 0 },
    animate: {
      x: "100%",
      opacity: [0, 1, 0],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 3
      }
    }
  };

  const iconVariants: Variants = {
    initial: {
      rotate: 0,
      scale: 1,
    },
    hover: {
      rotate: [0, -10, 10, -5, 0],
      scale: 1.2,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    tap: {
      rotate: 360,
      scale: 0.8,
      transition: {
        duration: 0.6,
        ease: "backOut"
      }
    }
  }

  const arrowVariants: Variants = {
    initial: { x: 0, rotate: 0 },
    hover: {
      x: 8,
      rotate: 45,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15
      }
    }
  };

  const featurePillVariants: Variants = {
    initial: {
      scale: 1,
      rotateX: 0,
      y: 0,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
    },
    hover: {
      scale: 1.08,
      rotateX: 10,
      y: -8,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    },
    tap: {
      scale: 0.95,
      rotateX: -5,
      y: 2,
      transition: {
        type: "spring",
        stiffness: 600,
        damping: 20
      }
    }
  };

  const glowVariants: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    hover: {
      opacity: [0, 0.6, 0],
      scale: [0.8, 1.2, 1.4],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };


  return (
    <motion.div variants={itemVariants}
      className="space-y-6 w-full mx-auto mt-6"
    >
      <motion.a
        href="https://www.figma.com/slides/jTdocux6g6tCtjHgltfaHs/Multos-Presentation?node-id=1-95&t=3HL35NoZXJ6fUceH-0"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full block bg-gradient-to-r from-red-500 to-red-700 text-white font-bold py-4 px-6 rounded-full relative overflow-hidden text-center"
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

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 rounded-2xl blur-xl"
          variants={glowVariants}
          initial="initial"
          whileHover="hover"
        />

        {/* Button Content */}
        <div className="relative flex items-center justify-center space-x-3">
          <motion.div
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <TrendingUp className="w-5 h-5" />
          </motion.div>

          <motion.span
            className="text-sm sm:text-base md:text-lg"
            animate={
              isClicked
                ? {
                  scale: [1, 0.9, 1.1, 1],
                  rotate: [0, -2, 2, 0],
                }
                : {}
            }
            transition={{ duration: 0.5 }}
          >
            View Deck Presentation
          </motion.span>

          <motion.div
            variants={arrowVariants}
            initial="initial"
            whileHover="hover"
          >
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>

        {/* Ripple Effect */}
        <AnimatePresence>
          {isClicked && (
            <motion.div
              className="absolute inset-0 bg-white/10 rounded-2xl"
              initial={{ scale: 0, opacity: 0.5 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
      </motion.a>


      {/* Features */}
      {/* Feature Pills with Staggered Animation */}
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
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Background Gradient on Hover */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${feature.bg} opacity-0 rounded-2xl`}
                animate={{
                  opacity: hoveredFeature === index ? 0.1 : 0,
                  scale: hoveredFeature === index ? 1.1 : 1
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Icon with Advanced Animation */}
              <motion.div
                className={`${feature.color} flex justify-center mb-2 relative z-10`}
                animate={{
                  rotate: hoveredFeature === index ? [0, -15, 15, 0] : 0,
                  scale: hoveredFeature === index ? 1.3 : 1,
                  y: hoveredFeature === index ? -2 : 0
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                  rotate: {
                    repeat: hoveredFeature === index ? Infinity : 0,
                    repeatType: "reverse",
                    duration: 1
                  }
                }}
              >
                {feature.icon}
              </motion.div>

              {/* Label with Bounce */}
              <motion.span
                className="font-bold text-gray-800 text-sm relative z-10"
                animate={{
                  y: hoveredFeature === index ? [0, -3, 0] : 0,
                  color: hoveredFeature === index ? "#1f2937" : "#374151"
                }}
                transition={{
                  duration: 0.4,
                  y: {
                    repeat: hoveredFeature === index ? Infinity : 0,
                    repeatType: "reverse",
                    duration: 0.8
                  }
                }}
              >
                {feature.label}
              </motion.span>

              {/* Particles Effect */}
              <AnimatePresence>
                {hoveredFeature === index && (
                  <motion.div className="absolute inset-0 pointer-events-none">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-gray-400 rounded-full"
                        initial={{
                          opacity: 0,
                          scale: 0,
                          x: Math.random() * 100 - 50,
                          y: Math.random() * 80 - 40
                        }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0],
                          y: -50
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{
                          duration: 1.5,
                          delay: i * 0.1,
                          ease: "easeOut"
                        }}
                        style={{
                          left: `${20 + (i * 15)}%`,
                          top: '50%'
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Third Feature (Full Width) with Special Animation */}
        <motion.div
          className="bg-white border-2 border-gray-100 rounded-2xl p-4 text-center relative overflow-hidden cursor-pointer"
          variants={featurePillVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onHoverStart={() => setHoveredFeature(2)}
          onHoverEnd={() => setHoveredFeature(null)}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Special Background for Third Feature */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-500 opacity-0 rounded-2xl"
            animate={{
              opacity: hoveredFeature === 2 ? 0.15 : 0,
              rotate: hoveredFeature === 2 ? 180 : 0
            }}
            transition={{ duration: 0.6 }}
          />

          {/* Globe Icon with Orbital Animation */}
          <motion.div
            className="text-blue-600 flex justify-center mb-2 relative z-10"
            animate={{
              rotate: hoveredFeature === 2 ? 360 : 0,
              scale: hoveredFeature === 2 ? 1.4 : 1,
            }}
            transition={{
              duration: hoveredFeature === 2 ? 2 : 0.3,
              rotate: {
                repeat: hoveredFeature === 2 ? Infinity : 0,
                ease: "linear",
                duration: 2
              },
              scale: {
                type: "spring",
                stiffness: 300,
                damping: 10
              }
            }}
          >
            <Globe className="w-4 h-4" />
          </motion.div>


          <motion.span
            className="font-bold text-gray-800 text-sm relative z-10"
            animate={{
              scale: hoveredFeature === 2 ? [1, 1.1, 1] : 1,
              color: hoveredFeature === 2 ? "#1e40af" : "#374151"
            }}
            transition={{
              duration: 0.5,
              scale: {
                repeat: hoveredFeature === 2 ? Infinity : 0,
                repeatType: "reverse",
                duration: 1
              }
            }}
          >
            Scalable
          </motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default FeatureSection;
