export const nombreFinalImagenByFile = (file) => {
  console.log(file)
  const key = Object.keys(file)[0]
  const rutaLink = file[key][0].path
  const rutaArchivo = rutaLink.replaceAll('\\', '/')
  const rutaArchivoCompleta = rutaArchivo.split('/').slice(-1)[0]
  return rutaArchivoCompleta
}

export const nombreFinalImagenByUrl = (url) => {
  // console.log(files)
  // const key = Object.keys(files)[0]
  // const rutaLink = files[key][0].path
  // const rutaArchivo = files.replaceAll('\\', '/')
  const rutaArchivo = url.split('/').slice(-1)
  const rutaArchivoCompleta = rutaArchivo[0]
  return rutaArchivoCompleta
}
