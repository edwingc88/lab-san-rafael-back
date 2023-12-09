import z from 'zod'

const subcategorySchema = z.object({
  name: z.string().min(1, { message: 'This field has to be filled.' })
})

export function validateSubCategory (object) {
  return subcategorySchema.safeParse(object)
}

export function validatePartialSubCategory (object) {
  return subcategorySchema.partial().safeParse(object)
}
