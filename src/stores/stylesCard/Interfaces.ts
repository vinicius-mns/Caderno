export interface IStyleCard {
  name: string
  [key: string]: string
}

export interface IStyleCardDb {
  atualStyleCard: IStyleCard
  allStylesCard: IStyleCard[]
}

export interface IStyleApi {
  getAtualCardStyle: () => Promise<IStyleCard>
  getAllStyles: () => Promise<IStyleCard[]>
  setCardStyle: (name: string) => Promise<boolean>
}
