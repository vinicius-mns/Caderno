<script setup lang="ts">
import { useWindows } from '@/stores/windows'
import { computed, onMounted } from 'vue'
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
const cardDelete = async (card: Icard) => {
  console.log('deletando card')

  try {
    await cards.deleteCard(card.id)

    await cardsUpdateReactive()

    floatMessage.openMessage(floatMessage.messages.cardDeleteSucess)
  } catch (e) {
    windowsHandleError(e)
  }
}

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

onMounted(async () => {
  await handleOpenSharedCard()
})
</script>

<template>
  <div class="cards-main-container">
    <FlexContainer flex-wrap="wrap" align-items="start" justify-content="center" class="cards-main">
      <CardTypes
        v-for="(card, i) in cardsReverse"
        type="view"
        class="card"
        :key="i"
        :card-props="card"
        :all-tags="tags.tags"
        :search-tag="tags.textFilterTags"
        @read-tags-by-name="tags.readAllTags"
        @delete-card="cardDelete"
        @update-card="cardUpdate"
        @open-card="window.cardView.open"
        @share-card="cardsTags.card.share"
      />
    </FlexContainer>
  </div>
</template>

<style scoped lang="scss">
.cards-main-container {
  width: 100%;
  padding: 40px 0 120px 0;

  & .cards-main {
    & .card {
      width: v-bind(width);
      margin: 5px;
    }

    // & .card-with-options-container {
    //   position: relative;
    //   // margin: 5px;

    //   & .card-option-button {
    //     position: absolute;
    //     top: 8px;
    //     right: 8px;
    //   }
    // }

    // & .card-create-button {
    //   filter: invert(1);
    //   display: flex;
    //   align-items: center;
    //   justify-content: center;
    //   height: 60px;
    //   position: sticky;
    //   top: 50px;
    //   z-index: 1;
    // }
  }
}
</style>
