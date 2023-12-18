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
  })
})
