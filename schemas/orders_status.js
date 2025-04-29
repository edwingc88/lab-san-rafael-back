import z from 'zod'

const genderSchema = z.object({
  name: z.string().min(1, { message: 'This field has to be filled.' }),
  description: z.string().min(1, { message: 'This field has to be filled.' })
})

export function validateOrderStatu (object) {
  return genderSchema.safeParse(object)
}

export function validatePartialOrderStatu (object) {
  return genderSchema.partial().safeParse(object)
}
