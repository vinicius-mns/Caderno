import z from 'zod'
import { type IStyle, IStyleSchema } from './styleTypes'
import { Api_localStorage } from '../../Api_localStorage'

const initialValue: IStyle = {
  darkmode: true,
  boxShadow: '0 0 0px 0px rgba(255, 255, 255, 0.3)',
  button: {
    bgColor: '#313131',
    hoverColor: '#424242',
    textColor: 'white',
    borderRadius: '8px',
    size: '36px'
  },
  component: {
    bgColor: '#202020'
  },
  page: {
    bgColor: '#191919'
  },
  optionsColor: ['pink', '#B6E0FE', '#202020'],
  color: {
    text: 'white',
    neutral: '#848484',
    background: '#181818',
    base: '#272727',
    highlight: '#3C3C3C'
  }
}

class StyleStorage extends Api_localStorage<IStyle> {
  constructor(
    public key: string,
    protected _shema: z.AnyZodObject,
    protected _initialValue: IStyle
  ) {
    super(key, _shema, _initialValue)
  }

  public toggleDarkMode = () => {
    const data = this.read()
    const updatedData = { ...data, darkmode: !data.darkmode }
    if (updatedData.darkmode) {
      updatedData.button.textColor = 'white'
      updatedData.button.bgColor = '#313131'
      updatedData.page.bgColor = '#191919'
      updatedData.button.hoverColor = '#424242'
      updatedData.optionsColor = ['rgb(45, 29, 29)', 'rgb(10, 10, 25)', '#202020']
      updatedData.component.bgColor = '#202020'
      updatedData.color.text = 'white'
      updatedData.color.neutral = '#848484'
      updatedData.color.background = '#181818'
      updatedData.color.base = '#272727'
      updatedData.color.highlight = '#3C3C3C'
    } else {
      updatedData.button.textColor = 'black'
      updatedData.button.bgColor = 'white'
      updatedData.page.bgColor = '#e6e6e6'
      updatedData.button.hoverColor = '#e6e6e6'
      updatedData.optionsColor = ['pink', '#B6E0FE', 'rgb(205, 205, 205)']
      updatedData.component.bgColor = 'rgb(205, 205, 205)'
      updatedData.color.text = 'black'
      updatedData.color.neutral = '#848484'
      updatedData.color.background = '#f5f5f7'
      updatedData.color.base = 'white'
      updatedData.color.highlight = 'rgb(238, 238, 238)'
    }
    this.update(updatedData)
  }

  public selecColor = (color: string) => {
    const data = this.read()
    if (data.optionsColor.includes(color)) {
      const updatedData: IStyle = { ...data, component: { bgColor: color } }
      this.update(updatedData)
    }
  }

  public changeBorderRadius = (value: number) => {
    const data = this.read()
    const newValue: IStyle = { ...data, button: { ...data.button, borderRadius: `${value}px` } }
    this.update(newValue)
  }

  public changeBoxShadown = (value: { color?: string; border?: number }) => {
    const data = this.read()
    const def = data.boxShadow.split(' ')
    const defBorder = value.border || value.border === 0 ? value.border : parseFloat(def[3])
    const defColor = value.color ? value.color : def[4]
    const newValue: IStyle = {
      ...data,
      boxShadow: `0 0 0 ${defBorder}px ${defColor}`
    }
    this.update(newValue)
  }
}

export const styleStorage = () => new StyleStorage('style_local_new', IStyleSchema, initialValue)
