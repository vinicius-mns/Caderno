// interface IStyle {
//   name: string
//   props: {
//     'background-color': string
//     color: string
//     border: string
//     'border-radius': string
//     'box-shadow': string
//   }
// }

// // class CardStyle {
// //   constructor(private _card: IStyle) {}
// // }

// const listCardSyle: IStyle[] = [
//   {
//     name: 'light',
//     props: {
//       'background-color': 'red',
//       'border-radius': '1',
//       'box-shadow': '',
//       border: '',
//       color: ''
//     }
//   },
//   {
//     name: 'dark',
//     props: {
//       'background-color': 'blue',
//       'border-radius': '1',
//       'box-shadow': '',
//       border: '',
//       color: ''
//     }
//   }
// ]

// const listButtonStyle: IStyle[] = [
//   {
//     name: 'light',
//     props: {
//       'background-color': 'red',
//       'border-radius': '1',
//       'box-shadow': '',
//       border: '',
//       color: ''
//     }
//   },
//   {
//     name: 'dark',
//     props: {
//       'background-color': 'blue',
//       'border-radius': '1',
//       'box-shadow': '',
//       border: '',
//       color: ''
//     }
//   }
// ]

// const useStyle = {
//   value: {
//     card: listCardSyle[0],
//     button: listButtonStyle[0]
//   },
//   setCard: (card: IStyle) => (useStyle.value.card = card),
//   setButton: (button: IStyle) => (useStyle.value.button = button)
// }

// // const cards = CardStyle.renderCards(listCardSyle).map((card) => card.get)

// // const names = cards

// // class ButtonStyle {
// //   constructor(private _button: IStyle) {}

// //   public Props = () => this._button.props
// // }

// // const listButtonStyle = [
// //   new ButtonStyle({
// //     name: 'light',
// //     props: {
// //       'background-color': 'red',
// //       'border-radius': '1',
// //       'box-shadow': '',
// //       border: '',
// //       color: ''
// //     }
// //   }),
// //   new ButtonStyle({
// //     name: 'dark',
// //     props: {
// //       'background-color': 'blue',
// //       'border-radius': '1',
// //       'box-shadow': '',
// //       border: '',
// //       color: ''
// //     }
// //   })
// // ]

// // class AppStyle {
// //   constructor(
// //     private _card: CardStyle,
// //     private _button: ButtonStyle
// //   ) {}

// //   public use() {
// //     return {
// //       card: this._card.Props(),
// //       button: this._button.Props()
// //     }
// //   }

// //   public cardChange = (card: CardStyle) => (this._card = card)

// //   public buttonChange = (button: ButtonStyle) => (this._button = button)
// // }

// // const appS = new AppStyle(new CardStyle(listCardSyle[0]), listButtonStyle[0])

// // const useStyle = appS.use()

// // // const card1 = new CardStyle({
// // //   'background-color': 'red',
// // //   'border-radius': '1',
// // //   'box-shadow': '',
// // //   border: '',
// // //   color: ''
// // // })

// // // const card2 = new CardStyle({
// // //   'background-color': 'blue',
// // //   'border-radius': '1',
// // //   'box-shadow': '',
// // //   border: '',
// // //   color: ''
// // // })

// // // const button1 = new ButtonStyle({
// // //   'background-color': 'blue',
// // //   'border-radius': '1',
// // //   'box-shadow': '',
// // //   border: '',
// // //   color: ''
// // // })

// // // const cards = ['card', 'card', 'card']

// // // const buttons = ['card', 'card', 'card']

// // // const estilos = [
// // //   ['card', 'button'],
// // //   ['card', 'button']
// // // ]
