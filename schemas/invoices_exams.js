import z from 'zod'

const invoiceExamSchema = z.object({
  name: z.string().min(1, { message: 'This field has to be filled.' }),
  price: z.number().min(1, { message: 'This field has to be filled.' }),
  id_category: z.number().min(1, { message: 'This field has to be filled.' })
})

export function validateInvoiceExam (object) {
  return invoiceExamSchema.safeParse(object)
}

export function validatePartialInvoiceExam (object) {
  return invoiceExamSchema.partial().safeParse(object)
}
