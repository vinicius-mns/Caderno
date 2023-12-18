import type { BaseApi } from './BaseApi'

export class Api<T> implements BaseApi<T> {
  constructor(
    public key: string,
    private _schema: z.AnyZodObject,
    private _idGenetate = uuidv4,
    private _response = response
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
}
