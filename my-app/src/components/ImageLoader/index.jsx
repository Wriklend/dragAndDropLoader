import React, { useEffect, useState } from "react"

import s from './style.module.css'

const getValidatedFile = (prevFile = {}, files = {}) => {
  if (files.length > 1) return 'choose only 1 image'
  const file = files[0]

  if (!/image/.test(file.type)) return 'drop images only'

  if (prevFile.size === file.size && prevFile.name === file.name) return 'image already loaded'

  return 'ok'
}

export const ImageLoader = () => {
  const [isDragEnter, setIsDragEnter] = useState(false)

  const [imgSrc, setImgSrc] = useState('')

  const [fileInfo, setFileInfo] = useState({})

  const [error, setError] = useState('')

  useEffect(() => {
    setTimeout(() => setError(''), 500)
    console.log(error)
  }, [error])

  const reader = new FileReader()

  reader.onloadend = () => {
    setImgSrc(reader.result)
    console.log(reader, 'asad')
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragEnter(false)
    const validatedFile = getValidatedFile(fileInfo, e.dataTransfer.files)
    if (validatedFile === 'ok') {
      reader.readAsDataURL(e.dataTransfer.files[0])
      setFileInfo(e.dataTransfer.files[0])
    } else {
      setError(validatedFile)
    }
  }

  const handleErrorClick = () => {
    setError(true)
  }

  return <>
    <div
      className={`${s.imageLoader} ${isDragEnter && s.dragEnter}`}
      onDragEnter={() => setIsDragEnter(true)}
      onDragLeave={() => setIsDragEnter(false)}
      onDragOver={e => { e.preventDefault() }}
      onDrop={handleDrop}
    >
      {imgSrc && <div
        style={{ backgroundImage: `url(${imgSrc})` }}
        className={s.img} alt="" />
      }
      <div
        onClick={handleErrorClick}
        className={`${s.errorText} ${error && s.triggerError}`}>
        {error}
      </div>

      {/* <input type='file' /> */}
    </div>
  </>
}