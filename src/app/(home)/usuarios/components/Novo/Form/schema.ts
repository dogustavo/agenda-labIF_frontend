import { z } from 'zod'

const userSchema = z
  .object({
    name: z
      .string({
        required_error: 'Nome é obrigatório.'
      })
      .max(70, { message: 'Número de caracteres máximo é 70.' })
      .refine(
        (nome) => {
          const regex = /^[a-zA-ZÀ-ÿ]+(?:\s[a-zA-ZÀ-ÿ]+)+$/
          return regex.test(nome)
        },
        { message: 'Insira um nome completo.' }
      ),
    email: z
      .string({
        required_error: 'E-mail é obrigatório.'
      })
      .max(100, { message: 'Número de caracteres máximo é 100.' })
      .email('Insira um endereço de e-mail válido.'),
    password: z.string().min(6, {
      message: 'A senha deve ter pelo menos 6 caracteres.'
    }),
    password_check: z.string().min(6, {
      message:
        'A confirmação da senha deve ter pelo menos 4 caracteres.'
    }),
    userType: z
      .string({
        required_error: 'Campo tipo do usuário é obrigatório'
      })
      .min(1, { message: 'Selecione um tipo de usuário.' })
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
