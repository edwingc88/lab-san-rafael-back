import z from 'zod'

const invoiceSchema = z.object({
  name: z.string().min(1, { message: 'This field has to be filled.' }),
  price: z.number().min(1, { message: 'This field has to be filled.' }),
  id_category: z.number().min(1, { message: 'This field has to be filled.' })
})

export function validateInvoice (object) {
  return invoiceSchema.safeParse(object)
}

export function validatePartialInvoice (object) {
  return invoiceSchema.partial().safeParse(object)
}
