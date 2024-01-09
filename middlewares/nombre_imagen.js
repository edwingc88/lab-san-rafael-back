export const nombreFinal = (files) => {
  console.log(files)
  const key = Object.keys(files)[0]
  const rutaLink = files[key][0].path
  const rutaArchivo = rutaLink.replaceAll('\\', '/')
  const rutaArchivoCompleta = rutaArchivo.split('/').slice(-1)[0]
  return rutaArchivoCompleta
}
