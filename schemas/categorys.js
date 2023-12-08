import z from 'zod'

const categorySchema = z.object({
  name: z.string().min(1, { message: 'This field has to be filled.' }),
  description: z.string().min(1, { message: 'This field has to be filled.' }),
  id_exam: z.string().uuid({ message: 'Invalid UUID' }),
  id_sub_category: z.number().int()
})

export function validateCategory (object) {
  return categorySchema.safeParse(object)
}

export function validatePartialCategory (object) {
  return categorySchema.partial().safeParse(object)
}
