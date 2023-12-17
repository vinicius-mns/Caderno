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

    test('Falha com sucesso ao passar card inexistente', () => {
      const card = new Card()

      const fakeId = '000001'
      const readCard = card.readOne(fakeId)

      expect(readCard.status).toBe(404)
      expect(readCard.data).toBe('not found')
    })
  })

  describe('readAll', () => {
    beforeEach(() => {
      localStorage.clear()
    })

    test('Retorna todos com sucesso', () => {
      const card = new Card()

      // adicionar cards no localStorage
      card.create(mockCards.sucess.one)
      card.create(mockCards.sucess.two)

      const all = card.readAll()

      expect(all.status).toBe(200)
      expect(JSON.parse(all.data).length).toBe(2)
      expect(JSON.parse(all.data)[0].content).toBe(mockCards.sucess.one.content)
    })

    test('Retorna card inicial, caso nenhum criado', () => {
      const card = new Card()

      const all = card.readAll()

      expect(all.status).toBe(200)
      expect(JSON.parse(all.data).length).toBe(1)
      expect(JSON.parse(all.data)[0].id).toBe('0')
    })
  })

  describe('Update', () => {
    beforeEach(() => {
      localStorage.clear()
    })

    test('Atualiza com sucesso', () => {
      const card = new Card()

      // adicionar cards no localStorage
      card.create(mockCards.sucess.one)
      card.create(mockCards.sucess.two)
      card.create(mockCards.sucess.three)

      // capturando primeiro card
      const fistCard = JSON.parse(localStorage.getItem(card.key)!)[0] as ICard

      // atailizando
      const update = card.update(fistCard, { ...fistCard, content: 'updateContent' })

      // capturando primeiro card novamente
      const fistCardUpdate = JSON.parse(localStorage.getItem(card.key)!)[0] as ICard

      expect(fistCard.content).toBe(mockCards.sucess.one.content)
      expect(fistCardUpdate.content).toBe('updateContent')
      expect(update.status).toBe(200)
    })

    test('Retorna erro com sucesso ao passar card com id inexistente', () => {
      const card = new Card()

      // adicionar cards no localStorage
      card.create(mockCards.sucess.one)
      card.create(mockCards.sucess.two)

      const errorCard: ICard = { id: 'error', content: 'first', date: new Date(), tags: [] }

      const update = card.update(errorCard, { ...errorCard, content: 'new' })

      expect(update.status).toBe(404)
      expect(update.data).toBe('not found Card')
    })
  })

  describe('Delete', () => {
    beforeEach(() => {
      localStorage.clear()
    })

    test('Deleta um card com sucesso', () => {
      const card = new Card()

      // adicionar cards no localStorage
      card.create(mockCards.sucess.one)
      card.create(mockCards.sucess.two)
      card.create(mockCards.sucess.three)

      const cardsLocalStorage = JSON.parse(localStorage.getItem(card.key)!) as ICard[]

      const secondCard = cardsLocalStorage[1]
      const removeSecondCard = card.delete(secondCard.id)

      const cardsLocalStorageUpdated = JSON.parse(localStorage.getItem(card.key)!) as ICard[]

      expect(cardsLocalStorage.length).toBe(3)
      expect(removeSecondCard.status).toBe(200)
      expect(cardsLocalStorageUpdated.length).toBe(2)
    })

    test('Retorna erro com sucesso ao passar id inexistente', () => {
      const card = new Card()

      // adicionar cards no localStorage
      card.create(mockCards.sucess.one)
      card.create(mockCards.sucess.two)
      card.create(mockCards.sucess.three)

      const cardsLocalStorage = JSON.parse(localStorage.getItem(card.key)!) as ICard[]

      const removeSecondCard = card.delete('error')

      const cardsLocalStorageUpdated = JSON.parse(localStorage.getItem(card.key)!) as ICard[]

      expect(cardsLocalStorage.length).toBe(3)
      expect(removeSecondCard.status).toBe(404)
      expect(removeSecondCard.data).toBe('not found')
      expect(cardsLocalStorageUpdated.length).toBe(3)
    })
  })
})
