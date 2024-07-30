import z from 'zod'

const userSchema = z.object({
  dni: z.string({
    invalid_type_error: 'User DNI must be a string',
    required_error: 'User DNI is required'
  }),
  email: z.string().min(1, { message: 'This field has to be filled.' }).email('This is not a valid email.'),
  username: z.string().min(1, { message: 'This field has to be filled.' }),
  password: z.string().min(1, { message: 'This field has to be filled.' }),
  firstname: z.string().min(1, { message: 'This field has to be filled.' }),
  lastname: z.string().min(1, { message: 'This field has to be filled.' }),
  gender: z.string().default(null),
  address: z.string().default(null),
  firstphone: z.string(),
  secondphone: z.string(),
  birthdate: z.string().transform((str) => new Date(str)).default(new Date().toString()),
  blood_typing: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']).optional(),
  type_relationship: z.string(),
  name_relationship: z.string(),
  // created: z.date().safeParse(new Date()),
  created: z.string().transform((str) => new Date(str)).default(new Date().toString()),
  abatar: z.string().url({
    message: 'Picture mus  t be a valid URL'
  }).optional(),
  id_role: z.string(['1', '2', '3', '4'])
})

export function validateUser (object) {
  console.log('Valindadno objkect', object)
  return userSchema.safeParse(object)
}

export function validatePartialUser (object) {
  return userSchema.partial().safeParse(object)
}
