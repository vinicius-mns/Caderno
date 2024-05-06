// import type { z } from 'zod'
// import { Api_localStorage_as_db } from '../../Api_localStorage_as_db'
// import type { IGenerateID } from '@/api/interfaces'
// import { UuidGenerate } from '../generateId/UuidGenerate'

// import { cardStyleSchema, type ICardStyle } from './CardsStyleTypes'

// class CardStyleDb extends Api_localStorage_as_db<ICardStyle> {
//   constructor(
//     public key: string,
//     protected _schema: z.AnyZodObject,
//     protected _idGenerate: IGenerateID,
//     protected _initCardStyle: ICardStyle[]
//   ) {
//     super(key, _schema, _idGenerate)
//   }

//   public read(): ICardStyle[] {
//     try {
//       const data = localStorage.getItem(this.key)
//       console.log('adddaaattaaa', data)
//       if (!data) throw new Error('not found')
//       return JSON.parse(data) as ICardStyle[]
//     } catch (e) {
//       return this._initCardStyle
//     }
//   }
// }

// const key = 'cards_style_local'

// const initValue = [
//   {
//     id: '1',
//     color: 'white',
//     border: 'none',
//     background: '#202020',
//     'border-radius': '8px',
//     'box-shadow': 'none'
//   },
//   {
//     id: '2',
//     color: 'black',
//     border: 'none',
//     background: 'white',
//     'border-radius': '8px',
//     'box-shadow': 'none'
//   },
//   {
//     id: '3',
//     color: 'black',
//     border: 'none',
//     background:
//       'linear-gradient(38deg, rgba(255,246,161,1) 0%, rgba(255,177,177,1) 77%, rgba(186,211,249,1) 100%)',
//     'border-radius': '8px',
//     'box-shadow': 'rgb(204, 204, 204) 0 0 8px 2px'
//   }
// ]

// export const cardStyleLocalDb = () =>
//   new CardStyleDb(key, cardStyleSchema, new UuidGenerate(), initValue)
