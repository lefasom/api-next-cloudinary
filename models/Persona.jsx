import mongoose from 'mongoose'

const PruebaSchema = new mongoose.Schema({
    nombre: {
      type: String,
      // required: [true, 'Por favor ingresa nombre.'],
      // maxlength: [60, 'Name cannot be more than 60 characters'],
    },
    edad: {
      type: String,
      // required: [true, 'Por favor ingresa edad.'],
    },
    url: {
      type: String,
    }
   
  })

  export default mongoose.models.Prueba || mongoose.model('Prueba', PruebaSchema)
