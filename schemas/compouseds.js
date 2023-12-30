import z from 'zod'

const compousedSchema = z.object({
  name: z.string().min(1, { message: 'This field has to be filled.' }),
  price: z.number().min(1, { message: 'This field has to be filled.' }),
  id_category: z.number().min(1, { message: 'This field has to be filled.' })
})

export function validateCompoused (object) {
  return compousedSchema.safeParse(object)
}

export function validatePartialCompoused (object) {
  return compousedSchema.partial().safeParse(object)
}
