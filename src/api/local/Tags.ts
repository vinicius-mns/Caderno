import type { BaseApi, IResponse } from './BaseApi'
import { z } from 'zod'

const TagsSchema = z.string().min(3).max(25)

export type ITags = z.infer<typeof TagsSchema>

export class Tags implements BaseApi<ITags> {
  public key = 'TagsTest'

  constructor(private _schema = TagsSchema) {}

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
