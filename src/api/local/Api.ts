import type { BaseApi } from './BaseApi'

export class Api<T> implements BaseApi<T> {
  /**
   * @constructor
   * @param {string} key - A chave para a API.
   * @param {z.AnyZodObject} _schema - O esquema a ser usado.
   * @param {Function} [_idGenetate=uuidv4] - A função para gerar o ID.
   * @param {Function} [_response=response] - A função para gerar a resposta.
   */
  constructor(
    public key: string,
    private _schema: z.AnyZodObject,
    private _idGenetate: Function = uuidv4,
    private _response: Function = response
  ) {}

  /**
   * Verifica se as regras de negocio correspondem
   * @param ent entitdade a ser veficada
   */
  private _validationSchema(ent: T) {
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

  /**
   * Cria uma entidade caso nao exista ou insira caso exista
   * @param ent entidade a ser criada ou adicionada
   */
  private _addOrInsertInLocalStorage(ent: T) {
    const storage = localStorage.getItem(this.key)

    if (!storage) {
      const entity = JSON.stringify([ent])

      localStorage.setItem(this.key, entity)
    } else {
      const atualEntity = JSON.parse(storage)
      const entity = JSON.stringify([...atualEntity, ent])

      localStorage.setItem(this.key, entity)
    }
  }

  public create(ent: T): IResponse {
    const entity = {
      ...ent,
      id: this._idGenetate(),
      date: new Date()
    }

    try {
      this._validationSchema(ent)

      this._addOrInsertInLocalStorage(entity)

      return this._response(201, 'created')
    } catch (e) {
      if (e instanceof Error) return this._response(400, e.message)
      return this._response(400, 'erro inesperado')
    }
  }

  public readOne(UnicId: string): IResponse {
    const storage = localStorage.getItem(this.key)

    if (!storage) return this._response(404, 'not found')

    const all = JSON.parse(storage) as { id: string }[]

    const find = all.find(({ id }) => id === UnicId)

    if (!find) return this._response(404, 'not found')

    return this._response(200, find)
  }

  public readAll(): IResponse {
    const storage = localStorage.getItem(this.key)

    if (!storage) return this._response(200, JSON.stringify([]))

    return this._response(200, storage)
  }

  public update(UnicId: string, newEnt: T): IResponse {
    try {
      this._validationSchema(newEnt)

      const storage = localStorage.getItem(this.key)

      if (!storage) return this._response(404, 'not found')

      const all = JSON.parse(storage) as T & { id: string }[]

      const index = all.findIndex(({ id }) => id === UnicId)

      if (index === -1) return this._response(404, 'not found')

      const entity = { ...all[index], ...newEnt }

      all[index] = entity

      localStorage.setItem(this.key, JSON.stringify(all))

      return this._response(200, 'updated')
    } catch (e) {
      if (e instanceof Error) return this._response(400, e.message)
      return this._response(400, 'erro inesperado')
    }
  }

  public delete(id: string): IResponse {
    const storage = localStorage.getItem(this.key)

    if (!storage) return this._response(404, 'not found')

    const all = JSON.parse(storage) as T & { id: string }[]

    const newStorage = all.filter((entity) => entity.id !== id)

    if (all.length === newStorage.length) return this._response(404, 'not found')

    localStorage.setItem(this.key, JSON.stringify(newStorage))

    return this._response(200, 'deleted')
  }
}
