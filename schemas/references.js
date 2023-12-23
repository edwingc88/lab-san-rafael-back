import z from 'zod'

const referenceSchema = z.object({
  name: z.string().min(1, { message: 'This field has to be filled.' }),
  price: z.number().min(1, { message: 'This field has to be filled.' }),
  id_category: z.number().min(1, { message: 'This field has to be filled.' })
})

export function validateReference (object) {
  return referenceSchema.safeParse(object)
}

export function validatePartialReference (object) {
  return referenceSchema.partial().safeParse(object)
}
