import z from 'zod'

const categorySchema = z.object({
  name: z.string().min(1, { message: 'This field has to be filled.' }),
  description: z.string().min(1, { message: 'This field has to be filled.' }),
  price: z.number().min(1, { message: 'This field has to be filled.' })
})

export function validatecategory (object) {
  return categorySchema.safeParse(object)
}

export function validatePartialcategory (object) {
  return categorySchema.partial().safeParse(object)
}
