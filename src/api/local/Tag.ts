import type { BaseApi, IResponse } from './BaseApi'
import { z } from 'zod'

const TagSchema = z.string().min(3).max(25)

export type ITag = z.infer<typeof TagSchema>

export class Tags implements BaseApi<ITag> {
  public key = 'Tags_local'

  constructor(private _schema = TagSchema) {}

  private _validationSchema(tag: ITag) {
    const verify = this._schema.safeParse(tag)

    if (!verify.success) {
      throw new Error(JSON.stringify(verify.error))
    }
  }

  public create(ent: string): IResponse {
    return { status: 200, data: ent }
  }

  public readOne(id: string): IResponse {
    return { status: 200, data: id }
  }

  public readAll(): IResponse {
    return { status: 200, data: 'ok' }
  }

  public update(ent: string, newEnt: string): IResponse {
    return { status: 200, data: JSON.stringify([ent, newEnt]) }
  }

  public delete(ent: string): IResponse {
    return { status: 200, data: ent }
  }
}
