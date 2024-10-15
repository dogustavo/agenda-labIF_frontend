import { z } from 'zod'

const userSchema = z
  .object({
    name: z
      .string()
      .max(70, { message: 'Número de caracteres máximo é 70.' })
      .refine(
        (nome) => {
          if (!nome) return true

          const regex = /^[a-zA-ZÀ-ÿ]+(?:\s[a-zA-ZÀ-ÿ]+)+$/
          return regex.test(nome)
        },
        { message: 'Insira um nome completo.' }
      )
      .optional(),
    email: z
      .string()
      .max(100, { message: 'Número de caracteres máximo é 100.' })
      .email('Insira um endereço de e-mail válido.')
      .optional()
      .or(z.literal('')),
    password: z
      .string()
      .min(6, {
        message: 'A senha deve ter pelo menos 6 caracteres.'
      })
      .optional()
      .or(z.literal('')),
    password_check: z
      .string()
      .min(6, {
        message:
          'A confirmação da senha deve ter pelo menos 4 caracteres.'
      })
      .optional()
      .or(z.literal(''))
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

export default userSchema
