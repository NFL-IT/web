import React from 'react'

const Label = ({ target, text } : { target: string, text: string }) => {
  return (
    <label htmlFor={ target }>{ text }</label>
  )
}

export default Label