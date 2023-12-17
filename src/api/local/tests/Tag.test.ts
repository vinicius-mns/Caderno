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

    test('Falha com sucesso', () => {
      const tag = new Tags()

      const createMin = tag.create('a')
      const createMax = tag.create('asdfghjklasdfghjklsdfgjklwertyui')
      const createNumber = tag.create(2 as unknown as string)

      expect(createMin.status).toBe(400)
      expect(createMin.data).toBe(
        '{"issues":[{"code":"too_small","minimum":3,"type":"string","inclusive":true,"exact":false,"message":"String must contain at least 3 character(s)","path":[]}],"name":"ZodError"}'
      )

      expect(createMax.status).toBe(400)
      expect(createMax.data).toBe(
        '{"issues":[{"code":"too_big","maximum":25,"type":"string","inclusive":true,"exact":false,"message":"String must contain at most 25 character(s)","path":[]}],"name":"ZodError"}'
      )

      expect(createNumber.status).toBe(400)
      expect(createNumber.data).toBe(
        '{"issues":[{"code":"invalid_type","expected":"string","received":"number","path":[],"message":"Expected string, received number"}],"name":"ZodError"}'
      )
    })
  })
})
