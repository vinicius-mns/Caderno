import { defineStore } from 'pinia'
import { useCards } from '../cards/cards'
import { useTags } from '../tags/tags'
import { useWindows } from '../windows'
import type { Icard } from '../cards/Interfaces'
import type { Itag } from '../tags/Interfaces'
import { useFloatMessage } from '../floatMessage'

export const useCardsTags = defineStore('handle cards tags', () => {
  const cards = useCards()
  const tags = useTags()
  const windows = useWindows()
  const floatMessage = useFloatMessage()

  const windowsHandleError = (error: unknown) => {
    error instanceof Error
      ? windows.errorMessage.open(error.message)
      : windows.errorMessage.open('erro inesperado')
  }

  const updateReactiveCards = async () => {
    try {
      cards.atualizeReactiveCards({
        includeTags: tags.includeTags,
        excludeTags: tags.excludeTags
      })
    } catch (e) {
      windowsHandleError(e)
    }
  }

  // cards

  const cardCreate = async (card: Icard) => {
    try {
      await cards.create(card)
      await updateReactiveCards()
      floatMessage.openMessage('Card criado')
      return true
    } catch (e) {
      windowsHandleError(e)
      return false
    }
  }

  const cardUpdate = async (card: Icard) => {
    try {
      await cards.update(card)
      await updateReactiveCards()
      floatMessage.openMessage('Card atualizado')
      return true
    } catch (e) {
      windowsHandleError(e)
      return false
    }
  }

  const cardDelete = async (card: Icard) => {
    try {
      await cards.deleteCard(card.id)
      await updateReactiveCards()
      floatMessage.openMessage('Card deletado')
      return true
    } catch (e) {
      windowsHandleError(e)
      return false
    }
  }

  const cardShare = async (card: Icard) => {
    const baseUrl = window.location.href.split('#')[0]
    const cardString = JSON.stringify(card)
    const encodedCardString = encodeURIComponent(cardString)
    const url = `${baseUrl}#/cards/${encodedCardString}`

    try {
      await navigator.clipboard.writeText(url)

      floatMessage.openMessage('Card Copiado')
    } catch (err) {
      floatMessage.openMessage('Erro ao copiar o card')
      console.error('Falha ao copiar o URL: ', err)
    }
  }

  // tags

  const tagCreate = async (tag: Itag) => {
    try {
      await tags.createTag({ emoji: tag[0], name: tag[1] })
      floatMessage.openMessage('Tag criada')
      return true
    } catch (e) {
      windowsHandleError(e)
      return false
    }
  }

  const tagUpdate = async (tag: Itag) => {
    try {
      await tags.updateTag({ emoji: tag[0], name: tag[1], atualName: tag[1] })
      await cards.updateAllTags({ tag, name: tag[1] })
      await updateReactiveCards()
      floatMessage.openMessage('Tag atualizada')
      return true
    } catch (e) {
      windowsHandleError(e)
      return false
    }
  }

  const tagDelete = async (tag: Itag) => {
    try {
      await tags.deletedTag(tag[1])
      await updateReactiveCards()
      floatMessage.openMessage('Tag deletada')
      return true
    } catch (e) {
      windowsHandleError(e)
      return false
    }
  }

  return {
    card: {
      create: cardCreate,
      update: cardUpdate,
      delete: cardDelete,
      share: cardShare
    },
    tag: {
      create: tagCreate,
      update: tagUpdate,
      delete: tagDelete
    }
  }
})
