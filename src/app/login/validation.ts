import { z } from 'zod'

const loginSchema = z.object({
  username: z
    .string({
      required_error: 'E-mail é obrigatório.'
    })
    .email('Insira um endereço de e-mail válido.'),
  password: z.string().min(6, {
    message: 'A senha deve ter pelo menos 6 caracteres.'
  })
})

export default loginSchema
