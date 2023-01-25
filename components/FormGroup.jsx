import React, {useState, useEffect} from 'react'
import styles from '../css/formGroup.module.css'
import Axios from 'axios'
function FormGroup() {

    const [ image, setImage ] = useState("")
    const [ imagew, setImagew ] = useState({})

    const [ loading, setLoading ] = useState(false)

  

   const onchange = (e) => {
   setImagew(e.target.files[0])
   
   }
    const uploadImage = async (e) => {
    
        const data = new FormData()
        data.append('file', imagew)
        data.append('upload_preset', 'lefasom')
        setLoading(true)
        try {
          const resp = await Axios.post(`https://api.cloudinary.com/v1_1/drgoowdis/image/upload`,
         data
          ) 
        const file = { url: resp.data.secure_url, cloudId: resp.data.public_id }
        console.log(file.url)
        setImage(file.url)
        setLoading(false)
        } catch (error) {
          console.log(error)
        }
      } 
      
 

  return (
    <div className={styles.containerInput}>
 
    <input
      name="file"
      type="file"
      onChange={onchange}
    />
    <button onClick={uploadImage}>
      subir
    </button>
    {loading?<h3>cargardo imagenes...</h3>: <img src={image}/>}
    <h2>{image}</h2>
  </div>
  )
}

export default FormGroup