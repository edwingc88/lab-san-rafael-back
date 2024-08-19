import z from 'zod'

const categorySchema = z.object({
  name: z.string().min(1, { message: 'This field has to be filled.' })
})

export function validateCategory (object) {
  return categorySchema.safeParse(object)
}

export function validatePartialCategory (object) {
  return categorySchema.partial().safeParse(object)
}
