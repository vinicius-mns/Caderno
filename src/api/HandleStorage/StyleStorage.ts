// import { ApiBase, type CRUD } from './ApiBase'
// import { z } from 'zod'
// import { LStorage } from './LStorage'

// const IStyleSchema = z.object({
//   darkmode: z.boolean(),
//   boxShadow: z.string(),
//   button: z.object({
//     bgColor: z.string(),
//     hoverColor: z.string(),
//     textColor: z.string(),
//     borderRadius: z.string(),
//     size: z.string()
//   }),
//   component: z.object({
//     bgColor: z.string()
//   }),
//   page: z.object({
//     bgColor: z.string()
//   }),
//   optionsColor: z.array(z.string())
// })

// export type IStyle = z.infer<typeof IStyleSchema>

// const initialValue: IStyle = {
//   darkmode: true,
//   boxShadow: '0 0 0px 0px rgba(255, 255, 255, 0.3)',
//   button: {
//     bgColor: '#313131',
//     hoverColor: '#424242',
//     textColor: 'white',
//     borderRadius: '8px',
//     size: '36px'
//   },
//   component: {
//     bgColor: '#202020'
//   },
//   page: {
//     bgColor: '#191919'
//   },
//   optionsColor: ['pink', '#B6E0FE', '#202020']
// }

// class StyleStorage extends ApiBase<IStyle> {
//   constructor(
//     public api: CRUD<IStyle>,
//     protected _shema: z.AnyZodObject,
//     protected _initialValue: IStyle
//   ) {
//     super(api, _shema, _initialValue)
//   }

//   public toggleDarkMode = () => {
//     const data = this.read()
//     const updatedData = { ...data, darkmode: !data.darkmode }
//     if (updatedData.darkmode) {
//       updatedData.button.textColor = 'white'
//       updatedData.button.bgColor = '#313131'
//       updatedData.page.bgColor = '#191919'
//       updatedData.button.hoverColor = '#424242'
//       updatedData.optionsColor = ['rgb(45, 29, 29)', 'rgb(10, 10, 25)', '#202020']
//       updatedData.component.bgColor = '#202020'
//     } else {
//       updatedData.button.textColor = 'black'
//       updatedData.button.bgColor = 'white'
//       updatedData.page.bgColor = '#e6e6e6'
//       updatedData.button.hoverColor = '#e6e6e6'
//       updatedData.optionsColor = ['pink', '#B6E0FE', 'rgb(205, 205, 205)']
//       updatedData.component.bgColor = 'rgb(205, 205, 205)'
//     }
//     this.update(updatedData)
//   }

//   public selecColor = (color: string) => {
//     const data = this.read()
//     if (data.optionsColor.includes(color)) {
//       const updatedData: IStyle = { ...data, component: { bgColor: color } }
//       this.update(updatedData)
//     }
//   }

//   public changeBorderRadius = (value: number) => {
//     const data = this.read()
//     const newValue: IStyle = { ...data, button: { ...data.button, borderRadius: `${value}px` } }
//     this.update(newValue)
//   }

//   public changeBoxShadown = (value: { color?: string; border?: number }) => {
//     const data = this.read()
//     const def = data.boxShadow.split(' ')
//     const defBorder = value.border || value.border === 0 ? value.border : parseFloat(def[3])
//     const defColor = value.color ? value.color : def[4]
//     const newValue: IStyle = {
//       ...data,
//       boxShadow: `0 0 0 ${defBorder}px ${defColor}`
//     }
//     this.update(newValue)
//   }
// }

// const lSroageStyle = () => new LStorage<IStyle>('style_local')

// export const styleStorage = () => new StyleStorage(lSroageStyle(), IStyleSchema, initialValue)
