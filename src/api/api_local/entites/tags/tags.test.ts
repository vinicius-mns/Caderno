import { describe, test, expect, beforeEach } from 'vitest'
import { tagsLocalDb } from './Tags_api'

describe('tags_api', () => {
  describe('valor inicial', () => {
    const tags = tagsLocalDb()
    const all = tags.read()
    console.log(all)
    expect(all.length).toBe(1)
  })
})
