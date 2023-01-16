import { useRouter } from 'next/router'
import dbConnect from '../lib/dbConnect'
import Persona from '../models/Persona.jsx'
import Link from 'next/link'
import styles from '../css/principal.module.css'

export default function Index ({pruebas}) {
  const router = useRouter()
  
  const handleDelete = async (id) => {

    try {
      await fetch(`/api/persona/${id}`, {
        method: "DELETE",
      });
      router.push("/");
    } catch (error) {
      setMessage("Error al eliminar");
    }
  };

 return(
  <>
  
  <h1>Lista de Precios</h1>
  <Link className={styles.a} href="/new">
     Agregar
  </Link>
  <div className={styles.tabla} >
    <div className={styles.flex}>
      <div className={styles.cabeza}>
        Producto
      </div>
      <div className={styles.cabeza}>
        Precio
      </div>
      <div className={styles.cabeza}>
        Acciones
      </div>
    </div>
    {pruebas.map((val)=>{
                  
                  return(
                    <div className={styles.flex}  key={val._id}>
                      <div className={styles.nombre} >
                        {val.nombre}
                      </div>
                      <div className={styles.edad} >
                        $ {val.edad}
                      </div>
                      <div className={styles.acciones} >
                      <Link  className="btn btn-warning me-2"
                        href="/[id]/edit"  as={`/${val._id}/edit`}
                      >
                        Editar
                      </Link>
                        <button className="btn btn-danger" onClick={()=>handleDelete(val._id)}>
                          Eliminar
                        </button>
                      </div>
                    </div>
                    
                  )
    })} 
  </div>

  </>
 )
    
}


export async function getServerSideProps() {
  try {
      await dbConnect()

      const res = await Persona.find({})
      const pruebas = res.map((doc)=>{
        const prueba = doc.toObject()
        prueba._id = `${prueba._id}`
       
        return prueba
      })

      return { props: {pruebas: pruebas}}
  } catch (error) {
    console.log(error)
  }

}