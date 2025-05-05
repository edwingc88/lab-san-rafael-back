import z from 'zod'

const orderSchema = z.object({
  number: z.string().min(1, { message: 'This field has to be filled.' }),
  date: z.string().min(1, { message: 'This field has to be filled.' }).transform((str) => new Date(str)).default(new Date().toString()),
  observation: z.string().min(1, { message: 'This field has to be filled.' }),
  id_users: z.string().min(1, { message: 'This field has to be filled.' }),
  id_order_statu: z.string().min(1, { message: 'This field has to be filled.' })
})

export function validateOrder (object) {
  return orderSchema.safeParse(object)
}

export function validatePartialOrder (object) {
  return orderSchema.partial().safeParse(object)
}

export function validateOrdenDeUsuario (object) {
  const ordenDeUsuarioSchema = z.object({
    idCustomer: z.number().min(1, { message: 'This field has to be filled.' }),
    observation: z.string().min(1, { message: 'This field has to be filled.' }).default('Sin Observacion'),
    date: z.string().min(1, { message: 'This field has to be filled.' }).transform((str) => new Date(str)).default(new Date().toString()),
    exams: z.array(z.object({
      id: z.string().min(1, { message: 'This field has to be filled.' })
    })),
    payment: z.object({
      total: z.number().min(1, { message: 'This field has to be filled.' }),
      depositBs: z.number().min(1, { message: 'This field has to be filled.' }).default(0).optional(),
      depositRef: z.number().min(1, { message: 'This field has to be filled.' }).default(0).optional(),
      dolar: z.number().min(1, { message: 'This field has to be filled.' }).default(0)
    }),
    status: z.number().min(1, { message: 'This field has to be filled.' }).default(1)
  })
  return ordenDeUsuarioSchema.safeParse(object)
}
