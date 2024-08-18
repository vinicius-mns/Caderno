import LocalStorageApi from '@/myLocalStorage/LocalStorageApi'
import type { IStyleApi, IStyleCard, IStyleCardDb } from './Interfaces'

const keyLocalStorageStylesCard = 'styles_card'

const stylesCardLocalStorage = new LocalStorageApi<IStyleCardDb>(
  {
    atualStyleCard: {
      name: 'Muito escuro',
      emoji: '🌑',
      color: 'white',
      border: 'none',
      background: '#21262d',
      'border-radius': '8px',
      'box-shadow': 'none'
    },
    allStylesCard: [
      {
        name: 'Muito escuro',
        emoji: '🌑',
        color: 'white',
        border: 'none',
        background: '#21262d',
        'border-radius': '8px',
        'box-shadow': 'none'
      },
      {
        name: 'Escuro',
        emoji: '🌙',
        color: 'white',
        border: 'none',
        background: '#202020',
        'border-radius': '8px',
        'box-shadow': 'none'
      },
      {
        name: 'Claro',
        emoji: '☀',
        color: 'black',
        border: 'none',
        background: 'white',
        'border-radius': '8px',
        'box-shadow': 'none'
      },
      {
        name: 'Momo estyle',
        emoji: '💖',
        color: 'black',
        border: 'none',
        background:
          'linear-gradient(38deg, rgba(255,246,161,1) 0%, rgba(255,177,177,1) 77%, rgba(186,211,249,1) 100%)',
        'border-radius': '8px'
      },
      {
        name: 'Gif',
        emoji: '🎆',
        color: 'black',
        border: 'none',
        'background-image': `url('https://64.media.tumblr.com/fa143cffbc3bfb0183302cdad6aa5238/tumblr_pq229bewd61uzwgsuo1_400.gif')`,
        'background-size': 'cover',
        'background-position': 'center',
        'border-radius': '8px'
      },
      {
        name: 'Sakura',
        emoji: '🌸',
        color: 'black',
        border: 'none',
        'background-image': `url('https://i.pinimg.com/originals/40/d0/3e/40d03e2ac7a086def11a7738713c9c31.gif')`,
        'background-size': 'cover',
        'background-position': 'center',
        'border-radius': '8px'
      }
    ]
  },
  keyLocalStorageStylesCard
)

export default class ApiLocalStylesCard implements IStyleApi {
  constructor(private _storage = stylesCardLocalStorage) {}

  getAllStyles = async () => {
    return await new Promise<IStyleCard[]>((resolve, reject) => {
      setTimeout(() => {
        const styles = this._storage.read().allStylesCard
        if (styles.length > 0) resolve(styles)
        if (styles.length < 0) reject(new Error('not found'))
      }, 0)
    })
  }

  getAtualCardStyle = async () => {
    return await new Promise<IStyleCard>((resolve, reject) => {
      setTimeout(() => {
        const styles = this._storage.read().atualStyleCard
        if (styles) {
          resolve(styles)
        } else {
          reject(new Error('not found'))
        }
      }, 0)
    })
  }

  setCardStyle = async (name: string) => {
    const allStyles = await this.getAllStyles()
    const find = allStyles.find((style) => style.name === name)
    if (find) {
      this._storage.setAndReturn({
        atualStyleCard: find,
        allStylesCard: allStyles
      })
      return true
    } else {
      return false
    }
  }
}
