import z from 'zod'
import type { DB_CRUD, IGenerateID, WithID } from '../interfaces'

export class Api_localStorage_as_db<T extends WithID> implements DB_CRUD<T> {
  constructor(
    public key: string,
    protected _schema: z.AnyZodObject,
    // protected _initialValue: T[],
    protected _generateID: IGenerateID
  ) {}

  protected _validationSchema(ent: T): void {
    const verify = this._schema.safeParse(ent)
    if (!verify.success) {
      const erros = () => {
        const zodErrors = JSON.parse(verify.error.message)
        const minimizeErrors = zodErrors.map((e: { path: string; message: string }) => {
          return { where: e.path, message: e.message }
        })
        return JSON.stringify(minimizeErrors) + JSON.stringify(ent)
      }
      throw new Error(erros())
    }
  }

  protected _insertId(ent: T): T {
    const entiteWithId: T = { ...ent, id: this._generateID.generate() }
    return entiteWithId
  }

  public create(entDb: T[]): void {
    entDb.forEach((ent) => this._validationSchema(ent))
    try {
      localStorage.setItem(this.key, JSON.stringify(entDb))
    } catch (e) {
      const name = 'erro ao criar db'
      throw new Error(JSON.stringify({ name, error: e }))
    }
  }

  public read(): T[] {
    try {
      const data = localStorage.getItem(this.key)
      if (!data) throw new Error('not found')
      return JSON.parse(data) as T[]
    } catch (e) {
      // this.create(this._initialValue)
      return [] as T[]
    }
  }

  public update(entDb: T[]): void {
    entDb.forEach((ent) => this._validationSchema(ent))
    try {
      localStorage.setItem(this.key, JSON.stringify(entDb))
    } catch (e) {
      const name = 'erro ao atualizar db'
      throw new Error(JSON.stringify({ name, error: e }))
    }
  }

  public delete(): void {
    try {
      localStorage.removeItem(this.key)
    } catch (e) {
      const name = 'erro ao deletar db'
      throw new Error(JSON.stringify({ name, error: e }))
    }
  }

  public createOne(ent: T): void {
    this._validationSchema(ent)
    const entites = this.read()
    const entiteWithId = this._insertId(ent)
    const newEntites = [...entites, entiteWithId]
    this.create(newEntites)
    // try {
    // } catch (e) {
    //   const name = 'erro ao criar entidade'
    //   const errorMessage = e instanceof Error && e.message
    //   throw new Error(JSON.stringify({ name, error: errorMessage }))
    // }
  }

  public readOne(id: string): T {
    const name = 'erro ao capturar entidade'
    try {
      const data = this.read()
      const entFilter = data.filter((ent) => ent.id === id)
      if (entFilter.length === 0) throw new Error(JSON.stringify({ name, error: 'not found' }))
      return entFilter[0]
    } catch (e) {
      throw new Error(JSON.stringify({ name, error: e }))
    }
  }

  public updateOne(id: string, ent: T): void {
    this.readOne(id)
    this._validationSchema(ent)
    try {
      const data = this.read()
      const otherEntities = data.filter((ent) => ent.id !== id)
      const newData = [...otherEntities, ent]
      this.update(newData)
    } catch (e) {
      const name = 'erro ao atualizar entidade'
      throw new Error(JSON.stringify({ name, error: e }))
    }
  }

  public deleteOne(id: string) {
    this.readOne(id)
    try {
      const data = this.read()
      const newData = data.filter((ent) => ent.id !== id)
      this.update(newData)
    } catch (e) {
      const name = 'erro ao deletar entidade'
      throw new Error(JSON.stringify({ name, error: e }))
    }
  }
}
