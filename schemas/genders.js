import z from 'zod'

const genderSchema = z.object({
  name: z.string().min(1, { message: 'This field has to be filled.' }),
  price: z.number().min(1, { message: 'This field has to be filled.' }),
  id_category: z.number().min(1, { message: 'This field has to be filled.' })
})

export function validateGender (object) {
  return genderSchema.safeParse(object)
}

export function validatePartialGender (object) {
  return genderSchema.partial().safeParse(object)
}
