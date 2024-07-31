import z from 'zod'

const invoiceSchema = z.object({
  name: z.string().min(1, { message: 'This field has to be filled.' }),
  total: z.number().min(1, { message: 'This field has to be filled.' }),
  method_payment: z.string().min(1, { message: 'This field has to be filled.' }),
  reference_payment: z.string().min(1, { message: 'This field has to be filled.' }),
  type_payment: z.string().min(1, { message: 'This field has to be filled.' }),
  state_payment: z.string().min(1, { message: 'This field has to be filled.' }),
  state_date: z.string().min(1, { message: 'This field has to be filled.' }),
  price: z.string().min(1, { message: 'This field has to be filled.' }).transform((id) => parseInt(id)),
  id_category: z.number().min(1, { message: 'This field has to be filled.' })
})

export function validateInvoice (object) {
  return invoiceSchema.safeParse(object)
}

export function validatePartialInvoice (object) {
  return invoiceSchema.partial().safeParse(object)
}
