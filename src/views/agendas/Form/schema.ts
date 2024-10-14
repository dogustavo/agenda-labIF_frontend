import { z } from 'zod'

const loginSchema = z.object({
  equipamentId: z
    .string({
      required_error: 'Campo é obrigatório'
    })
    .min(1, { message: 'Selecione o equipamento.' }),
  scheduleDate: z.date({
    required_error: 'Campo é obrigatório'
  }),
  time: z.array(z.string())
})

export default loginSchema
