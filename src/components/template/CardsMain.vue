<script setup lang="ts">
import { useWindows } from '@/stores/windows'
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import PencilIco from '../atoms/icons/PencilIco.vue'
import { useTags } from '@/stores/tags/tags'
import { useCards } from '@/stores/cards/cards'
import { useConfig } from '@/stores/config'
import type { Icard } from '@/stores/cards/Interfaces'
import FlexContainer from '../atoms/FlexContainer.vue'
import ThemeButton from '../atoms/ThemeButton.vue'
import CardSlot from '../organisms/CardOptions.vue'
import TagSelectorWithList from '../organisms/TagSelector.vue'
import CardOptions from '../organisms/xCardOptions.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import CardEditor from '../organisms/CardEditor.vue'
import CardDelete from '../organisms/CardDelete.vue'
import { v4 as uuid } from 'uuid'
import { useRoute } from 'vue-router'
import { useFloatMessage } from '@/stores/floatMessage'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'
import SearchImput from '../molecules/SearchImput.vue'
import ButtonCoinSlot from '../molecules/ButtonCoinSlot.vue'
import FilterIco from '../atoms/icons/FilterIco.vue'
import TagsFilter from '../organisms/TagsFilter.vue'
import TagsFiltred from '../organisms/TagsFiltred.vue'
import GearIco from '../atoms/icons/GearIco.vue'
import ButtonSlot from '../molecules/ButtonSlot.vue'
import CardView from '../molecules/CardView.vue'
import CardTypes from '../organisms/CardTypes.vue'

const window = useWindows()
const cards = useCards()
const config = useConfig()
const route = useRoute()
const floatMessage = useFloatMessage()
const tags = useTags()
const stylesPage = useStylesPage()

const width = computed(() => `${config.config.value.cardWidth}px`)

const cardsReverse = computed(() => [...cards.cards].reverse())

const cardEmpty = (): Icard => {
  return {
    id: uuid(),
    content: '',
    date: new Date(),
    tags: tags.includeTags
  }
}

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

