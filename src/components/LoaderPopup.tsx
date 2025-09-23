"use client";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { X } from "lucide-react";

type LoaderPopupProps = {
  onClose: () => void;
  message?: string; // props tambahan
};

const LoaderPopup: React.FC<LoaderPopupProps> = ({ onClose, message }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative flex flex-col items-center p-8 bg-white/95 rounded-3xl shadow-2xl max-w-xs w-full"
          initial={{ y: 50, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Tombol close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X size={22} />
          </button>

          {/* GIF loader */}
          <motion.img
            src="./multosloading.gif"
            alt="Loading..."
            className="w-28 h-28 object-contain drop-shadow-md"
            initial={{ rotate: -10, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          />

          {/* Teks (pakai props.message) */}
          <motion.p
            className="mt-5 text-gray-800 font-semibold text-lg tracking-wide text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {message || "Please wait..."}
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoaderPopup;
