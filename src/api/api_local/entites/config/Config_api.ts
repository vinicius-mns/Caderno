import { z } from 'zod'
import { Api_localStorage } from '../../Api_localStorage'
import { type IConfig, IConfigSchema } from './configTypes'

const initialValue: IConfig = {
  columnsCard: 1,
  showFilterCards: false
}

class Config_local extends Api_localStorage<IConfig> {
  constructor(
    public key: string,
    protected _schema: z.AnyZodObject,
    protected _initialValue: IConfig
  ) {
    super(key, _schema, _initialValue)
  }

  public setColumns(columnsLength: number) {
    try {
      const data = this.read()
      const newData: IConfig = { ...data, columnsCard: columnsLength }
      this.update(newData)
    } catch (e) {
      const message = 'erro ao alterar colunas'
      throw new Error(JSON.stringify({ message: message, error: e }))
    }
  }

  public toggleFilter(value?: boolean) {
    try {
      if (value === true) {
        const data = this.read()
        const newData: IConfig = { ...data, showFilterCards: value }
        this.update(newData)
      }
    } catch (e) {
      const message = 'erro ao alterar filter cards'
      throw new Error(JSON.stringify({ message: message, error: e }))
    }
  }
}

export const configStorage = () => new Config_local('config_local', IConfigSchema, initialValue)
