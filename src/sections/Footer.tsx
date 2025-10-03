'use client'

import React from 'react'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { motion, Variants } from 'framer-motion'
import clsx from 'clsx'
import Image from 'next/image'

const Footer = () => {
  const { connected } = useWallet()

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.2 }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  }

  return (
    <motion.section
      className="w-full flex items-center justify-center px-4 md:px-2 lg:px-0 pb-[3rem] pt-[2rem] shadow-xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.div
        className={clsx(
          'w-full mx-auto bg-white rounded-3xl',
          connected ? 'max-w-[60rem]' : 'max-w-[85rem]'
        )}
        variants={itemVariants}
        initial={{ boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
        whileHover={{
          boxShadow:
            '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
          y: -2
        }}
        layout
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-row items-center justify-between px-6 py-4">
          <a href="https://aptosfoundation.org/" target='blank'>
            {/* Logo */}
            <motion.img
              src="/aptos.svg"
              alt="Aptos Logo"
              className="h-9 cursor-pointer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            />
          </a>

          {/* Social Icons */}
          <div className="flex flex-row items-center space-x-4">
            {/* Twitter */}
            <a href="https://x.com/megathatech" target="_blank" rel="noopener noreferrer">
              <motion.div
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer"
              >
                <Image
                  src="/twitter.svg"
                  alt="Twitter"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </motion.div>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/multos-megatha"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.div
                whileHover={{ scale: 1.15, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer"
              >
                <Image
                  src="/github.svg"
                  alt="GitHub"
                  width={44}
                  height={44}
                  className="rounded-full"
                />
              </motion.div>
            </a>
          </div>

        </div>
      </motion.div>
    </motion.section>
  )
}

export default Footer
