import z from 'zod'

const examSchema = z.object({
  name: z.string().min(1, { message: 'This field has to be filled.' }),
  price: z.number().min(1, { message: 'This field has to be filled.' }),
  id_category: z.number().min(1, { message: 'This field has to be filled.' })
})

export function validateExam (object) {
  return examSchema.safeParse(object)
}

export function validatePartialExam (object) {
  return examSchema.partial().safeParse(object)
}
