import { z } from 'zod'

export interface CRUD<T> {
  create: (ent: T) => void
  read: () => T
  update: (ent: T) => void
  delete: () => void
}

export class ApiBase<T> {
  constructor(
    public api: CRUD<T>,
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
    console.log('chamado')
    try {
      this._validationSchema(ent)
      this.api.create(ent)
    } catch (e) {
      const name = 'erro ao criar nova entidade'
      throw new Error(JSON.stringify({ name, error: e }))
    }
  }

  public read(): T {
    try {
      return this.api.read()
    } catch (e) {
      this.create(this._initialValue)
      return this.read()
    }
  }

  public update(ent: T): void {
    try {
      this._validationSchema(ent)
      this.api.update(ent)
    } catch (e) {
      const name = 'erro ao atualizar nova entidade'
      throw new Error(JSON.stringify({ name, error: e }))
    }
  }

  public delete() {
    try {
      this.api.delete()
    } catch (e) {
      const name = 'erro ao deletar entidade'
      throw new Error(JSON.stringify({ name, error: e }))
    }
  }
}
