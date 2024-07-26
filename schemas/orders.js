import z from 'zod'

const orderSchema = z.object({
  name: z.string().min(1, { message: 'This field has to be filled.' }),
  price: z.number().min(1, { message: 'This field has to be filled.' }),
  id_category: z.number().min(1, { message: 'This field has to be filled.' })
})

export function validateOrder (object) {
  return orderSchema.safeParse(object)
}

export function validatePartialOrder (object) {
  return orderSchema.partial().safeParse(object)
}
