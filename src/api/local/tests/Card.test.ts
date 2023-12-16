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

    test('Falha com sucesso ao criar card incorreto', () => {
      const card = new Card()

      const contentIsNumber = card.create(mockCards.fail.contentNumber as unknown as ICard)
      const contentIsEmpty = card.create(mockCards.fail.contentEmpty as unknown as ICard)

      const manualAcessLocalStorage = JSON.parse(localStorage.getItem(card.key)!)

      expect(contentIsNumber.status).toBe(400)
      expect(contentIsEmpty.status).toBe(400)
      expect(manualAcessLocalStorage).toBe(null)
    })
  })

  describe('ReadOne', () => {
    beforeEach(() => {
      localStorage.clear()
    })

    test('Le um card com sucesso', () => {
      const card = new Card()

      // adicionar cards no localStorage
      card.create(mockCards.sucess.one)
      card.create(mockCards.sucess.two)

      // acesso manual ao localStorage
      const manualAcessLocalStorage = JSON.parse(localStorage.getItem(card.key)!)

      expect(manualAcessLocalStorage.length).toBe(2)

      // percorre o array de cards
      // para cada card, captura o id, chama a funcao finOne pelo id, e compara as informacoes
      manualAcessLocalStorage.forEach((c: ICard) => {
        const readCard = card.readOne(c.id)
        const data = JSON.parse(readCard.data!)
        const status = readCard.status

        expect(data.content).toBe(c.content)
        expect(data.id).toBe(c.id)
        expect(status).toBe(200)
      })
    })
  })
})
