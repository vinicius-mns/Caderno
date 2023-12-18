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

    if (!verify.success) throw new Error(JSON.stringify(verify.error))
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
}
