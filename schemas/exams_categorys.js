import z from 'zod'

const examCategorySchema = z.object({
  id_exam: z.string().min(1, { message: 'This field has to be filled.' }),
  id_category: z.string().min(1, { message: 'This field has to be filled.' })
})

export function validateExamCategory (object) {
  return examCategorySchema.safeParse(object)
}

export function validatePartialExamCategory (object) {
  return examCategorySchema.partial().safeParse(object)
}
