import React from "react"

import { ImageLoader } from "../../components/ImageLoader";
import s from './style.module.css'

export const ImageLoaderScreen = () => {

  return <div className={s.loaderWrapper}>
    <ImageLoader />
  </div>
}