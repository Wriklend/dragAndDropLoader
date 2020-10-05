import React from "react"
import PropTypes from 'prop-types'

import s from './style.module.css'

export const Button = ({ btnText, onAction, className, disabled }) => {
  return <button
    className={`${s.button} ${className} ${disabled && s.disabled}`}
    onClick={onAction}>
      {btnText}
  </button>
}

Button.propTypes = {
  btnText: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
}

Button.defaultProps = {
  btnText: '',
  onAction: () => {},
  className: '',
  disabled: false,
}