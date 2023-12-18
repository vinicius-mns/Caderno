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

    test('Falha com sucesso ao passar entidade invalida', () => {
      const apiExample = myApiExample()

      const create1 = apiExample.create({ content: '', number: 1 })

      expect(create1.status).toBe(400)
      expect(create1.data).toBe(
        '[{"where":["content"],"message":"String must contain at least 3 character(s)"}]'
      )
    })

    test('Falha com sucesso ao passar varias propriedades de uma entidade invalida', () => {
      const apiExample = myApiExample()

      const create1 = apiExample.create({ content: '', number: '1' as unknown as number })

      expect(create1.status).toBe(400)
      expect(create1.data).toBe(
        '[{"where":["number"],"message":"Expected number, received string"},{"where":["content"],"message":"String must contain at least 3 character(s)"}]'
      )
    })
  })

  describe('ReadOne', () => {
    beforeEach(() => {
      localStorage.clear()
    })

    test('Le um com sucesso', () => {
      const apiExample = myApiExample()

      apiExample.create({ content: 'its work1', number: 1 })
      apiExample.create({ content: 'its work2', number: 2 })
      apiExample.create({ content: 'its work3', number: 3 })

      const all = JSON.parse(localStorage.getItem(apiExample.key)!) as IMyApiExample[]

      const id2 = all[1].id

      const find2 = apiExample.readOne(id2!)
      const data2 = find2.data as unknown as IMyApiExample

      expect(find2.status).toBe(200)
      expect(data2.content).toBe('its work2')
    })

    test('Fala ao passar id inexistente', () => {
      const apiExample = myApiExample()

      const fakeId = '1234'

      const find2 = apiExample.readOne(fakeId)
      const data2 = find2.data as unknown as IMyApiExample

      expect(find2.status).toBe(404)
      expect(find2.data).toBe('not found')
      expect(data2.content).toBe(undefined)
    })
  })
})
