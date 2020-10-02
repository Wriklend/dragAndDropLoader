import React, { useState } from "react"

import defaultTheme from './style.module.css'

export const ImageLoader = () => {

  const [isDragEnter, setIsDragEnter] = useState(false)

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragEnter(false)


    console.log(e)
  }


  return <div
    className={`${defaultTheme.imageLoader} ${isDragEnter && defaultTheme.dragOver}`}
    onDragEnter={() => setIsDragEnter(true)}
    onDragLeave={() => setIsDragEnter(false)}

    onDragOver={e => {e.preventDefault()}}
    onDrop={handleDrop}
  >

    {/* <input type='file' /> */}
  </div>
}