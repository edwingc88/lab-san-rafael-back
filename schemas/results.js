import z from 'zod'

const resultSchema = z.object({
  name: z.string().min(1, { message: 'This field has to be filled.' }),
  price: z.number().min(1, { message: 'This field has to be filled.' }),
  id_category: z.number().min(1, { message: 'This field has to be filled.' })
})

export function validateResult (object) {
  return resultSchema.safeParse(object)
}

export function validatePartialResult (object) {
  return resultSchema.partial().safeParse(object)
}
