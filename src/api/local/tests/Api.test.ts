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
      const data2 = JSON.parse(find2.data) as unknown as IMyApiExample

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

  describe('ReadAll', () => {
    beforeEach(() => {
      localStorage.clear()
    })

    test('Le todos com sucesso', () => {
      const apiExample = myApiExample()

      apiExample.create({ content: 'its work1', number: 1 })
      apiExample.create({ content: 'its work2', number: 2 })

      const all = apiExample.readAll()

      expect(all.status).toBe(200)
      expect(JSON.parse(all.data).length).toBe(2)
    })

    test('Retornar array vazio caso nenhum criado', () => {
      const apiExample = myApiExample()

      const all = apiExample.readAll()

      expect(all.status).toBe(200)
      expect(JSON.parse(all.data).length).toBe(0)
    })
  })

  describe('Update', () => {
    beforeEach(() => {
      localStorage.clear()
    })

    test('Atualiza com sucesso', () => {
      const apiExample = myApiExample()

      apiExample.create({ content: 'its work1', number: 1 })
      apiExample.create({ content: 'its work2', number: 2 })

      const all = JSON.parse(localStorage.getItem(apiExample.key)!) as IMyApiExample[]

      const seconde = all[1]

      const update = apiExample.update(seconde.id!, {
        content: 'updated sucess',
        number: 9
      })

      const allUpdated = JSON.parse(localStorage.getItem(apiExample.key)!) as IMyApiExample[]

      expect(update.status).toBe(200)
      expect(all[1].content).toBe('its work2')
      expect(allUpdated[1].content).toBe('updated sucess')
      expect(all[1].id === allUpdated[1].id).toBe(true)
    })

    test('Falha com sucesso', () => {
      const apiExample = myApiExample()

      apiExample.create({ content: 'abcd', number: 1 })

      const fakeId = '123'
      const updateErrorId = apiExample.update(fakeId, { content: 'aaa', number: 1 })

      const entity = JSON.parse(localStorage.getItem(apiExample.key)!)[0] as IMyApiExample
      const updateErrorEntity = apiExample.update(entity.id!, { content: '', number: 1 })

      expect(updateErrorId.status).toBe(404)
      expect(updateErrorId.data).toBe('not found')

      expect(updateErrorEntity.status).toBe(400)
      expect(updateErrorEntity.data).toBe(
        '[{"where":["content"],"message":"String must contain at least 3 character(s)"}]'
      )
    })
  })

  describe('Delete', () => {
    beforeEach(() => {
      localStorage.clear()
    })

    test('Deleta com sucesso', () => {
      const apiExample = myApiExample()

      apiExample.create({ content: 'its work1', number: 1 })
      apiExample.create({ content: 'its work2', number: 2 })

      const all = JSON.parse(localStorage.getItem(apiExample.key)!) as IMyApiExample[]

      const deleteSecond = apiExample.delete(all[1].id!)

      const allUpdated = JSON.parse(localStorage.getItem(apiExample.key)!) as IMyApiExample[]

      expect(all.length).toBe(2)
      expect(allUpdated.length).toBe(1)
      expect(deleteSecond.status).toBe(200)
      expect(deleteSecond.data).toBe('deleted')
    })

    test('Falha com sucesso', () => {
      const apiExample = myApiExample()

      apiExample.create({ content: 'its work1', number: 1 })
      apiExample.create({ content: 'its work2', number: 2 })

      const all = JSON.parse(localStorage.getItem(apiExample.key)!) as IMyApiExample[]

      const deleteSecond = apiExample.delete('fakeID')

      const allUpdated = JSON.parse(localStorage.getItem(apiExample.key)!) as IMyApiExample[]

      expect(all.length).toBe(2)
      expect(allUpdated.length).toBe(2)
      expect(deleteSecond.status).toBe(404)
      expect(deleteSecond.data).toBe('not found')
    })
  })
})
