import React from 'react'

const SampleModal = ({ children }: { children: React.ReactNode }) => {
    return (
        // Center div
        <div className='w-full h-full fixed top-0 left-0 bg-black bg-opacity-50 z-50'>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg z-50 text-black'>
                {children}
            </div>
        </div>
    )
}

export default SampleModal