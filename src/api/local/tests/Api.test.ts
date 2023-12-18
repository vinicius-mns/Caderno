import { describe, test, expect, beforeEach } from 'vitest'
import { myApiExample, type IMyApiExample } from './myApiExemple'

describe('Testando a Api - base', () => {
  describe('Create', () => {
    beforeEach(() => {
      localStorage.clear()
    })

    test('Cria um com sucesso', () => {
      const apiExample = myApiExample()

      const create = apiExample.create({ content: 'its work', number: 1 })

      expect(create.status).toBe(201)
    })

    test('Cria varios com sucesso', () => {
      const apiExample = myApiExample()

      const create1 = apiExample.create({ content: 'its work1', number: 1 })
      const create2 = apiExample.create({ content: 'its work2', number: 2 })
      const create3 = apiExample.create({ content: 'its work3', number: 3 })
      const create4 = apiExample.create({ content: 'its work4', number: 4 })

      const storage = JSON.parse(localStorage.getItem(apiExample.key)!) as IMyApiExample[]

      expect(create1.status).toBe(201)
      expect(create2.status).toBe(201)
      expect(create3.status).toBe(201)
      expect(create4.status).toBe(201)
      expect(storage.length).toBe(4)
      expect(storage[3].content).toBe('its work4')
    })
  })
})
