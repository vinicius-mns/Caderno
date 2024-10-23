<script setup lang="ts">
import { useWindows } from '@/stores/windows'
import CardView from '../molecules/CardView.vue'
import { computed, nextTick, reactive, ref } from 'vue'
import PlusIco from '../atoms/icons/PlusIco.vue'
import FloatDescription from '../atoms/FloatDescription.vue'
import TagsFiltredsList from '../organisms/TagsFiltredsList.vue'
import { useTags } from '@/stores/tags/tags'
import { useCards } from '@/stores/cards/cards'
import { useConfig } from '@/stores/config'
import type { Icard } from '@/stores/cards/Interfaces'
import ThemeImputText from '../atoms/ThemeImputText.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'
import FloatModalSlot from '../atoms/FloatModalSlot.vue'
import ModalCard from '../atoms/ModalCard.vue'
import TagsFilterCards from '../organisms/TagsFilterCards.vue'
import FilterIco from '../atoms/icons/FilterIco.vue'
import FlexContainer from '../atoms/FlexContainer.vue'
import CardCreateIco from '../atoms/icons/CardCreateIco.vue'
import ThemeP from '../atoms/ThemeP.vue'
import PencilIco from '../atoms/icons/PencilIco.vue'
import ThemeButton from '../atoms/ThemeButton.vue'
import AddTagIco from '../atoms/icons/AddTagIco.vue'
import TagIco from '../atoms/icons/TagIco.vue'
import CardSlot from '../organisms/CardSlot.vue'
import TagSelectorWithList from '../organisms/TagSelectorWithList.vue'
import CardOptions from '../organisms/CardOptions.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import CarUpdate from '../organisms/CarUpdate.vue'
import CardDelete from '../organisms/CardDelete.vue'
import TutorialButtons from '../organisms/TutorialButtons.vue'
import { v4 as uuid } from 'uuid'

const style = useStylesPage()

const window = useWindows()

const cards = useCards()

const config = useConfig()

const tags = useTags()

const width = computed(() => `${config.config.value.cardWidth}px`)

const openCardUpdate = (card: Icard) => window.cardEdit.open(card)

const openCardCreate = async () => {
  window.cardCreate.open({ content: '', date: new Date(), id: '', tags: [] })
}

const cardsReverse = computed(() => {
  const propsCards = cards.cards
  return propsCards.reverse()
})

const allTags = computed(() => tags.tags)

const includeTags = computed(() => tags.includeTags)

const excludeTags = computed(() => tags.excludeTags)

const cardsRenderUpdate = async () => {
  await cards.atualizeReactiveCards({
    includeTags: includeTags.value,
    excludeTags: excludeTags.value
  })
}

const removeIncludeTag = async (tagId: string) => {
  await tags.filter('includeTags').removeToFilter(tagId)

  await cards.atualizeReactiveCards({
    includeTags: includeTags.value,
    excludeTags: excludeTags.value
  })
}

const addIncludeTags = async (name: string) => {
  await tags.filter('includeTags').addTofilter(name)

  await cards.atualizeReactiveCards({
    includeTags: includeTags.value,
    excludeTags: excludeTags.value
  })
}

const removeIncludeTags = async (name: string) => {
  await tags.filter('includeTags').removeToFilter(name)

  await cards.atualizeReactiveCards({
    includeTags: includeTags.value,
    excludeTags: excludeTags.value
  })
}

const addExcludeTags = async (name: string) => {
  await tags.filter('excludeTags').addTofilter(name)

  await cards.atualizeReactiveCards({
    includeTags: includeTags.value,
    excludeTags: excludeTags.value
  })
}

const removeExcludeTags = async (name: string) => {
  await tags.filter('excludeTags').removeToFilter(name)

  await cards.atualizeReactiveCards({
    includeTags: includeTags.value,
    excludeTags: excludeTags.value
  })
}

const cleanAllTags = () => {
  tags.filter('includeTags').clear()
  tags.filter('excludeTags').clear()
}

const cardUpdate = async (card: Icard) => {
  await cards.update(card)
  await cardsRenderUpdate()
}

type ICardTo = 'toEdit' | 'toDelete' | 'toCreate'

const useCardTarget = () => {
  const cardEmpty = (): Icard => {
    return {
      id: uuid(),
      content: '',
      date: new Date(),
      tags: tags.includeTags
    }
  }

  const cards = reactive<{ toEdit: Icard[]; toDelete: Icard[]; toCreate: Icard[] }>({
    toCreate: [],
    toEdit: [],
    toDelete: []
  })

  const addCardTo = (card: Icard | null, to: ICardTo) => {
    const newCards = [...cards[to], card ? card : cardEmpty()]

    cards[to] = newCards
  }

  const setCardTo = (card: Icard, to: ICardTo) => {
    const newCards = cards[to].map((c) => {
      if (c.id === card.id) return card
      else return c
    })

    cards[to] = newCards
  }

  const removeCardTo = (card: Icard, to: ICardTo) => {
    const newCards = cards[to].filter((c) => c.id !== card.id)

    cards[to] = []

    nextTick(() => (cards[to] = newCards))
  }

  const isCardTo = (card: Icard, to: ICardTo) => {
    const cardId = card.id

    const cardsToIds = cards[to].map((c) => c.id)

    return cardsToIds.includes(cardId)
  }

  return {
    cards,
    addCardTo,
    setCardTo,
    removeCardTo,
    isCardTo
  }
}

