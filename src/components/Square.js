import React from 'react'
import './Css/style.css'

export default function Square({id, className, state}) {
  return (
    <div className={`suqare-container ${className} ${state === 'X' ? "x-color" : "o-color"}`} id={id}>
      {state}
    </div>
  )
}
