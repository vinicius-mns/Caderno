import { z } from 'zod'
import { type CRUD } from '../interfaces'

export class Api_localStorage<T> implements CRUD<T> {
  constructor(
    public key: string,
    protected _schema: z.AnyZodObject,
    protected _initialValue: T
  ) {}

  protected _validationSchema(ent: T) {
    const verify = this._schema.safeParse(ent)
    if (!verify.success) {
      const erros = () => {
        const zodErrors = JSON.parse(verify.error.message)
        const minimizeErrors = zodErrors.map((e: { path: string; message: string }) => {
          return { where: e.path, message: e.message }
        })
        return JSON.stringify(minimizeErrors)
      }
      throw new Error(erros())
    }
  }

  public create(ent: T): void {
    try {
      this._validationSchema(ent)
      localStorage.setItem(this.key, JSON.stringify(ent))
    } catch (e) {
      const name = 'erro ao criar nova entidade'
      throw new Error(JSON.stringify({ name, error: e }))
    }
  }

  public read(): T {
    try {
      const data = localStorage.getItem(this.key)
      if (!data) throw new Error('not found')
      return JSON.parse(data) as T
    } catch (e) {
      this.create(this._initialValue)
      return this.read()
    }
  }

  public update(ent: T): void {
    try {
      this._validationSchema(ent)
      localStorage.setItem(this.key, JSON.stringify(ent))
    } catch (e) {
      const name = 'erro ao atualizar nova entidade'
      throw new Error(JSON.stringify({ name, error: e }))
    }
  }

  public delete() {
    try {
      localStorage.removeItem(this.key)
    } catch (e) {
      const name = 'erro ao deletar entidade'
      throw new Error(JSON.stringify({ name, error: e }))
    }
  }
}