const useCardCreate = () => {
  const cardList = ref<Icard[]>([])

  const push = () => {
    cardList.value = [...cardList.value, cardEmpty()]
  }

  const remove = (cardParam: Icard) => {
    const atualList = cardList.value

    cardList.value = []

    nextTick(() => {
      cardList.value = atualList.filter((card) => card.id !== cardParam.id)
    })
  }

  const create = async (cardParam: Icard) => {
    try {
      await cards.create(cardParam)

      await cardsUpdateReactive()

      remove(cardParam)

      floatMessage.openMessage(floatMessage.messages.cardCreateSucess)
    } catch (e) {
      windowsHandleError(e)
    }
  }

  return { list: cardList, push, remove, create }
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

const cardCreate = useCardCreate()

type ICardTo = 'edit' | 'delete' | 'create'

const cardsTo = reactive<{ edit: Icard[]; delete: Icard[]; create: Icard[] }>({
  create: [],
  edit: [],
  delete: []
})

const addCardTo = (card: Icard | null, to: ICardTo) => {
  const newCards = [...cardsTo[to], card ? card : cardEmpty()]
  cardsTo[to] = newCards

  if (tags.tags.length <= 0) window.errorCardNoTag.open(null)
}

const setCardTo = (card: Icard, to: ICardTo) => {
  const newCards = cardsTo[to].map((c) => {
    if (c.id === card.id) return card
    else return c
  })

  cardsTo[to] = newCards
}

const removeCardTo = (card: Icard, to: ICardTo) => {
  const newCards = cardsTo[to].filter((c) => c.id !== card.id)
  cardsTo[to] = []
  nextTick(() => (cardsTo[to] = newCards))
}

const isCardTo = (card: Icard, to: ICardTo) => {
  const cardsToIds = cardsTo[to].map((c) => c.id)
  return cardsToIds.includes(card.id)
}

const cardCreateSend = async (card: Icard) => {
  try {
    await cards.create(card)

    await cardsUpdateReactive()

    floatMessage.openMessage(floatMessage.messages.cardCreateSucess)

    removeCardTo(card, 'create')
  } catch (e) {
    windowsHandleError(e)
  }
}

const cardUpdateSend = async (card: Icard) => {
  try {
    await cards.update(card)

    await cardsUpdateReactive()

    floatMessage.openMessage(floatMessage.messages.cardUpdateSucess)

    removeCardTo(card, 'edit')
  } catch (e) {
    windowsHandleError(e)
  }
}

const cardDeleteSend = async (card: Icard) => {
  try {
    await cards.deleteCard(card.id)

    await cardsUpdateReactive()

    floatMessage.openMessage(floatMessage.messages.cardDeleteSucess)

    removeCardTo(card, 'delete')

    removeCardTo(card, 'edit')
  } catch (e) {
    windowsHandleError(e)
  }
}

const copyCard = async (card: Icard) => {
  const remote = `https://vinicius-mns.github.io/Caderno/#/cards/`
  // const local = `http://localhost:5173/#/cards/`
  const cardString = JSON.stringify(card)
  const encodedCardString = encodeURIComponent(cardString)
  const url = `${remote}${encodedCardString}`

  try {
    await navigator.clipboard.writeText(url)

    floatMessage.openMessage(floatMessage.messages.cardCopySucess)
  } catch (err) {
    console.error('Falha ao copiar o URL: ', err)
  }
}

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

const realAllTagsByName = (text: string) => {
  tags.realAllTagsByName(text)
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
    <FlexContainer class="header" align-items="center" justify-content="center">
      <SearchImput
        key-id="search-card"
        placeholder="Pesquisar"
        @search="realAllTagsByName"
        class="search-card"
      />

      <ButtonCoinSlot
        content="Configurações"
        :circle="true"
        background-color="transparent"
        :border="true"
        @click="window.config.open(null)"
      >
        <GearIco />
      </ButtonCoinSlot>
    </FlexContainer>

    <FlexContainer flex-wrap="wrap" align-items="start" justify-content="center" class="cards-main">
      <ButtonSlot content="Criar card" class="card-w card-create-button" @click="cardCreate.push()">
        <PencilIco />
      </ButtonSlot>

      <CardTypes
        v-for="(card, i) in cardCreate.list.value"
        :card-props="card"
        :key="i"
        :all-tags="tags.tags"
        class="card-w"
        type="create"
        @create-card="cardCreate.create"
        @cancel-card="cardCreate.remove"
      />

      <div v-for="(card, i) in cardsReverse" :key="i" class="card-with-options-container">
        <CardTypes
          class="card-w"
          :cardProps="card"
          type="view"
          :all-tags="tags.tags"
          @delete-card="cardDelete"
        />
      </div>
    </FlexContainer>
  </div>
</template>

<style scoped lang="scss">
.cards-main-container {
  width: 100%;

  & .header {
    position: sticky;
    top: 0;
    z-index: 1;
    width: 100%;
    background-color: v-bind('stylesPage.atualColor.front');
    height: 50px;

    & .search-card {
      flex-shrink: 0;
      width: 40%;
    }
  }

  & .cards-main {
    & .card-w {
      width: v-bind(width);
      // z-index: 1;
    }

    & .card-with-options-container {
      position: relative;
      margin: 5px;

      & .card-option-button {
        position: absolute;
        top: 8px;
        right: 8px;
      }
    }

    & .card-create-button {
      filter: invert(1);
      display: flex;
      align-items: center;
      justify-content: center;
      height: 60px;
      position: sticky;
      top: 50px;
      z-index: 1;
    }
  }
}
// .card-editor {
//   background-color: red;
//   height: 300px;
//   width: 300px;
// }

// .cards-main-container {
//   width: 100%;

//   & .header {
//     position: sticky;
//     top: 0;
//     z-index: 1;
//     width: 100%;
//     background-color: v-bind('stylesPage.atualColor.front');
//     height: 50px;

//     & .search-card {
//       flex-shrink: 0;
//       width: 40%;
//     }
//   }

//   & .filter-container {
//     background-color: v-bind('stylesPage.atualColor.front');
//     z-index: 1;
//     position: sticky;
//     top: 50px;

//     & .tags-filter {
//       margin-left: 30px;
//     }
//   }

//   & .card-create-button {
//     height: 80px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     background-color: transparent;
//     border: solid 1px v-bind('stylesPage.atualColor.border');
//   }

//   & .column-container {
//     box-sizing: border-box;
//     padding: 20px;

//     & .column {
//       width: calc(100% / v-bind(columnNumber));
//       flex-direction: column;
//     }

//     & .card-w {
//       width: v-bind(width);
//       max-width: 95dvw;
//       padding: 10px;
//       box-sizing: border-box;
//       // margin: 5px;
//       // margin-bottom: 20px;
//     }
//   }

//   & .cards-main {
//     padding-top: 20px;
//   }
// }

// .card-animation {
//   width: v-bind(width);
//   max-width: 95dvw;
//   margin: 5px;
//   margin-bottom: 20px;
//   margin-top: 30px;
//   animation: cardAnimation 0.3s forwards;
// }

// @keyframes cardAnimation {
//   to {
//     margin-top: 0;
//   }
// }
</style>
