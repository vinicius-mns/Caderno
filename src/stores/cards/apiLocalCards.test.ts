import { describe, test, expect, beforeEach } from 'vitest'
import { CardsApiLocal } from './ApiLocalCards'
import type { Icard } from './Interfaces'

const cardObject1: Icard = {
  id: 'cardId',
  content: 'text content',
  date: new Date(),
  tags: [
    ['😁', 'tagId'],
    ['😁', 'tagId4']
  ]
}

const cardObject2: Icard = {
  id: 'cardId2',
  content: 'text content2',
  date: new Date(),
  tags: [
    ['😁', 'tagId'],
    ['😁', 'tagId2']
  ]
}

const cardObject3: Icard = {
  id: 'cardId3',
  content: 'text content3',
  date: new Date(),
  tags: [
    ['😁', 'tagId'],
    ['😁', 'tagId2'],
    ['😁', 'tagId3']
  ]
}

const cardObject4: Icard = {
  id: 'cardId4',
  content: 'text content3',
  date: new Date(),
  tags: [
    ['😁', 'tagId'],
    ['😁', 'tagId2'],
    ['😁', 'tagId3'],
    ['😁', 'tagId4']
  ]
}

describe('ApiLocalCards', () => {
  const apiCards = new CardsApiLocal()

  beforeEach(async () => {
    await apiCards.deleteAll()
  })

  describe('deleteAll', () => {
    test('deleta todos os cards com sucesso', async () => {
      await apiCards.create({ content: 'xx', tags: [['😁', 'tagId']] })

      const deleteAll = await apiCards.deleteAll()

      expect(deleteAll).toBe(true)
    })
  })

  describe('create', () => {
    test('cria card com sucesso', async () => {
      const createCard = await apiCards.create({
        content: cardObject1.content,
        tags: cardObject1.tags
      })

      expect(createCard).toBe(true)
    })

    test('nao cria card sem tags', async () => {
      try {
        await apiCards.create({ content: 'content', tags: [] })
      } catch (e) {
        expect(e).toBeInstanceOf(Error)

        e instanceof Error && expect(e.message).toBe('selecione ao menos 1 tag')
      }
    })

    test('nao cria card sem content', async () => {
      try {
        await apiCards.create({ content: '', tags: [['😁', 'tagId']] })
      } catch (e) {
        expect(e).toBeInstanceOf(Error)

        e instanceof Error && expect(e.message).toBe('card content não pode estar vazio')
      }
    })
  })

  describe('Create Many', () => {
    test('Cria varios cards com suesso', async () => {
      try {
        await apiCards.createMany([
          { content: cardObject1.content, tags: cardObject1.tags },
          { content: cardObject2.content, tags: cardObject2.tags }
        ])

        const allcards = await apiCards.read({ includeTags: [], excludeTags: [] })

        expect(allcards.length).toBe(2)
        expect(allcards[1].content).toBe(cardObject2.content)
      } catch (e) {
        expect(e).toBe('nao era para cair no bloco catch')
      }
    })

    test('Falha todos com sucesso, caso 1 esteja incorreto', async () => {
      try {
        await apiCards.createMany([
          { content: cardObject1.content, tags: cardObject1.tags },
          { content: '', tags: cardObject2.tags }
        ])

        await apiCards.read({ includeTags: [], excludeTags: [] })
      } catch (e) {
        expect(e).toBeInstanceOf(Error)

        e instanceof Error && expect(e.message).toBe('card content não pode estar vazio')
      }
    })
  })

  describe('read + filter', () => {
    test('ler cards com sucesso', async () => {
      await apiCards.create({ content: cardObject2.content, tags: cardObject2.tags })

      const readCards = await apiCards.read({ includeTags: [], excludeTags: [] })

      expect(readCards.length).toBe(1)

      expect(readCards[0].content).toBe(cardObject2.content)
    })

    test('filtrar por includeTag', async () => {
      await apiCards.create({ content: cardObject1.content, tags: cardObject1.tags })

      await apiCards.create({ content: cardObject2.content, tags: cardObject2.tags })

      await apiCards.create({ content: cardObject3.content, tags: cardObject3.tags })

      await apiCards.create({ content: cardObject4.content, tags: cardObject4.tags })

      const filterIncludeTags = await apiCards.read({
        includeTags: [cardObject1.tags[0][1]],
        excludeTags: []
      })

      expect(filterIncludeTags.length).toBe(4)

      expect(filterIncludeTags[0].content).toBe(cardObject1.content)

      expect(filterIncludeTags[1].content).toBe(cardObject2.content)

      expect(filterIncludeTags[2].content).toBe(cardObject3.content)

      expect(filterIncludeTags[3].content).toBe(cardObject4.content)
    })

    test('filtrar por excludeTag', async () => {
      await apiCards.create({ content: cardObject1.content, tags: cardObject1.tags })

      await apiCards.create({ content: cardObject2.content, tags: cardObject2.tags })

      await apiCards.create({ content: cardObject3.content, tags: cardObject3.tags })

      await apiCards.create({ content: cardObject4.content, tags: cardObject4.tags })

      const filterIncludeTags = await apiCards.read({
        includeTags: [],
        excludeTags: [cardObject3.tags[2][1]]
      })

      expect(filterIncludeTags.length).toBe(2)

      expect(filterIncludeTags[0].content).toBe(cardObject1.content)

      expect(filterIncludeTags[1].content).toBe(cardObject2.content)
    })

    test('filtrar por includeTags e excludeTags', async () => {
      await apiCards.create({ content: cardObject1.content, tags: cardObject1.tags })

      await apiCards.create({ content: cardObject2.content, tags: cardObject2.tags })

      await apiCards.create({ content: cardObject3.content, tags: cardObject3.tags })

      await apiCards.create({ content: cardObject4.content, tags: cardObject4.tags })

      const filterIncludeTags = await apiCards.read({
        includeTags: [cardObject4.tags[3][1]],
        excludeTags: [cardObject3.tags[2][1]]
      })

      expect(filterIncludeTags.length).toBe(1)

      expect(filterIncludeTags[0].content).toBe(cardObject1.content)
    })
  })

  describe('read by id', () => {
    test('ler com sucesso', async () => {
      await apiCards.create({ content: cardObject1.content, tags: cardObject1.tags })

      await apiCards.create({ content: cardObject2.content, tags: cardObject2.tags })

      await apiCards.create({ content: cardObject3.content, tags: cardObject3.tags })

      await apiCards.create({ content: cardObject4.content, tags: cardObject4.tags })

      const allCards = await apiCards.read({ includeTags: [], excludeTags: [] })

      const card2Id = allCards[1].id

      const card3Id = allCards[2].id

      const findCard2 = await apiCards.readOne(card2Id)

      const findCard3 = await apiCards.readOne(card3Id)

      expect(findCard2.content).toBe(cardObject2.content)

      expect(findCard2.content).toBe(cardObject2.content)

      expect(findCard3.content).toBe(cardObject3.content)

      expect(findCard3.content).toBe(cardObject3.content)
    })

    test('ler com sucesso', async () => {
      try {
        await apiCards.create({ content: cardObject1.content, tags: cardObject1.tags })

        await apiCards.create({ content: cardObject2.content, tags: cardObject2.tags })

        await apiCards.create({ content: cardObject3.content, tags: cardObject3.tags })

        await apiCards.create({ content: cardObject4.content, tags: cardObject4.tags })

        await apiCards.readOne('inexistentId')
      } catch (e) {
        if (e instanceof Error) {
          expect(e.message).toBe('not found')
        }
      }
    })
  })

  describe('updateTags', () => {
    test('Atualiza tags com sucesso', async () => {
      await apiCards.create({ content: 'card um', tags: [['😁', 'sorrindo']] })

      await apiCards.create({
        content: 'card dois',
        tags: [['😁', 'sorrindo']]
      })

      await apiCards.create({ content: 'card dois', tags: [['😐', 'neutro']] })

      const allcard = await apiCards.read({ includeTags: [], excludeTags: [] })

      const tagsInCard = allcard.map((card) => card.tags)

      expect(tagsInCard[0]).toEqual([['😁', 'sorrindo']])

      expect(tagsInCard[1]).toEqual([['😁', 'sorrindo']])

      expect(tagsInCard[2]).toEqual([['😐', 'neutro']])

      await apiCards.updateAllTags({ tag: ['😢', 'chorando'], name: 'sorrindo' })

      const newAllCards = await apiCards.read({ includeTags: [], excludeTags: [] })

      const newTagsInCard = newAllCards.map((card) => card.tags)

      expect(newTagsInCard[0]).toEqual([['😢', 'chorando']])

      expect(newTagsInCard[1]).toEqual([['😢', 'chorando']])

      expect(newTagsInCard[2]).toEqual([['😐', 'neutro']])
    })
  })

  describe('delete', () => {
    test('delete por id com sucesso', async () => {
      await apiCards.create({ content: cardObject1.content, tags: cardObject1.tags })

      const allcard = await apiCards.read({ includeTags: [], excludeTags: [] })

      const cardId = allcard[0].id

      expect(allcard.length).toBe(1)

      const deleteCard = await apiCards.delete(cardId)

      const allCardsAfterDelete = await apiCards.read({ includeTags: [], excludeTags: [] })

      expect(deleteCard).toBe(true)

      expect(allCardsAfterDelete.length).toBe(0)
    })
  })
})
