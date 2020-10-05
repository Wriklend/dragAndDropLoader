import React, { useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'

import { getValidatedFile } from './utils'
import { Img } from '../Img'
import { ErrorText } from '../ErrorText'
import s from './style.module.css'

export const ImageLoader = ({
  className,
  imgSrc,
  setImgSrc,
  fileInfo,
  setFileInfo,
  error,
  setError
}) => {

  const [isDragEnter, setIsDragEnter] = useState(false)

  const reader = new FileReader()

  reader.onloadend = () => {
    setImgSrc(reader.result)
  }

  reader.onloaderror = () => {
    setError(reader.error)
  }

  const handleDrop = useCallback(e => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragEnter(false)

    const validatedFile = getValidatedFile(fileInfo, e.dataTransfer.files)

    if (validatedFile === 'ok') {
      setError('')
      reader.readAsDataURL(e.dataTransfer.files[0])
      setFileInfo(e.dataTransfer.files[0])
    } else {
      setError(validatedFile)
    }
  }, [fileInfo, reader, setError, setFileInfo])

  const dragProps = {
    onDragEnter: () => setIsDragEnter(true),
    onDragLeave: () => setIsDragEnter(false),
    onDragOver: e => e.preventDefault(),
    onDrop: handleDrop
  }

  return <div
    className={`${s.imageLoader} ${className} ${isDragEnter && s.dragEnter}`}
    {...dragProps}
  >
    {imgSrc
      ? <Img imgSrc={imgSrc} fileName={fileInfo.name} />
      : <div className={`${s.dropText} ${isDragEnter && s.dropEnterText}`} >
        {isDragEnter ? 'Drop Me!' :
          'Drop image here'}
      </div>
    }
    {error && <ErrorText error={error} />}
  </div>
}

ImageLoader.propTypes = {
  className: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  setImgSrc: PropTypes.func.isRequired,
  fileInfo: PropTypes.object.isRequired,
  setFileInfo: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  setError: PropTypes.func.isRequired
}

ImageLoader.defaultProps = {
  className: '',
  imgSrc: '',
  setImgSrc: () => { },
  fileInfo: {},
  setFileInfo: () => { },
  error: '',
  setError: () => { }
}
