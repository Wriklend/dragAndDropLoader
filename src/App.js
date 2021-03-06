import React , {useState} from 'react';
import { ImageLoader } from './components/ImageLoader'
import { Button } from './components/Button'
import s from './style.module.css'

const App = () => {
const [imgSrc, setImgSrc] = useState('')

const [fileInfo, setFileInfo] = useState({})

const [error, setError] = useState('')

const sendImage = () => {
  console.log(imgSrc)
  setImgSrc('')
  setFileInfo({})
  setError('')
}

return <div className="container">
<div className={s.loaderWrapper}
  onDragOver={e => e.preventDefault()}
  onDrop={e => e.preventDefault()}
>
  <ImageLoader className={s.dropBox}
    imgSrc={imgSrc}
    setImgSrc={setImgSrc}
    fileInfo={fileInfo}
    setFileInfo={setFileInfo}
    error={error}
    setError={setError}
  />
  <Button
    btnText={'Send image!'}
    className={s.btn}
    onAction={sendImage} 
    disabled={!imgSrc}
    />
</div>
  </div>
}

export default App;
