import fs from 'fs'
import 'dotenv/config'

const IMAGEN_UPLOAD = 'sources/images/public/'
export const borrarImagen = async (imgname) => {
  console.log('Dentro de la funcion: ' + imgname)
  const imagenBorrar = IMAGEN_UPLOAD + imgname
  fs.unlink(imagenBorrar, function (err) {
    if (err) { console.error(err) }
    console.log('File deleted!')
  })
}
