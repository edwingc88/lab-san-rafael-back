import z from 'zod'

const roleSchema = z.object({
  name: z.string()
})

export function validateRole (object) {
  return roleSchema.safeParse(object)
}

export function validatePartialRole (object) {
  return roleSchema.partial().safeParse(object)
}
