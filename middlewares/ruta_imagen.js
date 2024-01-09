export const rutaFinal = (files) => {
  console.log(files)
  const key = Object.keys(files)[0]
  const rutaLink = files[key][0].path
  const rutaArchivoCompleta = rutaLink.replaceAll('\\', '/')
  return rutaArchivoCompleta
}
