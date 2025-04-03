"use client"

import React from 'react'
import Bad from '@/app/(pages)/components/alert/bad'

interface Props {
    message: string
}

const Alert = ({ message } : Props) => {
  return (
    <div className='bg-red-200 text-red-700 border-[1px] border-red-900 p-2 rounded-md flex gap-5 max-w-[300px] text-nowrap my-4 absolute -translate-x-[50%] left-1/2'>
        <Bad />
        <p>{ message }</p>
    </div>
  )
}

export default Alert