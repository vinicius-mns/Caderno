// import { describe, test, expect, beforeEach } from 'vitest'
// import { createPinia } from 'pinia'
// import { setActivePinia } from 'pinia'
// import { useStyleGlobal } from './style'
// describe('Estilo global', () => {
//   beforeEach(() => {
//     setActivePinia(createPinia())
//   })

//   describe('Iniciar estilo', () => {
//     test('Inicia com sucesso', () => {
//       const styleStore = useStyleGlobal()
//       localStorage.getItem(styleStore.keyStorage)

//       expect(localStorage.getItem(styleStore.keyStorage)).toBe(JSON.stringify({ color: 'red' }))
//       expect(styleStore.style.color).toBe('red')
//     })
//   })
//   describe('Alterar cor', () => {
//     test('Altera com sucesso', () => {
//       const styleStore = useStyleGlobal()
//       styleStore.changeColor('blue')

//       expect(styleStore.style.color).toBe('blue')
//     })
//     test('Erro ao passar valor invalido', () => {
//       const styleStore = useStyleGlobal()
//       localStorage.getItem(styleStore.keyStorage)
//       styleStore.changeColor(2 as unknown as string)

//       expect(styleStore.style.color).toBe('red')
//     })
//   })
// })
