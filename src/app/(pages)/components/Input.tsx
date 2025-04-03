"use client"

import React from 'react'

interface Props {
    type: "email" | "password" | "text",
    placeholder: string
    args?: any
}

const Input = ({ type, placeholder, ...args } : Props) => {
  return (
    <input className='px-2 py-1 rounded-md text-black' type={type} placeholder={placeholder} {...args}  />
  )
}

export default Input