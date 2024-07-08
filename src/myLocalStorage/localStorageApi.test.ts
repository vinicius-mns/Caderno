import { describe, test, expect } from 'vitest'
import LocalStorageApi from './LocalStorageApi'

describe('LocalStorageApi', () => {
  test('inicia com sucesso', () => {
    const value = { name: 'nome qualquer', age: 100 }
    const key = 'user'

    const user = new LocalStorageApi(value, key)
    expect(user.read()).toEqual(value)
  })

  test('Atualiza com sucesso', () => {
    const value = { name: 'nome qualquer', age: 100 }
    const newValue = { name: 'outro nome', age: 200 }
    const key = 'user'

    const user = new LocalStorageApi(value, key)

    expect(user.setAndReturn(newValue)).toEqual(newValue)
  })

  test('Le com sucesso', () => {
    const value = { name: 'nome qualquer', age: 100 }
    const newValue = { name: 'outro nome', age: 200 }
    const key = 'user'

    const user = new LocalStorageApi(value, key)
    user.setAndReturn(newValue)

    expect(user.read()).toEqual(newValue)
  })

  test('Limpa com sucesso', () => {
    const value = { name: 'nome qualquer', age: 100 }
    const newValue = { name: 'outro nome', age: 200 }
    const key = 'user'

    const user = new LocalStorageApi(value, key)
    user.setAndReturn(newValue)
    user.clear()

    expect(user.read()).toEqual(value)
  })
})
