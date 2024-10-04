import z from 'zod'

const resultSchema = z.object({
  id_exam: z.string().min(1, { message: 'This field has to be filled.' }),
  id_order: z.string().min(1, { message: 'This field has to be filled.' }),
  id_parameter: z.string().min(1, { message: 'This field has to be filled.' })
})

export function validateResult (object) {
  return resultSchema.safeParse(object)
}

export function validatePartialResult (object) {
  return resultSchema.partial().safeParse(object)
}
