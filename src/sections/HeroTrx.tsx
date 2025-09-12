import HeroTrxComp from '@/components/trx/HeroTrxComp'
import React from 'react'

interface Method1Props {
    balance: number; 
}

const HeroTrx: React.FC<Method1Props> = ({ balance }) => {
  return (
     <section className='w-full min-h-screen flex items-center px-4 md:px-2 lg:px-0 justify-center pt-[8rem] sm:pt-[9rem] '>
        <div className='w-full max-w-[60rem] mx-auto lg:px-[10rem] px-[1rem] py-[2rem] bg-white rounded-3xl shadow-[0_10px_60px_rgba(0,0,0,0.15)]'>

                <HeroTrxComp balance={balance}/>

        </div>  
    </section>
  )
}

export default HeroTrx