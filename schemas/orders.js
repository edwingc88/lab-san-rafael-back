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

export function validateOrdenDeUsuario (object) {
  const ordenDeUsuarioSchema = z.object({
    idCustomer: z.number().min(1, { message: 'This field has to be filled.' }),
    observation: z.string().min(1, { message: 'This field has to be filled.' }).default('Sin Observacion'),
    date: z.string().min(1, { message: 'This field has to be filled.' }).transform((str) => new Date(str)).default(new Date().toString()),
    exams: z.array(z.object({
      id: z.string().min(1, { message: 'This field has to be filled.' })
    })),
    payment: z.object({
      transferencia: z.object({
        bs: z.number().min(1, { message: 'This field has to be filled.' }),
        ref: z.number().min(1, { message: 'This field has to be filled.' }).optional()
      }),
      divisas: z.object({
        dolar: z.number().min(1, { message: 'This field has to be filled.' })
      })
    }),
    states: z.number().min(1, { message: 'This field has to be filled.' }).default(1)
  })
  return ordenDeUsuarioSchema.safeParse(object)
}
