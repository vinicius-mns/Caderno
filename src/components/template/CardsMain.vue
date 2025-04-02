<script setup lang="ts">
import { useWindows } from '@/stores/windows'
import { computed, onMounted, reactive, watch, watchEffect } from 'vue'
import { useTags } from '@/stores/tags/tags'
import { useCards } from '@/stores/cards/cards'
import { useConfig } from '@/stores/config'
import type { Icard } from '@/stores/cards/Interfaces'
import FlexContainer from '../atoms/FlexContainer.vue'
import { useRoute } from 'vue-router'
import { useFloatMessage } from '@/stores/floatMessage'
import CardTypes from '../organisms/CardTypes.vue'
import rules from '@/stores/documentRules.json'
import { useCardsTags } from '@/stores/cardsTags'
import CardGroup from '../organisms/card/CardGroup.vue'
import CardEditor from '../organisms/card/CardEditor.vue'
import PlusIco from '../atoms/icons/PlusIco.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'

const stylesPage = useStylesPage()
const window = useWindows()
const cards = useCards()
const config = useConfig()
const route = useRoute()
const floatMessage = useFloatMessage()
const tags = useTags()
const cardsTags = useCardsTags()

const width = computed(() => {
  const windowWidth = document.documentElement.clientWidth
  const mobileSize = parseInt(rules.window.width.mobile)

  if (windowWidth < mobileSize) return 'calc(100dvw - 24px)'

  return `${config.config.value.cardWidth}px`
})

const cardsReverse = computed(() => [...cards.cards].reverse())

const windowsHandleError = (error: unknown) => {
  error instanceof Error
    ? window.errorMessage.open(error.message)
    : window.errorMessage.open('erro inesperado')
}

const cardsUpdateReactive = async () => {
  try {
    await cards.atualizeReactiveCards({
      includeTags: tags.includeTags,
      excludeTags: tags.excludeTags
    })
  } catch (e) {
    windowsHandleError(e)
  }
}

// const useCardCreate = () => {
//   const view = ref<'button' | 'card'>('button')

//   const setView = (param: 'button' | 'card') => (view.value = param)

//   return {
//     view,
//     set: setView
//   }
// }

// const cardCreateView = useCardCreate()

// const cardCreate = async (cardParam: Icard) => {
//   try {
//     await cards.create(cardParam)

//     await cardsUpdateReactive()

//     cardCreateView.set('button')

//     floatMessage.openMessage(floatMessage.messages.cardCreateSucess)
//   } catch (e) {
//     windowsHandleError(e)
//   }
// }

const cardUpdate = async (cardParam: Icard) => {
  try {
    await cards.update(cardParam)

    await cardsUpdateReactive()
  } catch (e) {
    windowsHandleError(e)
  }
}
// const cardDelete = async (card: Icard) => {
//   console.log('deletando card')

//   try {
//     await cards.deleteCard(card.id)

//     await cardsUpdateReactive()

//     floatMessage.openMessage(floatMessage.messages.cardDeleteSucess)
//   } catch (e) {
//     windowsHandleError(e)
//   }
// }

// type ICardTo = 'edit' | 'delete' | 'create'

// const cardsTo = reactive<{ edit: Icard[]; delete: Icard[]; create: Icard[] }>({
//   create: [],
//   edit: [],
//   delete: []
// })

// const addCardTo = (card: Icard | null, to: ICardTo) => {
//   const newCards = [...cardsTo[to], card ? card : cardEmpty()]
//   cardsTo[to] = newCards

//   if (tags.tags.length <= 0) window.errorCardNoTag.open(null)
// }

// const setCardTo = (card: Icard, to: ICardTo) => {
//   const newCards = cardsTo[to].map((c) => {
//     if (c.id === card.id) return card
//     else return c
//   })

//   cardsTo[to] = newCards
// }

// const removeCardTo = (card: Icard, to: ICardTo) => {
//   const newCards = cardsTo[to].filter((c) => c.id !== card.id)
//   cardsTo[to] = []
//   nextTick(() => (cardsTo[to] = newCards))
// }

// const isCardTo = (card: Icard, to: ICardTo) => {
//   const cardsToIds = cardsTo[to].map((c) => c.id)
//   return cardsToIds.includes(card.id)
// }

// const cardCreateSend = async (card: Icard) => {
//   try {
//     await cards.create(card)

//     await cardsUpdateReactive()

//     floatMessage.openMessage(floatMessage.messages.cardCreateSucess)

//     removeCardTo(card, 'create')
//   } catch (e) {
//     windowsHandleError(e)
//   }
// }

