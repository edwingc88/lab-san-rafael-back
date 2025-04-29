import z from 'zod'

const genderSchema = z.object({
  name: z.string().min(1, { message: 'This field has to be filled.' }),
  description: z.string().min(1, { message: 'This field has to be filled.' })
})

export function validatePaymentStatu (object) {
  return genderSchema.safeParse(object)
}

export function validatePartialPaymentStatu (object) {
  return genderSchema.partial().safeParse(object)
}
