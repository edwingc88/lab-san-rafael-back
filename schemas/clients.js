import z from 'zod'

const cLientSchema = z.object({
  dni: z.string({
    invalid_type_error: 'CLient DNI must be a string',
    required_error: 'CLient DNI is required'
  }),
  password: z.string().min(1, { message: 'This field has to be filled.' }),
  firstname: z.string().min(1, { message: 'This field has to be filled.' }),
  lastname: z.string().min(1, { message: 'This field has to be filled.' }),
  email: z.string().min(1, { message: 'This field has to be filled.' }).email('This is not a valid email.'),
  address: z.string(),
  mobilephone: z.string(),
  // created: z.string().transform((str) => new Date(str)),
  created: z.date().safeParse(new Date()),
  picture_url: z.string().url({
    message: 'Picture must be a valid URL'
  }),
  role_id: z.number([1, 2, 3, 4])
})

export function validateClient (object) {
  return cLientSchema.safeParse(object)
}

export function validatePartialClient (object) {
  return cLientSchema.partial().safeParse(object)
}
