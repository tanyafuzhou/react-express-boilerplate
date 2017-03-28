import React from 'react'

export default function Layout ({ children }) {
  return (
    <div>
      <ul>
        <li><a href="#/">home</a></li>
        <li><a href="#/counter">counter</a></li>
      </ul>
      {children}
    </div>
  )
}
