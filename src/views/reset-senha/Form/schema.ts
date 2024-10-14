import { z } from 'zod'

const passwordSchema = z
  .object({
    password: z.string().min(6, {
      message: 'A senha deve ter pelo menos 6 caracteres.'
    }),
    password_check: z.string().min(6, {
      message:
        'A confirmação da senha deve ter pelo menos 4 caracteres.'
    })
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.password_check) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'As senhas devem coincidir.',
        path: ['password_check']
      })
    }
  })

export default passwordSchema
