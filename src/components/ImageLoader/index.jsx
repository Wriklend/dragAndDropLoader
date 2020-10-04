import React, { useState } from 'react'

import { getValidatedFile } from './utils'
import s from './style.module.css'

export const ImageLoader = ({
  className,
  imgSrc,
  setImgSrc,
  fileInfo,
  setFileInfo,
  error,
  setError }) => {

  const [isDragEnter, setIsDragEnter] = useState(false)

  const reader = new FileReader()

  reader.onloadend = () => {
    setImgSrc(reader.result)
  }

  reader.onloaderror = () => {
    setError(reader.error)
  }

  const handleDrop = e => {
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
  }

  const dragProps = {
    onDragEnter: () => setIsDragEnter(true),
    onDragLeave: () => setIsDragEnter(false),
    onDragOver: e => e.preventDefault(),
    onDrop: handleDrop
  }

  const renderImg = () => <>
    <div
      style={{ backgroundImage: `url(${imgSrc})` }}
      className={s.img} alt="" ></div>
    <div>{fileInfo.name}</div>'
  </>

  const renderError = () => <div
    className={`${s.errorText} ${s.triggerError}`} >
    {error}
  </div>

  return <>
    <div
      className={`${s.imageLoader} ${className} ${isDragEnter && s.dragEnter}`}
      {...dragProps}
    >
      {imgSrc
        ? renderImg()
        : <div className={`${s.dropText} ${isDragEnter && s.dropEnterText}`} >
          {isDragEnter ? 'Drop Me!' :
            'Drop image here'}
        </div>
      }
      {error && renderError()}
    </div>
  </>
}
