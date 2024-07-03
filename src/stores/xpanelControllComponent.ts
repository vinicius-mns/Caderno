// import { defineStore } from 'pinia'
// import { reactive } from 'vue'

// export const usePanelControllComponent = defineStore('panel controll component', () => {
//   const value = reactive({
//     xPosition: {
//       value: '40dvw',
//       set: (v: string) => (value.xPosition.value = v)
//     },
//     yPosition: {
//       value: '35dvh',
//       set: (v: string) => (value.yPosition.value = v)
//     },
//     height: {
//       value: '60dvh',
//       set: (v: string) => (value.height.value = v)
//     },
//     width: {
//       value: '360px',
//       set: (v: string) => (value.width.value = v)
//     },
//     minimize: {
//       value: false,
//       set: (v: boolean) => (value.minimize.value = v)
//     },
//     handleMinimize: () => {
//       value.minimize.set(true)
//       value.height.set('50px')
//       value.width.set('50px')
//       value.xPosition.set('30px')
//       value.yPosition.set('calc(100dvh - 60px)')
//     },
//     handleMaxmize: () => {
//       value.minimize.set(false)
//       value.height.set('60dvh')
//       value.width.set('360px')
//       value.xPosition.set('40dvw')
//       value.yPosition.set('30dvh')
//     }
//   })

//   return value
// })
