import { z } from 'zod'

export const IStyleSchema = z.object({
  darkmode: z.boolean(),
  boxShadow: z.string(),
  button: z.object({
    bgColor: z.string(),
    hoverColor: z.string(),
    textColor: z.string(),
    borderRadius: z.string(),
    size: z.string()
  }),
  component: z.object({
    bgColor: z.string()
  }),
  page: z.object({
    bgColor: z.string()
  }),
  optionsColor: z.array(z.string())
})

export type IStyle = z.infer<typeof IStyleSchema>