// const cardUpdateSend = async (card: Icard) => {
//   try {
//     await cards.update(card)

//     await cardsUpdateReactive()

//     floatMessage.openMessage(floatMessage.messages.cardUpdateSucess)

//     removeCardTo(card, 'edit')
//   } catch (e) {
//     windowsHandleError(e)
//   }
// }

// const cardDeleteSend = async (card: Icard) => {
//   try {
//     await cards.deleteCard(card.id)

//     await cardsUpdateReactive()

//     floatMessage.openMessage(floatMessage.messages.cardDeleteSucess)

//     removeCardTo(card, 'delete')

//     removeCardTo(card, 'edit')
//   } catch (e) {
//     windowsHandleError(e)
//   }
// }

const handleOpenSharedCard = async () => {
  const paramId = route.params.id

  const getCardInParam = () => {
    if (paramId) {
      const card = JSON.parse(paramId as string) as Icard
      return cards.isCard(card) && card
    }
  }

  const openSharedCard = async (card: Icard) => {
    try {
      await cards.getCard(card.id)
    } catch (e) {
      console.error(e)
      window.cardShare.open(card)
    }
  }

  const card = getCardInParam()
  if (card) openSharedCard(card)
}

// const cardColumns = (cardList: Icard[], columnQuantity: number) => {
//   const columns = Array.from({ length: columnQuantity }, () => [] as Icard[])

//   for (let i = 0; i < cardList.length; i++) {
//     const listaIndex = i % columnQuantity

//     columns[listaIndex].push(cardList[i])
//   }

//   return columns
// }

// const columnNumber = 4

// type ITypeCard = 'view' | 'editor'

// interface IcardType extends Icard {
//   type: 'view' | 'editor'
// }

// const x: IcardType = {
//   id: '1',
//   date: new Date(),
//   content: 'content',
//   tags: [],
//   type: 'view'
// }

// const cardsParsed = computed<IcardType[]>(() => {
//   return cards.cards.map((card) => ({ ...card, type: 'view' }))
// })

const cardsList = reactive<Icard[]>([])

// const cardSetType = (card: Icard, type: ITypeCard) => {
//   cardsList.find((c) => c.id === card.id)!.type = type
// }

watchEffect(() => {
  const create: Icard = {
    id: 'create',
    date: new Date(),
    content: '',
    tags: []
  }

  const reverseCards = [...cards.cards].reverse()

  console.log('cardsy', reverseCards)

  cardsList.splice(0, cardsList.length, ...reverseCards)
})

onMounted(async () => {
  await handleOpenSharedCard()
})

const columns = 4

const cardColumns = computed(() => {
  const cardInColumns = Array.from({ length: columns }, () => []) as Icard[][]

  for (let i = 0; i < cardsList.length; i += 1) {
    const indexColumn = i % columns
    cardInColumns[indexColumn].push(cardsList[i])
  }

  return cardInColumns
})

const updateCard = async (card: Icard) => {
  await cardsTags.card.update(card)
}

const cardDelete = async (card: Icard) => {
  await cardsTags.card.delete(card)
}

const searchTag = (tag: string) => {
  tags.readAllTags(tag)
}

const openCreateTag = () => {
  window.tagCreate.open(null)
}
</script>

<template>
  <FlexContainer class="cards-main-container">
    <FlexContainer
      class="column"
      v-for="(column, i) in cardColumns"
      :key="i"
      flex-direction="column"
    >
      <!-- <button class="create-card-button"><PlusIco /></button> -->

      <CardGroup
        v-for="(card, i) in column"
        class="card"
        :key="i"
        :card="card"
        :tags="tags.tags"
        :text-filter-tags="tags.textFilterTags"
        @delete-card="cardDelete"
        @updated-card="updateCard"
        @search-tag="searchTag"
        @open-create-tag="openCreateTag"
      />
    </FlexContainer>
  </FlexContainer>
</template>

<style scoped lang="scss">
.cards-main-container {
  width: 94%;
  padding: 54px 0 120px 0;

  .create-card-button {
    height: 40px;
    border-radius: 50px;
    // border: none;
    background-color: transparent;
    border: solid 1px v-bind('stylesPage.atualColor.border');
    width: 90%;
    margin-left: 5%;
    position: sticky;
    top: 90px;
    z-index: 1;

    &:hover {
      background-color: red;
    }
  }

  .column {
    width: 0;
    flex-grow: 1;

    & .card {
      margin: 6px;
    }
  }
}
</style>
