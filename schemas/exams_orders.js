import z from 'zod'

const examOrderResultSchema = z.object({
  id_exam: z.string().min(1, { message: 'This field has to be filled.' }),
  id_category: z.string().min(1, { message: 'This field has to be filled.' })
})

export function validateExamOrderResult (object) {
  return examOrderResultSchema.safeParse(object)
}

export function validatePartialExamOrderResult (object) {
  return examOrderResultSchema.partial().safeParse(object)
}
