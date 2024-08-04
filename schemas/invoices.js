import z from 'zod'

const invoiceSchema = z.object({
  total: z.string().min(1, { message: 'This field has to be filled.' }).transform((value) => parseFloat(value)),
  method_payment: z.string().min(1, { message: 'This field has to be filled.' }),
  reference_payment: z.string().min(1, { message: 'This field has to be filled.' }),
  states_payment: z.string().min(1, { message: 'This field has to be filled.' }).transform((value) => !!value),
  states_date: z.string().min(1, { message: 'This field has to be filled.' }).transform((str) => new Date(str)).default(new Date().toString()),
  id_orders: z.string().min(1, { message: 'This field has to be filled.' })
})

export function validateInvoice (object) {
  return invoiceSchema.safeParse(object)
}

export function validatePartialInvoice (object) {
  return invoiceSchema.partial().safeParse(object)
}
