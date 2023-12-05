import z from 'zod'

const labSchema = z.object({
  name: z.string().min(1, { message: 'This field has to be filled.' }),
  rif: z.string().min(1, { message: 'This field has to be filled.' }),
  slogan: z.string().min(1, { message: 'This field has to be filled.' }),
  description: z.string().min(1, { message: 'This field has to be filled.' }),
  address: z.string().min(1, { message: 'This field has to be filled.' }),
  phone: z.string().min(1, { message: 'This field has to be filled.' }),
  email: z.string().min(1, { message: 'This field has to be filled.' }).email('This is not a valid email.'),
  logo: z.string().min(1, { message: 'This field has to be filled.' })
})

export function validateLab (object) {
  return labSchema.safeParse(object)
}

export function validatePartialLab (object) {
  return labSchema.partial().safeParse(object)
}
