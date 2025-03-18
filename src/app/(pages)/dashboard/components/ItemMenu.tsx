import Link from 'next/link'
import React from 'react'

interface Props {
    href: string
    text: string
    icon: React.ReactNode
}

const ItemMenu = ({ href, text, icon } : Props) => {
  return (
    <Link href={href} prefetch={false} className='flex w-full p-2 hover:bg-cyan-800 rounded-lg items-center gap-2'>{icon}{text}</Link>
  )
}

export default ItemMenu