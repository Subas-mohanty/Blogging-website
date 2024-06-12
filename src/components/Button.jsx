import React from 'react'

function Button({
    children,
    bgColor = 'bg-blue-400',
    textColor = 'text-white',
    type = 'button',
    className = '',
    ...props
}) {
  return (
    <button className={`ps-4 py-2 rounded-lg ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button