import LocalStorageApi from '@/myLocalStorage/LocalStorageApi'
import type { IStylesPageApi, IStylesPageDb } from './interfaces'

const keyLocalStorageStylesPage = 'style_page'

const stylesCardLocalStorage = new LocalStorageApi<IStylesPageDb>(
  {
    colors: [
      {
        name: 'Escuro',
        text: 'white',
        back: '#0d1117',
        front: '#161b22',
        hover: '#21262d',
        border: '#262b32'
      },
      {
        name: 'Claro',
        text: 'black',
        back: '#ECECF1',
        front: 'white',
        hover: '#E0E0E7',
        border: '#CBCBE0'
      },
      {
        name: 'Google dark',
        text: 'white',
        back: '#202124',
        front: '#303134',
        hover: '#4B4B4D',
        border: '#3C3E42'
      }
    ],
    atualColor: {
      name: 'Escuro',
      text: 'white',
      back: '#0d1117',
      front: '#161b22',
      hover: '#21262d',
      border: '#262b32'
    },
    borderRadius: {
      outside: '10px',
      inside: '8px'
    }
  },
  keyLocalStorageStylesPage
)

export default class ApiLocalStylesPage implements IStylesPageApi {
  constructor(private _storage = stylesCardLocalStorage) {}

  private _getStyle = async () => {
    return await new Promise<IStylesPageDb>((resolve, reject) => {
      setTimeout(() => {
        const object = this._storage.read()
        if (object) resolve(object)
        if (!object) reject(new Error('not found'))
      }, 0)
    })
  }

  public getColors = async () => {
    const colors = (await this._getStyle()).colors
    return colors
  }

  public getAtualColor = async () => {
    const color = (await this._getStyle()).atualColor
    return color
  }

  public getBorderRadius = async () => {
    const borderRadius = (await this._getStyle()).borderRadius
    return borderRadius
  }

  public setColor = async (name: string) => {
    const style = await this._getStyle()
    const colors = style.colors
    const newColor = colors.find((color) => color.name === name)
    if (newColor) {
      this._storage.setAndReturn({ ...style, colors, atualColor: newColor })
      return newColor
    }
  }
}
