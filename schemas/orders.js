import z from 'zod'

const orderSchema = z.object({
  number: z.string().min(1, { message: 'This field has to be filled.' }),
  date: z.string().min(1, { message: 'This field has to be filled.' }).transform((str) => new Date(str)).default(new Date().toString()),
  observation: z.string().min(1, { message: 'This field has to be filled.' }),
  id_users: z.string().min(1, { message: 'This field has to be filled.' }),
  id_states: z.string().min(1, { message: 'This field has to be filled.' })
})

export function validateOrder (object) {
  return orderSchema.safeParse(object)
}

export function validatePartialOrder (object) {
  return orderSchema.partial().safeParse(object)
}
