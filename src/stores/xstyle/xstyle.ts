// import LocalStorageApi from '@/myLocalStorage/LocalStorageApi'
// import { defineStore } from 'pinia'
// import { reactive } from 'vue'

// export type Ikey = string

// interface IColor {
//   name: string
//   text: string
//   back: string
//   front: string
//   hover: string
//   border: string
// }

// interface IBorderRadius {
//   outside: string
//   inside: string
// }

// export interface IStyle {
//   color: IColor
//   borderRadius: IBorderRadius
// }

// export const colorsList: IColor[] = [
//   {
//     name: 'Escuro',
//     text: 'white',
//     back: '#0d1117',
//     front: '#161b22',
//     hover: '#21262d',
//     border: '#262b32'
//   },
//   {
//     name: 'Claro',
//     text: 'black',
//     back: '#ECECF1',
//     front: 'white',
//     hover: '#E0E0E7',
//     border: '#CBCBE0'
//   },
//   {
//     name: 'Google dark',
//     text: 'white',
//     back: '#202124',
//     front: '#303134',
//     hover: '#4B4B4D',
//     border: '#3C3E42'
//   }
// ]

// const borderRadius: IBorderRadius = {
//   outside: '10px',
//   inside: '8px'
// }

// const keyStorage = 'my_style'
// const defaultStyle: IStyle = { color: colorsList[0], borderRadius }

// const styleStorage = new LocalStorageApi<IStyle>(defaultStyle, keyStorage)

// export const useStyleGlobal = defineStore('style-global-2', () => {
//   const value = reactive<IStyle>(styleStorage.read())

//   const changeColor = (name: string) => {
//     const newColor = colorsList.find((color) => color.name === name)
//     newColor && (value.color = newColor)
//     styleStorage.setAndReturn(value)
//   }

//   return {
//     keyStorage,
//     value,
//     changeColor
//   }
// })
