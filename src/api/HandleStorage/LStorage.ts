import type { CRUD } from './ApiBase'

export class LStorage<T> implements CRUD<T> {
  constructor(public key: string) {}

  public create(ent: T) {
    try {
      localStorage.setItem(this.key, JSON.stringify(ent))
    } catch (e) {
      throw new Error(JSON.stringify(e))
    }
  }

  public read() {
    try {
      const data = localStorage.getItem(this.key)
      if (!data) throw new Error('not found')
      return JSON.parse(data) as T
    } catch (e) {
      throw new Error(JSON.stringify(e))
    }
  }

  public update(ent: T) {
    try {
      localStorage.setItem(this.key, JSON.stringify(ent))
    } catch (e) {
      throw new Error(JSON.stringify(e))
    }
  }

  public delete() {
    try {
      localStorage.removeItem(this.key)
    } catch (e) {
      throw new Error(JSON.stringify(e))
    }
  }
}
