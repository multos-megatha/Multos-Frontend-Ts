import React from 'react'

import { useWallet } from '@aptos-labs/wallet-adapter-react'
import clsx from 'clsx'

const Footer = () => {
    const {connected} = useWallet()

    return (
        <section 
            className='w-full min-h-3 flex items-center px-4 md:px-2 lg:px-0 justify-center pb-[3rem] pt-[2rem] shadow-xl'
        >
            <div 
                className={clsx('w-full mx-auto bg-white rounded-3xl shadow-md', connected ? 'max-w-[60rem]': 'max-w-[85rem]')}
            >
                <div className="flex flex-row items-center justify-between px-6 py-4">
                    {/* Aptos Logo */}
                    <img 
                        src='/aptos.svg' 
                        alt="" 
                        className='h-9'
                    />
                    
                    {/* Social Icons */}
                    <div 
                        className='flex flex-row items-center space-x-4'
                    >
                        <img 
                            src='/twitter.svg' 
                            alt="" 
                            className='h-10 rounded-full object-cover cursor-pointer'
                        />
                        <img 
                            src='/github.svg'
                            alt="" 
                            className='h-11 cursor-pointer rounded-full'
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer