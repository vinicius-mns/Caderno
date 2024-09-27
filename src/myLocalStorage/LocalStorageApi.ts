export default class LocalStorageApi<T> {
  constructor(
    private _default: T,
    public key: string
  ) {}

  setAndReturn = (value: T): T => {
    const valueStringify = JSON.stringify(value)
    localStorage.setItem(this.key, valueStringify)
    return value
  }

  read = (): T => {
    const value = localStorage.getItem(this.key)
    if (!value) return this.setAndReturn(this._default)
    return JSON.parse(value)
  }

  clear = () => {
    localStorage.removeItem(this.key)
    this.setAndReturn(this._default)
  }
}
