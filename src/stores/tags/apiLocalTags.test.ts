import { describe, test, expect, beforeEach } from 'vitest'
import { TagsApiLocal } from './ApiLocalTags'

describe('ApiLocalCards', () => {
  const tagsApi = new TagsApiLocal()

  beforeEach(async () => {
    await tagsApi.deleteAll()
  })

  describe('create', () => {
    test('Cria com sucesso', async () => {
      const create = await tagsApi.createTag({ emoji: '💡', name: 'lampada' })

      expect(create).toBe(true)
    })

    test('Nao aceita emoji vazio', async () => {
      try {
        await tagsApi.createTag({ emoji: '', name: 'lampada' })
        const all = await tagsApi.readAllTags()
        console.log('deveria coisa a nterm', all)
      } catch (e) {
        if (e instanceof Error) {
          expect(e.message).toBe('Emoji não pode ser vazio')
        }
      }
    })

    test('Nao aceita emoji invalido', async () => {
      try {
        await tagsApi.createTag({ emoji: 'x', name: 'lampada' })
      } catch (e) {
        if (e instanceof Error) {
          expect(e.message).toBe('Emoji invalido')
        }
      }
    })

    test('Nao aceita emoji content com menos de 2 characteres', async () => {
      try {
        await tagsApi.createTag({ emoji: '💡', name: 'l' })
      } catch (e) {
        if (e instanceof Error) {
          expect(e.message).toBe('Tag precisa ter ao menos 2 characteres')
        }
      }
    })
  })

  describe('Create many tags', () => {
    test('Cria com sucesso', async () => {
      const create = await tagsApi.createManyTags([
        { emoji: '💡', name: 'lampada' },
        { emoji: '🐦', name: 'passarinho' }
      ])

      expect(create).toBe(true)
    })

    test('Falha com sucesso ao nao passar emoji', async () => {
      try {
        await tagsApi.createManyTags([
          { emoji: '', name: 'lampada' },
          { emoji: '🐦', name: 'passarinho' }
        ])
      } catch (e) {
        expect(e).instanceOf(Error)

        e instanceof Error && expect(e.message).toBe('Emoji não pode ser vazio')
      }
    })

    test('Falha com sucesso ao nao passar content', async () => {
      try {
        await tagsApi.createManyTags([
          { emoji: '💡', name: 'lampada' },
          { emoji: '🐦', name: '' }
        ])
      } catch (e) {
        expect(e).instanceOf(Error)

        e instanceof Error && expect(e.message).toBe('Tag precisa ter ao menos 2 characteres')
      }
    })
  })

  describe('read', () => {
    test('Le todas as tags com sucesso', async () => {
      await tagsApi.createTag({ emoji: '💡', name: 'lampada' })

      await tagsApi.createTag({ emoji: '🐦', name: 'passarinho' })

      const { tags } = await tagsApi.readAllTags()

      expect(tags.length).toBe(2)
      expect(tags[0][1]).toBe('lampada')
      expect(tags[0][0]).toBe('💡')
      expect(tags[1][1]).toBe('passarinho')
      expect(tags[1][0]).toBe('🐦')
    })
  })

  describe('read tag by name', () => {
    test('Le tag com sucesso', async () => {
      await tagsApi.createTag({ emoji: '🐦', name: 'passarinho' })

      const tag = await tagsApi.readTag('PasSarInho')

      expect(tag).toEqual(['🐦', 'passarinho'])
    })

    test('Retorna erro ao nao encontrar', async () => {
      try {
        await tagsApi.readTag('')
      } catch (e) {
        if (e instanceof Error) {
          expect(e.message).toBe('Tag nao encontrada')
        }
      }
    })
  })

  describe('Atualiza tag', () => {
    test('Atualiza com sucesso', async () => {
      await tagsApi.createTag({ emoji: '🐦', name: 'passarinho' })

      const { tags } = await tagsApi.readAllTags()

      expect(tags[0]).toEqual(['🐦', 'passarinho'])

      const updateTag = await tagsApi.updateTag({
        emoji: '🐦',
        name: 'mudando o texto',
        atualName: tags[0][1]
      })

      expect(updateTag).toBe(true)

      const { tags: allTags2 } = await tagsApi.readAllTags()

      expect(allTags2[0]).toEqual(['🐦', 'mudando o texto'])
    })

    test('Retorna erro ao nao encontar tag', async () => {
      try {
        await tagsApi.updateTag({
          emoji: '🐦',
          name: 'mudando o texto',
          atualName: 'tag inexistente'
        })
      } catch (e) {
        if (e instanceof Error) {
          expect(e.message).toBe('Tag nao encontrada')
        }
      }
    })
  })

  describe('Delete', () => {
    test('Deleta tag por name com sucesso', async () => {
      await tagsApi.createTag({ emoji: '🐦', name: 'passarinho' })

      const { tags } = await tagsApi.readAllTags()

      expect(tags.length).toBe(1)

      await tagsApi.deleteTag('passarinho')

      const { tags: readAll2 } = await tagsApi.readAllTags()

      expect(readAll2.length).toBe(0)
    })

    test('Retorna erro ao nao encontrar tag', async () => {
      try {
        await tagsApi.deleteTag('nao existe')
      } catch (e) {
        if (e instanceof Error) {
          expect(e.message).toBe('Tag nao encontrada')
        }
      }
    })
  })

  describe('DeleteAll tags', () => {
    test('Deleta todas tags sucesso', async () => {
      await tagsApi.createTag({ emoji: '🐦', name: 'passarinho' })

      await tagsApi.createTag({ emoji: '🐦', name: 'passarinho2' })

      const { tags } = await tagsApi.readAllTags()

      expect(tags.length).toBe(2)

      await tagsApi.deleteAll()

      const { tags: readAll2 } = await tagsApi.readAllTags()

      expect(readAll2.length).toBe(0)
    })
  })

  // describe('Filtro', () => {
  // })
})
