import z from 'zod'

const examSchema = z.object({
  name: z.string().min(1, { message: 'This field has to be filled.' }),
  description: z.string().min(1, { message: 'This field has to be filled.' }),
  /*   indicator: z.string().min(1, { message: 'This field has to be filled.' }),
  unit: z.string().min(1, { message: 'This field has to be filled.' }), */
  price: z.string().min(1, { message: 'This field has to be filled.' }).transform((id) => parseInt(id)),
  id_category: z.string().min(1, { message: 'This field has to be filled.' }).transform((id) => parseInt(id))
})

export function validateExam (object) {
  return examSchema.safeParse(object)
}

export function validatePartialExam (object) {
  return examSchema.partial().safeParse(object)
}
