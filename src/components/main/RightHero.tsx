import React from 'react'
import VideoCard from './VideoCard'
import FeatureSection from './FeatureSection'

const RightHero = () => {
  return (
    <div className='col-span-12 lg:col-span-4'>
        <div className='bg-gray-50 p-4 rounded-3xl border border-gray-100'>
            <div className='flex flex-col'>

                {/* Header */}
                <div className='text-center'>
                    <h2 className='text-xl font-bold text-gray-900 mb-5'>Discover More</h2>
                </div>

                {/* Video Card */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4'>
                    <div>
                        <VideoCard 
                            title="Multos Go Go!"
                            subtitle="See what's Multos all about"
                            thumbnail={
                                    <img
                                        src="https://i.ytimg.com/vi/HRZ5OnWbLu4/maxresdefault.jpg"
                                        className="w-full h-full object-cover"
                                        alt=""
                                    />
                                }
                        />
                    </div>
                    <div>
                        <VideoCard 
                            title="Multos Go Go!"
                            subtitle="See what's Multos all about"
                            thumbnail={
                                    <img
                                        src="https://i.ytimg.com/vi/HRZ5OnWbLu4/maxresdefault.jpg"
                                        className="w-full h-full object-cover"
                                        alt=""
                                    />
                                }
                        />
                    </div>
                </div>

                <FeatureSection/>
            </div>
        </div>
    </div>
  )
}

export default RightHero