const cardsTarget = useCardTarget()

const cardsUpdateReactive = async () => {
  try {
    await cards.atualizeReactiveCards({
      includeTags: tags.includeTags,
      excludeTags: tags.excludeTags
    })
  } catch (e) {
    e instanceof Error
      ? window.errorMessage.open(e.message)
      : window.errorMessage.open('erro inesperado')
  }
}

const cardCreateSend = async (card: Icard) => {
  try {
    await cards.create(card)

    await cardsUpdateReactive()

    cardsTarget.removeCardTo(card, 'toCreate')
  } catch (e) {
    e instanceof Error
      ? window.errorMessage.open(e.message)
      : window.errorMessage.open('erro inesperado')
  }
}

const cardUpdateSend = async (card: Icard) => {
  try {
    await cards.update(card)

    await cardsUpdateReactive()

    cardsTarget.removeCardTo(card, 'toEdit')
  } catch (e) {
    e instanceof Error
      ? window.errorMessage.open(e.message)
      : window.errorMessage.open('erro inesperado')
  }
}

const cardDeleteSend = async (card: Icard) => {
  try {
    await cards.deleteCard(card.id)

    await cardsUpdateReactive()

    cardsTarget.removeCardTo(card, 'toDelete')

    cardsTarget.removeCardTo(card, 'toEdit')
  } catch (e) {
    e instanceof Error
      ? window.errorMessage.open(e.message)
      : window.errorMessage.open('erro inesperado')
  }
}
</script>

<template>
  <div class="cards-main-container">
    <FlexContainer
      flex-wrap="wrap"
      :align-items="'start'"
      justify-content="center"
      class="cards-main"
    >
      <ThemeButton
        class="card-w card-create-button"
        @click="cardsTarget.addCardTo(null, 'toCreate')"
      >
        <PlusIco />
      </ThemeButton>

      <CarUpdate
        v-for="(card, i) in cardsTarget.cards.toCreate"
        :key="i"
        class="card-w"
        :card-p="card"
        :id-text-imput="`card-create-${i}`"
        @emit-card="(card: Icard) => cardsTarget.setCardTo(card, 'toCreate')"
        @send-card="cardCreateSend"
        @emit-cancel="(card: Icard) => cardsTarget.removeCardTo(card, 'toCreate')"
      />

      <div v-for="(card, i) in cardsReverse" :key="i">
        <CarUpdate
          v-if="cardsTarget.isCardTo(card, 'toEdit')"
          class="card-w"
          :card-p="cardsTarget.cards.toEdit.find((c) => c.id === card.id)!"
          :id-text-imput="`card-update-${i}`"
          @send-card="cardUpdateSend"
          @emit-card="(card: Icard) => cardsTarget.setCardTo(card, 'toEdit')"
          @emit-cancel="(card: Icard) => cardsTarget.removeCardTo(card, 'toEdit')"
        />

        <CardDelete
          v-else-if="cardsTarget.isCardTo(card, 'toDelete')"
          :card="card"
          class="card-w"
          @emit-card="cardDeleteSend"
          @emit-cancel="(card: Icard) => cardsTarget.removeCardTo(card, 'toDelete')"
        />

        <CardSlot :card="card" :all-tags="tags.tags" class="card-w" v-else>
          <FlexContainer>
            <TagSelectorWithList
              :all-tags="allTags"
              :tags-checked="card.tags"
              :show-list="false"
              @emit-selected="(tags: Itag[]) => cardUpdate({ ...card, tags })"
            />

            <CardOptions
              :all-tags="allTags"
              :card="card"
              @update="(card: Icard) => cardsTarget.addCardTo(card, 'toEdit')"
              @delete="(card: Icard) => cardsTarget.addCardTo(card, 'toDelete')"
              @tag-updated="cardUpdate"
            />
          </FlexContainer>
        </CardSlot>
      </div>
    </FlexContainer>
  </div>
</template>

<style scoped lang="scss">
.card-editor {
  background-color: red;
  height: 300px;
  width: 300px;
}
.cards-main-container {
  width: 100%;

  & .card-create-button {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 50%;
  }

  & .card-w {
    width: v-bind(width);
    max-width: 95dvw;
    margin: 5px;
  }
  & .cards-main {
    padding-top: 20px;
  }
}
</style>
