import z from 'zod'

const subcategorySchema = z.object({
  name: z.string().min(1, { message: 'This field has to be filled.' }),
  description: z.string().min(1, { message: 'This field has to be filled.' }),
  price: z.number().min(1, { message: 'This field has to be filled.' })
})

export function validatesubcategory (object) {
  return subcategorySchema.safeParse(object)
}

export function validatePartialsubcategory (object) {
  return subcategorySchema.partial().safeParse(object)
}
