import { describe, test, expect, beforeEach } from 'vitest'
import { Card, type ICard } from '../Card'

const mockCards = {
  sucess: {
    one: { id: '0', content: 'first', date: new Date(), tags: [] },
    two: { id: '1', content: 'second', date: new Date(), tags: [] },
    three: { id: '3', content: 'third', date: new Date(), tags: [] }
  },
  fail: {
    contentNumber: { id: '0', content: 1, date: new Date(), tags: [] },
    contentEmpty: { id: '0', content: '', date: new Date(), tags: [] }
  }
}

describe('Card', () => {
  describe('Create', () => {
    beforeEach(() => {
      localStorage.clear()
    })

    test('Cria um card com sucesso', () => {
      const card = new Card()

      const create = card.create(mockCards.sucess.one as ICard)

      const manualAcessLocalStorage = JSON.parse(localStorage.getItem(card.key)!)

      expect(create.data).toBe('created')
      expect(create.status).toBe(201)
      expect(manualAcessLocalStorage.length).toBe(1)
      expect(manualAcessLocalStorage[0].content).toBe('first')
    })
  })
})
