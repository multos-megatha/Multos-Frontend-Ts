import React from 'react'
import VideoCard from './VideoCard'
import FeatureSection from './FeatureSection'
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from '@/utils/motion'

const RightHero = () => {
    return (
        <div className='col-span-12 lg:col-span-4'>
            <motion.div className='bg-gray-50 p-4 rounded-3xl border border-gray-100'
                variants={containerVariants}
                initial="hidden"
                animate="visible">
                <div className='flex flex-col'>

                    {/* Header */}
                    <motion.div variants={itemVariants} className='text-center'>
                        <h2 className='text-xl font-bold text-gray-900 mb-5'>Discover More</h2>
                    </motion.div>

                    {/* Video Card */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4'>
                        <motion.div variants={itemVariants}>
                            <VideoCard
                                title="Multos Go Go!"
                                href="https://www.youtube.com/watch?v=ukKH3LieLEM"

                                subtitle="See what's Multos all about"
                                thumbnail={
                                    <img
                                        src="./thumbnail.png"
                                        className="w-full h-full object-cover"
                                        alt=""
                                    />
                                }
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <VideoCard
                                title="Multos Go Go!"
                                subtitle="See what's Multos all about"
                                href="https://www.youtube.com/watch?v=ukKH3LieLEM"
                                thumbnail={
                                    <img
                                        src="./thumbnail.png"
                                        className="w-full h-full object-cover"
                                        alt=""
                                    />
                                }
                            />
                        </motion.div>
                    </div>

                    <FeatureSection />
                </div>
            </motion.div>
        </div>
    )
}

export default RightHero