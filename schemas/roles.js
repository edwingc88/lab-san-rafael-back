import z from 'zod'

const roleSchema = z.object({
  id: z.number(),
  name: z.string().min(1, { message: 'This field has to be filled.' })
})

export function validateRole (object) {
  return roleSchema.safeParse(object)
}

export function validatePartialRole (object) {
  return roleSchema.partial().safeParse(object)
}
