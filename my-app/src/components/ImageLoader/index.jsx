import React, { useEffect, useState } from "react"

import s from './style.module.css'

const getValidatedFile = (prevFile = {}, files = {}) => {
  if (files.length > 1) return 'Choose only 1 image'
  const file = files[0]

  if (!file || !/image/.test(file.type)) return 'Drop images only'

  if (prevFile.size === file.size && prevFile.name === file.name) return 'Image already loaded'

  return 'ok'
}

export const ImageLoader = ({ 
  className, 
  setFileInfo, 
  imgSrc,
  setImgSrc,
  fileInfo }) => {
  const [isDragEnter, setIsDragEnter] = useState(false)

  

  const [error, setError] = useState({error: ''})

  // const delayError = setTimeout(() => setError({error: ''}), 7000)

  // useEffect(() => {
  //   delayError()
  //   console.log(error)
  // }, [delayError, error])

  const reader = new FileReader()

  reader.onloadend = () => {
    setImgSrc(reader.result)
  }

  const handleDrop = e => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragEnter(false)
    const validatedFile = getValidatedFile(fileInfo, e.dataTransfer.files)

    if (validatedFile === 'ok') {
      reader.readAsDataURL(e.dataTransfer.files[0])
      setFileInfo(e.dataTransfer.files[0])
    } else {
      setError({error: validatedFile})
    }
  }

  const dragProps = {
    onDragEnter: () => setIsDragEnter(true),
    onDragLeave: () => setIsDragEnter(false),
    onDragOver: e => e.preventDefault(),
    onDrop: handleDrop
  }

  const renderImg = () => {
    return <>
      <div
        style={{ backgroundImage: `url(${imgSrc})` }}
        className={s.img} alt="" ></div>
      {error.error
        ? <div
          className={`${s.errorText} ${error.error && s.triggerError}`} >
          {error.error}
        </div>
        : <div>{fileInfo.name}</div>}
    </>
  }

  return <>
    <div
      className={`${s.imageLoader} ${className} ${isDragEnter && s.dragEnter}`}
      {...dragProps}
    >
      {imgSrc
        ? renderImg()
        : <div className={`${s.text} ${isDragEnter && s.dropEnterText}`} >
          {isDragEnter ? 'Drop Me!' :
            'Drop image here'}
        </div>
      }
    </div>
  </>
}
