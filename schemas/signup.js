import z from 'zod'

const signupSchema = z.object({
  firstname: z.string().min(1, { message: 'This field has to be filled.' }),
  lastname: z.string().min(1, { message: 'This field has to be filled.' }),
  username: z.string().min(1, { message: 'This field has to be filled.' }),
  dni: z.string().min(1, { message: 'This field has to be filled.' }),
  password: z.string().min(1, { message: 'This field has to be filled.' }),
  email: z.string().min(1, { message: 'This field has to be filled.' }).email('This is not a valid email.'),
  firstphone: z.string(),
  created: z.string().transform((str) => new Date(str)).optional().default(new Date().toString()),
  birthdate: z.string().transform((str) => new Date(str))
})

export function validateSignup (object) {
  return signupSchema.safeParse(object)
}

export function validatePartialSignup (object) {
  return signupSchema.partial().safeParse(object)
}
