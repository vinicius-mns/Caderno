import type { BaseApi } from './BaseApi'
import { z } from 'zod'

const cardSchema = z.object({
  id: z.string(),
  content: z.string().min(3),
  date: z.date(),
  tags: z.array(z.string())
})

export type ICard = z.infer<typeof cardSchema>

const initialCard: ICard = {
  id: '0',
  content: 'Card inicial',
  date: new Date(),
  tags: []
}

export class Card implements BaseApi<ICard> {
  public key = 'Card_local'

  constructor(private _card = initialCard) {}

  /**
   * Valida se o card segue todos os contratos estabelecidos
   * @param card Card a ser validade
   * @param schema contrato a ser respeitado
   */
  private _validationSchema(card: ICard, schema = cardSchema) {
    const parse = schema.safeParse(card)

    if (!parse.success) {
      throw new Error(JSON.stringify(parse.error))
    }
  }

  /**
   * Adiciona ou Cria um novo card no localStorage
   * Caso nao exista nenhum card, crie um
   * Caso exista, o adicione
   * @param card Card a ser adicionado ou criado no localStorage
   */
  private _addOrCreateOnLocalStorage(card: ICard) {
    const key = this.key
    const cardsLocalStorage = localStorage.getItem(key)

    if (!cardsLocalStorage) {
      const newCardsLocalStorage = JSON.stringify([card])

      localStorage.setItem(key, newCardsLocalStorage)
    } else {
      const atualCards = JSON.parse(cardsLocalStorage)
      const newCardsLocalStorage = JSON.stringify([...atualCards, card])

      localStorage.setItem(key, newCardsLocalStorage)
    }
  }
}
