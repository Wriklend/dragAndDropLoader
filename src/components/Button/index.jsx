import React from "react"

import s from './style.module.css'

export const Button = ({ btnText, onAction = () => {}, className }) => {

  return <button
    className={`${s.button} ${className}`}
    onClick={onAction}>
      {btnText}
  </button>
}
