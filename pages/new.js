import FormGroup from '../components/FormGroup'
import React, { useState } from 'react'
import { useRouter } from 'next/router'


function New() {
  const router = useRouter()


  const [formData, setFormData] = useState({
    nombre: null,
    edad: null,
    url: null,
  })

  const handleForm = async () => {
    console.log('estado -> '+formData.url)
    try {
        // console.log(form)
        const res = await fetch('/api/controles', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(formData)
        })
       router.push('/')

    } catch (error) {
        console.log(error)
    }
}

  return (<>
    <div>Formulario</div>
    <FormGroup formData={formData.url} setFormData={setFormData}/>

    <button onClick={handleForm}>
      Guardar
    </button>
  </>)
}

export default New