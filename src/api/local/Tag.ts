import type { BaseApi, IResponse } from './BaseApi'
import { z } from 'zod'

const TagSchema = z.string().min(3).max(25)

export type ITag = z.infer<typeof TagSchema>

export class Tags implements BaseApi<ITag> {
  public key = 'Tags_local'

  constructor(private _schema = TagSchema) {}

  /**
   * Verifica se as regras de negocio correspondem
   * @param tag Tag a ser veficada
   */
  private _validationSchema(tag: ITag) {
    const verify = this._schema.safeParse(tag)

    if (!verify.success) {
      throw new Error(JSON.stringify(verify.error))
    }
  }

  /**
   * Cria uma tag caso nao exista ou insira caso exista no localStorage
   * @param tag Tag a ser criada ou adicionada
   */
  private _addOrInsertInLocalStorage(tag: ITag) {
    const storage = localStorage.getItem(this.key)

    if (!storage) {
      const tags = JSON.stringify([tag])

      localStorage.setItem(this.key, tags)
    } else {
      const atualTags = JSON.parse(storage)
      const tags = JSON.stringify([...atualTags, tag])

      localStorage.setItem(this.key, tags)
    }
  }

  public create(ent: string): IResponse {
    try {
      this._validationSchema(ent)

      this._addOrInsertInLocalStorage(ent)

      return { status: 201, data: 'created' }
    } catch (e) {
      if (e instanceof Error) return { status: 400, data: e.message }

      return { status: 400, data: 'erro inesperado ao criar' }
    }
  }

  public readOne(id: string): IResponse {
    return { status: 200, data: id }
  }

  public readAll(): IResponse {
    const tags = localStorage.getItem(this.key)

    if (!tags) {
      return { status: 404, data: 'not found tags' }
    }

    return { status: 200, data: tags }
  }

  public update(ent: string, newEnt: string): IResponse {
    return { status: 200, data: JSON.stringify([ent, newEnt]) }
  }

  public delete(ent: string): IResponse {
    return { status: 200, data: ent }
  }
}
