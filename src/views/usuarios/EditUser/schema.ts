import { z } from 'zod'

const userSchema = z.object({
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
  role: z
    .string({
      required_error: 'Campo papel do usuário é obrigatório'
    })
    .min(1, { message: 'Selecione um tipo de usuário.' }),
  userType: z
    .string({
      required_error: 'Campo tipo do usuário é obrigatório'
    })
    .min(1, { message: 'Selecione um tipo de usuário.' })
})

export default userSchema
