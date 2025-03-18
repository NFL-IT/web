import React from 'react'

const Topbar = ({ title } : { title: string }) => {
  return (
    <div className='text-center text-xl bg-[#1f32ff] py-2'>{ title }</div>
  )
}

export default Topbar