import z from 'zod'

const relationshipSchema = z.object({
  name: z.string().min(1, { message: 'This field has to be filled.' }),
  price: z.number().min(1, { message: 'This field has to be filled.' }),
  id_category: z.number().min(1, { message: 'This field has to be filled.' })
})

export function validateRelationship (object) {
  return relationshipSchema.safeParse(object)
}

export function validatePartialRelationship (object) {
  return relationshipSchema.partial().safeParse(object)
}
