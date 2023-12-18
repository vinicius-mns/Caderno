import type { BaseApi } from './BaseApi'

export class Api<T> implements BaseApi<T> {
  constructor(
    public key: string,
    private _schema: z.AnyZodObject,
    private _idGenetate = uuidv4,
    private _response = response
  ) {}
}
