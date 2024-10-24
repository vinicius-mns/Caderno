<script setup lang="ts">
import { useWindows } from '@/stores/windows'
import { computed, nextTick, reactive } from 'vue'
import PlusIco from '../atoms/icons/PlusIco.vue'
import { useTags } from '@/stores/tags/tags'
import { useCards } from '@/stores/cards/cards'
import { useConfig } from '@/stores/config'
import type { Icard } from '@/stores/cards/Interfaces'
import FlexContainer from '../atoms/FlexContainer.vue'
import ThemeButton from '../atoms/ThemeButton.vue'
import CardSlot from '../organisms/CardSlot.vue'
import TagSelectorWithList from '../organisms/TagSelectorWithList.vue'
import CardOptions from '../organisms/CardOptions.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import CardEditor from '../organisms/CardEditor.vue'
import CardDelete from '../organisms/CardDelete.vue'
import { v4 as uuid } from 'uuid'

const window = useWindows()
const cards = useCards()
const config = useConfig()
const tags = useTags()

const width = computed(() => `${config.config.value.cardWidth}px`)
const cardsReverse = computed(() => [...cards.cards].reverse())
const allTags = computed(() => tags.tags)

const cardEmpty = (): Icard => {
  return {
    id: uuid(),
    content: '',
    date: new Date(),
    tags: tags.includeTags
  }
}

const handleError = (error: unknown) => {
  error instanceof Error
    ? window.errorMessage.open(error.message)
    : window.errorMessage.open('erro inesperado')
}

type ICardTo = 'edit' | 'delete' | 'create'

const cardsTo = reactive<{ edit: Icard[]; delete: Icard[]; create: Icard[] }>({
  create: [],
  edit: [],
  delete: []
})

const addCardTo = (card: Icard | null, to: ICardTo) => {
  const newCards = [...cardsTo[to], card ? card : cardEmpty()]
  cardsTo[to] = newCards
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

const cardsUpdateReactive = async () => {
  try {
    await cards.atualizeReactiveCards({
      includeTags: tags.includeTags,
      excludeTags: tags.excludeTags
    })
  } catch (e) {
    handleError(e)
  }
}

const cardCreateSend = async (card: Icard) => {
  try {
    await cards.create(card)
    await cardsUpdateReactive()
    removeCardTo(card, 'create')
  } catch (e) {
    handleError(e)
  }
}

const cardUpdateSend = async (card: Icard) => {
  try {
    await cards.update(card)
    await cardsUpdateReactive()
    removeCardTo(card, 'edit')
  } catch (e) {
    handleError(e)
  }
}

const cardDeleteSend = async (card: Icard) => {
  try {
    await cards.deleteCard(card.id)
    await cardsUpdateReactive()
    removeCardTo(card, 'delete')
    removeCardTo(card, 'edit')
  } catch (e) {
    handleError(e)
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
      <ThemeButton class="card-w card-create-button" @click="addCardTo(null, 'create')">
        <PlusIco />
      </ThemeButton>

      <CardEditor
        v-for="(card, i) in cardsTo.create"
        :key="i"
        class="card-w"
        :card-p="card"
        :id-text-imput="`card-create-${i}`"
        @emit-card="(card: Icard) => setCardTo(card, 'create')"
        @send-card="cardCreateSend"
        @emit-cancel="(card: Icard) => removeCardTo(card, 'create')"
      />

      <div v-for="(card, i) in cardsReverse" :key="i">
        <CardEditor
          v-if="isCardTo(card, 'edit')"
          class="card-w"
          :card-p="cardsTo.edit.find((c) => c.id === card.id)!"
          :id-text-imput="`card-update-${i}`"
          @send-card="cardUpdateSend"
          @emit-card="(card: Icard) => setCardTo(card, 'edit')"
          @emit-cancel="(card: Icard) => removeCardTo(card, 'edit')"
        />

        <CardDelete
          v-else-if="isCardTo(card, 'delete')"
          :card="card"
          class="card-w"
          @emit-card="cardDeleteSend"
          @emit-cancel="(card: Icard) => removeCardTo(card, 'delete')"
        />

        <CardSlot :card="card" :all-tags="tags.tags" class="card-w" v-else>
          <FlexContainer>
            <TagSelectorWithList
              :all-tags="allTags"
              :tags-checked="card.tags"
              :show-list="false"
              @emit-selected="(tags: Itag[]) => cardUpdateSend({ ...card, tags })"
            />

            <CardOptions
              :all-tags="allTags"
              :card="card"
              @update="(card: Icard) => addCardTo(card, 'edit')"
              @delete="(card: Icard) => addCardTo(card, 'delete')"
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
