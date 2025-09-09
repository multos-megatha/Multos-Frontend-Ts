import React from 'react'
import { ArrowRight, TrendingUp, Zap, Shield, Globe } from 'lucide-react'

const FeatureSection = () => {


    const features = [
        { icon: <Zap className="w-4 h-4" />, label: 'Efficient', color: 'text-yellow-600', bg: 'from-yellow-400 to-orange-500' },
        { icon: <Shield className="w-4 h-4" />, label: 'Secure', color: 'text-green-600', bg: 'from-green-400 to-emerald-500' },
        { icon: <Globe className="w-4 h-4" />, label: 'Scalable', color: 'text-blue-600', bg: 'from-blue-400 to-cyan-500' }
    ];

    return (
        <div className='space-y-6 w-full mx-auto mt-6'>
            <div className='relative'>
                <button className='w-full bg-gradient-to-r from-red-500 to-red-700 text-white font-bold py-4 px-6 rounded-full relative overflow-hidden group'>
                    {/* Shimer Effect */}
                    <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent' />

                    {/* Hover Overlay */}
                    <div className='absolute inset-0 bg-gradient-to-r from-red-500 to-red-700' />

                    {/* Glow Effect */}
                    <div className='absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 rounded-2xl blur-xl' />

                    <div className='relative flex items-center justify-center space-x-3'>
                        <div>
                            <TrendingUp className='w-5 h-5' />
                        </div>
                        <span>View Deck Presentation</span>
                        <div>
                            <ArrowRight className='w-4 h-4' />
                        </div>
                    </div>
                </button>
            </div>

            <div className='space-y-3'>
                <div className='grid grid-cols-2 gap-3'>
                    {features.slice(0, 2).map((feature, index) => (
                        <div key={index} className='bg-white border-2 border-gray-100 rounded-2xl p-4 text-center relative overflow-hidden cursor-pointer'>
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.bg} opacity-0 rounded-xl`}/>

                            <div className={`${feature.color} flex justify-center mb-2 relative z-10`}>
                                {feature.icon}
                            </div>

                            <span className='font-bold text-gray-800 text-sm relative z-10'>{feature.label}</span>

                        </div>
                    ))}
                </div>

                <div className='bg-white border-2 border-gray-100 rounded-2xl p-4 text-center relative overflow-hidden cursor-pointer'>
                    <div className='absolute inset-0 bg-gradient-to-br from from-blue-400 to-cyan-500 opacity-0 rounded-2xl'/>

                    <div className='text-blue-600 flex justify-center mb-2 relative z-10'>
                        <Globe className='w-4 h-4'/>
                    </div>

                    <span className='font-bold text-gray-800 text-sm relative z-10'>Scaleable</span>

                </div>
            </div>
        </div>
    )
}

export default FeatureSection