import React, { useEffect, useState } from "react"

import s from './style.module.css'

const getValidatedFile = (prevFile = {}, files = {}) => {
  if (files.length > 1) return 'choose only 1 image'
  const file = files[0]

  if (!file || !/image/.test(file.type)) return 'drop images only'

  if (prevFile.size === file.size && prevFile.name === file.name) return 'image already loaded'

  return 'ok'
}

export const ImageLoader = ({ className }) => {
  const [isDragEnter, setIsDragEnter] = useState(false)

  const [imgSrc, setImgSrc] = useState('')

  const [fileInfo, setFileInfo] = useState({})

  const [error, setError] = useState('')

  useEffect(() => {
    // setTimeout(() => setError(''), 500)
    console.log(error)
  }, [error])

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
      setError(validatedFile)
    }
  }

  const handleDragOver = e => {
    e.preventDefault()
    setIsDragEnter(true)
  }

  const dragProps = {
    onDragEnter: () => setIsDragEnter(true),
    onDragLeave: () => setIsDragEnter(false),
    // onDragOver: handleDragOver,
    onDragOver: e => e.preventDefault(),
    onDrop: handleDrop
  }

  return <>
    <div
      className={`${s.imageLoader} ${className} ${isDragEnter && s.dragEnter}`}
      {...dragProps}
    >
      {imgSrc
        ? <div
          style={{ backgroundImage: `url(${imgSrc})` }}
          className={s.img} alt="" ></div>
        : <div className={`${s.text} ${isDragEnter && s.dropEnterText}`} >
          {isDragEnter ? 'Drop me!' :
          'Drop image here'}
          </div>
      }
      {/* <div
        className={`${s.errorText} ${error && s.triggerError}`}  >
        {'Вот ошиюкаэ'}
      </div> */}
    </div>
  </>
}