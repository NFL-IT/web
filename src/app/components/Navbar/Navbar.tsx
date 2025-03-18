import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <header>
        <nav className='flex py-3 bg-[#1f32ff] px-3'>
            <div className='md:block hidden'>
                <Image className='rounded-full border-[1px] shadow-[8px_8px_20px_4px_rgba(0,0,0,0.8)] border-[#36abff]' src={'/image.png'} alt='logo' width={50} height={50} />
            </div>
            <ul className='text-[#f1f1f1] flex justify-center gap-10 text-lg items-center text-center mx-auto'>
                <li className='hover:underline'>
                    <a href="/accounts">Accounts</a>
                </li>
                <li className='hover:underline'>
                    <a href="/ports">Ports</a>
                </li>
                <li className='hover:underline'>
                    <a href="/devices">Devices</a>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default Navbar