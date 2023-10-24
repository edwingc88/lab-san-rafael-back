import z from 'zod'

const personSchema = z.object({
  dni: z.string({
    invalid_type_error: 'Person DNI must be a string',
    required_error: 'Person DNI is required'
  }),
  year: z.number().int().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  email: z.string().email({}),
  gender: z.array(z.enum(['Masculino', 'Femenino']), {
    required_error: 'Person gender is required',
    invalid_type_error: 'Person gender must be an array of strings'
  }),
  birthdate: z.date().default(new Date()),
  address: z.string(),
  mobilePhone: z.string().regex(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/),
  homePhone: z.string().regex(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/),
  bloodType: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']),
  created: z.date().default(new Date()),
  pictureURL: z.string().url({
    message: 'Picture must be a valid URL'
  })
})

export function validatePerson (object) {
  return personSchema.safeParse(object)
}

export function validatePartialPerson (object) {
  return personSchema.partial().safeParse(object)
}
