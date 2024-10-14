import { z } from 'zod'

const convertHour = (time: string): number => {
  const [hours] = time.split(':').map(Number)

  return hours
}

const equipamentSchema = z
  .object({
    equipamentName: z
      .string({
        required_error: 'Nome é obrigatório.'
      })
      .max(70, { message: 'Número de caracteres máximo é 70.' }),
    availableFrom: z
      .string({
        required_error: 'Hora inicial é obrigatório'
      })
      .min(1, { message: 'Selecione horario inicial.' }),
    availableTo: z
      .string({
        required_error: 'Hora finale é obrigatório'
      })
      .min(1, { message: 'Selecione horario final.' })
  })
  .superRefine((val, ctx) => {
    const availableFrom = convertHour(val.availableFrom)
    const availableTo = convertHour(val.availableTo)

    if (availableFrom > availableTo) {
      console.log('entrou')
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'O horário final não pode ser menor que inicial.',
        path: ['availableTo']
      })
    }

    if (availableFrom === availableTo) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'É necessário ter ao menos 1h de espaço para agendamento',
        path: ['availableFrom']
      })
    }
  })

export default equipamentSchema
