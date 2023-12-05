import z from 'zod'

const patientSchema = z.object({
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
  relationship: z.string(),
  blood_typing: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']),
  created: z.string().transform((str) => new Date(str)),
  client_id: z.string().uuid()
})

export function validatePatient (object) {
  return patientSchema.safeParse(object)
}

export function validatePartialPatient (object) {
  return patientSchema.partial().safeParse(object)
}
