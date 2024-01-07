import z from 'zod'

const cLientSchema = z.object({
  dni: z.string({
    invalid_type_error: 'CLient DNI must be a string',
    required_error: 'CLient DNI is required'
  }),
  email: z.string().min(1, { message: 'This field has to be filled.' }).email('This is not a valid email.'),
  username: z.string().min(1, { message: 'This field has to be filled.' }),
  password: z.string().min(1, { message: 'This field has to be filled.' }),
  firstname: z.string().min(1, { message: 'This field has to be filled.' }),
  lastname: z.string().min(1, { message: 'This field has to be filled.' }),
  id_gender: z.number(),
  address: z.string(),
  firstphone: z.string(),
  secondphone: z.string(),
  // created: z.string().transform((str) => new Date(str)),
  birthdate: z.string().transform((str) => new Date(str)),
  blood_typing: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']),
  id_relationship: z.number(),
  name_relationship: z.string(),
  created: z.date().safeParse(new Date()),
  abatar: z.string().url({
    message: 'Picture mus  t be a valid URL'
  }),
  id_role: z.number([1, 2, 3, 4])
})

export function validateClient (object) {
  return cLientSchema.safeParse(object)
}

export function validatePartialClient (object) {
  return cLientSchema.partial().safeParse(object)
}
