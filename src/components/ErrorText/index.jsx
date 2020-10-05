import React from 'react'
import PropTypes from 'prop-types'

import s from './style.module.css'

export const ErrorText = ({ error }) => <div
  className={`${s.errorText} ${s.triggerError}`} >
  {error}
</div>

ErrorText.propTypes = {
  error: PropTypes.string.isRequired
}

ErrorText.defaultProps = {
  error: '',
}