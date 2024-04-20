// import { defineStore } from 'pinia'

// export type IAboutRoute =
//   | 'what-is'
//   | 'what-for'
//   | 'how-to-use'
//   | 'why-use'
//   | 'where-data-goes'
//   | 'how-to-create-account'

// export const useAbout = defineStore('about', () => {
//   const aboutRoutes = {
//     'what-is': '',
//     'what-for': '# Para que o site?',
//     'how-to-use': '# como usar',
//     'why-use': '# por que usar?',
//     'where-data-goes': '# Para onde as datas vao?',
//     'how-to-create-account': '# como criar uma conta?'
//   }

//   const findText = (route: string) => {
//     const x = Object.entries(aboutRoutes).filter((obj) => {
//       const key = obj[0]
//       return key === route
//     })
//     const value = x[0][1]
//     return value
//   }

//   return {
//     findText
//   }
// })
