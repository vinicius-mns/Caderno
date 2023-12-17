import { beforeEach, describe, test, expect } from 'vitest'
import { Tags } from '../Tag'

describe('Tags', () => {
  describe('Create', () => {
    beforeEach(() => {
      localStorage.clear()
    })

    test('Cria com sucesso', () => {
      const tag = new Tags()

      const createTag = tag.create('first')
      const createTag2 = tag.create('second')

      const tags = JSON.parse(localStorage.getItem(tag.key)!)

      expect(tags.length).toBe(2)
      expect(createTag.status).toBe(201)
      expect(createTag2.status).toBe(201)
      expect(tags[0]).toBe('first')
      expect(tags[1]).toBe('second')
    })
  })
})
