import { describe, test, expect, beforeEach } from 'vitest'
import { Card, type ICard } from '../Card'

const mockCards = {
  sucess: {
    one: { id: '0', content: 'first', date: new Date(), tags: [] },
    two: { id: '1', content: 'second', date: new Date(), tags: [] },
    three: { id: '3', content: 'third', date: new Date(), tags: [] }
  },
  fail: {
    contentNumber: { id: '0', content: 'first', date: new Date(), tags: [] },
    contentEmpty: { id: '0', content: 'second', date: new Date(), tags: [] }
  }
}

describe('Card', () => {
})
