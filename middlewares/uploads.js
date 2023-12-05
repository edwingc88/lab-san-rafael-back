import multer from 'multer'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
const CURRENT_DIR = dirname(fileURLToPath(import.meta.url))
// const MIMETYPES = ['image/jpeg', 'image/png', 'application/msword', 'application/pdf']

export const multerMiddlewares = async (req, res, next) => {
  console.log('multerMiddlewares')
  const multerUpload = multer({
    dest: join(CURRENT_DIR, '../uploads'),
    /* storage: multer.diskStorage({
      destination: join(CURRENT_DIR, '../uploads'),
      filename: (req, file, cb) => {
        const fileExtension = extname(file.originalname)
        const fileName = file.originalname.split(fileExtension)[0]

        cb(null, `${fileName}-${Date.now()}${fileExtension}`)
      }
    }),
    fileFilter: (req, file, cb) => {
      if (MIMETYPES.includes(file.mimetype)) cb(null, true)
      else cb(new Error(`Only ${MIMETYPES.join(' ')} mimetypes are allowed`))
    }, */
    limits: {
      fieldSize: 10000000
    }
  })

  console.log(req.file)

  multerUpload.single('file')
  next()
}
