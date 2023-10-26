import z from 'zod'

const personSchema = z.object({
  dni: z.string({
    invalid_type_error: 'Person DNI must be a string',
    required_error: 'Person DNI is required'
  }),
  password: z.string().min(1, { message: 'This field has to be filled.' }),
  firstname: z.string().min(1, { message: 'This field has to be filled.' }),
  lastname: z.string().min(1, { message: 'This field has to be filled.' }),
  email: z.string().min(1, { message: 'This field has to be filled.' }).email('This is not a valid email.'),
  birthdate: z.string().transform((str) => new Date(str)),
  gender: z.enum(['Masculino', 'Femenino']),
  address: z.string(),
  mobilephone: z.string(),
  homephone: z.string(),
  blood_typing: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']),
  created: z.string().transform((str) => new Date(str)),
  picture_url: z.string().url({
    message: 'Picture must be a valid URL'
  }),
  role_id: z.number([1, 2])
})

export function validatePerson (object) {
  return personSchema.safeParse(object)
}

export function validatePartialPerson (object) {
  return personSchema.partial().safeParse(object)
}
