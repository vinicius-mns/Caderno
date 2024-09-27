export interface IColorPage {
  name: string
  text: string
  back: string
  front: string
  hover: string
  border: string
}

export interface IBorderRadius {
  outside: string
  inside: string
}

export interface IStylesPageDb {
  colors: IColorPage[]
  atualColor: IColorPage
  borderRadius: IBorderRadius
}

export interface IStylesPageApi {
  getColors: () => Promise<IColorPage[]>
  getAtualColor: () => Promise<IColorPage>
  getBorderRadius: () => Promise<IBorderRadius>
  setColor: (name: string) => Promise<IColorPage | undefined>
}
