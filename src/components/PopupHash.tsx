"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check, ExternalLink, CheckCircle2 } from "lucide-react";

type PopupHashProps = {
    transactionHash: string;
    onClose: () => void;
};

const PopupHash: React.FC<PopupHashProps> = ({ transactionHash, onClose }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(transactionHash);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const truncateHash = (hash: string) => {
        return `${hash.slice(0, 8)}...${hash.slice(-8)}`;
    };

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
                    className="relative bg-white rounded-3xl p-8 shadow-2xl border border-green-100/50 max-w-md w-full mx-4"
                    style={{
                        background: "linear-gradient(145deg, rgba(255,255,255,0.98) 0%, rgba(240,253,244,0.95) 100%)"
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
                        {/* Success Icon */}
                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                                delay: 0.2
                            }}
                        >
                            <motion.div
                                className="w-28 h-28 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-xl"
                                animate={{
                                    rotate: [0, 10, -10, 0]
                                }}
                                transition={{
                                    duration: 0.6,
                                    ease: "easeInOut"
                                }}
                            >
                                <CheckCircle2 size={60} className="text-white" strokeWidth={2.5} />
                            </motion.div>

                            {/* Success particles */}
                            {[...Array(8)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-400 rounded-full"
                                    initial={{
                                        scale: 0,
                                        x: 0,
                                        y: 0,
                                        opacity: 1
                                    }}
                                    animate={{
                                        scale: [0, 1, 0],
                                        x: Math.cos((i * Math.PI * 2) / 8) * 50,
                                        y: Math.sin((i * Math.PI * 2) / 8) * 50,
                                        opacity: [1, 1, 0]
                                    }}
                                    transition={{
                                        duration: 1,
                                        delay: 0.3,
                                        ease: "easeOut"
                                    }}
                                />
                            ))}

                            {/* Pulsing glow */}
                            <motion.div
                                className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/40 to-emerald-500/40 blur-2xl -z-10"
                                animate={{
                                    scale: [1, 1.4, 1],
                                    opacity: [0.5, 0.8, 0.5]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        </motion.div>

                        {/* Success Message */}
                        <motion.div
                            className="text-center space-y-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <motion.h2
                                className="text-2xl font-bold text-gray-800"
                                animate={{
                                    scale: [1, 1.02, 1]
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                Transaction Successful!
                            </motion.h2>
                            <motion.p
                                className="text-gray-600 text-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                Your transaction has been confirmed
                            </motion.p>
                        </motion.div>

                        {/* Transaction Hash Box */}
                        <motion.div
                            className="w-full bg-gray-50 rounded-xl p-4 border border-gray-200 relative"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                        >
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex-1 overflow-hidden">
                                    <p className="text-xs text-gray-500 mb-1">Transaction Hash</p>
                                    <p className="text-sm font-mono text-gray-800 truncate">
                                        {truncateHash(transactionHash)}
                                    </p>
                                </div>

                                {/* Copy Button */}
                                <motion.button
                                    onClick={handleCopy}
                                    className="relative flex-shrink-0 p-2 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-lg hover:from-red-600 hover:to-rose-600 transition-all duration-200 shadow-md"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <AnimatePresence mode="wait">
                                        {copied ? (
                                            <motion.div
                                                key="check"
                                                initial={{ scale: 0, rotate: -180 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                exit={{ scale: 0, rotate: 180 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <Check size={18} />
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="copy"
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <Copy size={18} />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Copied tooltip */}
                                    <AnimatePresence>
                                        {copied && (
                                            <motion.div
                                                className="absolute -top-10 left-0 bg-gray-800 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg"
                                                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                Copied!
                                                <div className="absolute -bottom-1 left-4 w-2 h-2 bg-gray-800 rotate-45"></div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div
                            className="flex flex-col sm:flex-row gap-3 w-full pt-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.5 }}
                        >
                            {/* View on Explorer */}
                            <motion.a
                                href={`https://explorer.aptoslabs.com/txn/${transactionHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300"
                                whileHover={{
                                    scale: 1.02,
                                    boxShadow: "0 20px 25px -5px rgba(34, 197, 94, 0.3)"
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                View on Explorer
                                <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                            </motion.a>

                            {/* Close Button */}
                            <motion.button
                                onClick={onClose}
                                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-red-200 text-red-600 font-semibold text-sm hover:bg-red-50 transition-all duration-300"
                                whileHover={{
                                    scale: 1.02,
                                    borderColor: "rgb(239 68 68)"
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Close
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-3 right-12 w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-60"></div>
                    <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full opacity-40"></div>

                    {/* Confetti effect */}
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-green-400 rounded-sm opacity-60"
                            style={{
                                top: `${20 + i * 15}%`,
                                left: `${10 + i * 20}%`,
                            }}
                            animate={{
                                y: [0, -20, 0],
                                rotate: [0, 180, 360],
                                opacity: [0.6, 1, 0.6]
                            }}
                            transition={{
                                duration: 2 + i * 0.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: i * 0.2
                            }}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default PopupHash;