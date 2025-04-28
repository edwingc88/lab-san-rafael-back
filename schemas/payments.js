import z from 'zod'

const paymentSchema = z.object({
  bs: z.string().min(1, { message: 'This field has to be filled.' }).transform((value) => parseFloat(value)),
  dolar: z.string().min(1, { message: 'This field has to be filled.' }),
  reference: z.string().min(1, { message: 'This field has to be filled.' }),
  status: z.string().min(1, { message: 'This field has to be filled.' }).transform((value) => !!value),
  id_orders: z.string().min(1, { message: 'This field has to be filled.' })
})

export function validatePayment (object) {
  return paymentSchema.safeParse(object)
}

export function validatePartialPayment (object) {
  return paymentSchema.partial().safeParse(object)
}
