import React, {useState, useEffect} from 'react'
import styles from '../css/formGroup.module.css'
import Axios from 'axios'

function FormGroup({ formData, setFormData} ) {
    const [ image, setImage ] = useState("")
    const [ nombre, setNombre ] = useState("")
    const [ edad, setEdad ] = useState("")


    const [ datas, setDatas ] = useState({})

    const [ loading, setLoading ] = useState(false)

  

   const onchange = (e) => {
   setDatas(e.target.files[0])
   
   }
    const uploadImage = async (e) => {
    
        const data = new FormData()
        data.append('file', datas)
        data.append('upload_preset', 'lefasom')
        setLoading(true)
        try {
          const resp = await Axios.post(`https://api.cloudinary.com/v1_1/drgoowdis/image/upload`,
         data
          ) 
          const img = { url: resp.data.secure_url, cloudId: resp.data.public_id }
          setFormData(curr => ({...curr, url: img.url}))
          setFormData(curr => ({...curr, nombre: nombre}))
          setFormData(curr => ({...curr, edad: edad}))
          

        console.log(img.url)
        setImage(img.url)
        setLoading(true)
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
    <input 
    placeholder='nombre'
    onChange={(e)=>{setNombre(e.target.value)}}
    type="text" />
      <input 
    placeholder='edad'
    onChange={(e)=>{setEdad(e.target.value)}}
    type="text" />

    <button onClick={uploadImage}>
      Cargar datos
    </button>
    {!loading?<h3>cargardo imagenes...</h3>: <img src={image}/>}
    <p>{image}</p>
    
  </div>
  )
}

export default FormGroup