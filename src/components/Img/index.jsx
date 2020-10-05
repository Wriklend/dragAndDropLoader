import React from 'react'
import PropTypes from 'prop-types'

import s from './style.module.css'

export const Img = ({ imgSrc, fileName }) => <>
    <div
      style={{ backgroundImage: `url(${imgSrc})` }}
      className={s.img} alt="" ></div>
    <div>{fileName}</div>'
  </>

Img.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
}

Img.defaultProps = {
  imgSrc: '',
  fileName: '',
}