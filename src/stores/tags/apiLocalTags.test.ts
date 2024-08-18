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

  describe('read', () => {
    test('Le todas as tags com sucesso', async () => {
      await tagsApi.createTag({ emoji: '💡', name: 'lampada' })

      await tagsApi.createTag({ emoji: '🐦', name: 'passarinho' })

      const allTags = await tagsApi.readAllTags()

      expect(allTags.length).toBe(2)
      expect(allTags[0][1]).toBe('lampada')
      expect(allTags[0][0]).toBe('💡')
      expect(allTags[1][1]).toBe('passarinho')
      expect(allTags[1][0]).toBe('🐦')
    })

    test('Retorna lista vazia caso n haja tags', async () => {
      const allTags = await tagsApi.readAllTags()

      expect(allTags).toEqual([])
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

      const allTags = await tagsApi.readAllTags()

      expect(allTags[0]).toEqual(['🐦', 'passarinho'])

      const updateTag = await tagsApi.updateTag({
        emoji: '🐦',
        name: 'mudando o texto',
        atualName: allTags[0][1]
      })

      expect(updateTag).toBe(true)

      const allTags2 = await tagsApi.readAllTags()

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

      const readAll = await tagsApi.readAllTags()

      expect(readAll.length).toBe(1)

      await tagsApi.deleteTag('passarinho')

      const readAll2 = await tagsApi.readAllTags()

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

      const readAll = await tagsApi.readAllTags()

      expect(readAll.length).toBe(2)

      await tagsApi.deleteAll()

      const readAll2 = await tagsApi.readAllTags()

      expect(readAll2.length).toBe(0)
    })
  })

  describe('Filtro', () => {
    describe('Adicionar ao filtro', () => {
      test('Adicionar tags ao filtro', async () => {
        await tagsApi.createTag({ emoji: '🐦', name: 'passarinho' })

        const addInclude = await tagsApi.filter('includeTags').addToFilter('passarinho')

        expect(addInclude).toBe(true)
      })

      test('Adicionar tag de um lado remover do outro', async () => {
        await tagsApi.createTag({ emoji: '🐦', name: 'passarinho' })

        await tagsApi.filter('includeTags').addToFilter('passarinho')

        await tagsApi.filter('excludeTags').addToFilter('passarinho')

        const includeTags = await tagsApi.filter('includeTags').getTags()

        const excludeTags = await tagsApi.filter('excludeTags').getTags()

        expect(includeTags).toEqual([])
        expect(excludeTags).toEqual([['🐦', 'passarinho']])
      })

      test('Retorna erro ao não encontrar tag', async () => {
        try {
          await tagsApi.filter('includeTags').addToFilter('inexisteste')
        } catch (e) {
          if (e instanceof Error) {
            expect(e.message).toBe('Tag não encontrada')
          }
        }
      })
    })

    describe('Ler tags', () => {
      test('Ler todas as tags', async () => {
        const includeTags = await tagsApi.filter('includeTags').getTags()

        const excludeTags = await tagsApi.filter('excludeTags').getTags()

        expect(includeTags).toEqual([])
        expect(excludeTags).toEqual([])

        await tagsApi.createTag({ emoji: '🐦', name: 'passarinho' })

        await tagsApi.filter('includeTags').addToFilter('passarinho')

        const includeTags2 = await tagsApi.filter('includeTags').getTags()

        expect(includeTags2).toEqual([['🐦', 'passarinho']])
      })

      test('Ler tags as tags atualizadas', async () => {
        await tagsApi.createTag({ emoji: '🐦', name: 'passarinho' })

        await tagsApi.filter('includeTags').addToFilter('passarinho')

        const includeTags = await tagsApi.filter('includeTags').getTags()

        expect(includeTags).toEqual([['🐦', 'passarinho']])

        await tagsApi.deleteTag('passarinho')

        const includeTags2 = await tagsApi.filter('includeTags').getTags()

        expect(includeTags2).toEqual([])
      })
    })

    describe('Remover tag do filtro', () => {
      test('Remove com sucesso', async () => {
        await tagsApi.createTag({ emoji: '🐦', name: 'passarinho' })

        await tagsApi.filter('includeTags').addToFilter('passarinho')

        await tagsApi.filter('includeTags').removeToFilter('passarinho')

        const includeTags = await tagsApi.filter('includeTags').getTags()

        expect(includeTags).toEqual([])
      })

      test('Retorna erro ao passar tag invalida', async () => {
        try {
          await tagsApi.filter('includeTags').removeToFilter('tag invalida')
        } catch (e) {
          if (e instanceof Error) {
            expect(e.message).toBe('Tag não encontrada')
          }
        }
      })
    })

    describe('Deletar todas as tags de um filtro', () => {
      test('Deleta com sucesso', async () => {
        await tagsApi.createTag({ emoji: '🐦', name: 'passarinho' })

        await tagsApi.filter('includeTags').addToFilter('passarinho')

        await tagsApi.filter('includeTags').clear()

        const includeTags = await tagsApi.filter('includeTags').getTags()

        expect(includeTags).toEqual([])
      })
    })
  })
})
