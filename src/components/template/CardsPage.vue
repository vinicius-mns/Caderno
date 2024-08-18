<script setup lang="ts">
import { useWindows } from '@/stores/windows'
import CardView from '../molecules/CardView.vue'
import { computed } from 'vue'
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
import CoinButton from '../molecules/CoinButton.vue'
import FilterIco from '../atoms/icons/FilterIco.vue'
import FlexContainer from '../atoms/FlexContainer.vue'
import CardCreateIco from '../atoms/icons/CardCreateIco.vue'
import ThemeP from '../atoms/ThemeP.vue'
import ButtonOption from '../molecules/ButtonOption.vue'
import PencilIco from '../atoms/icons/PencilIco.vue'
import ThemeButton from '../atoms/ThemeButton.vue'

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
</script>

<template>
  <FlexContainer flex-direction="column" class="card-main-container">
    <FlexContainer class="cards-header" align-items="end" flex-direction="row">
      <FloatModalSlot>
        <template #button-slot>
          <CoinButton description="Filtrar cards" size="40px">
            <FilterIco />
          </CoinButton>
        </template>
        <template #container-slot>
          <ModalCard class="modal-card" :style="{ width: '360px', height: '60dvh' }">
            <TagsFilterCards
              :allTags="allTags"
              :include-tags="includeTags"
              :exclude-tags="excludeTags"
              @include-tag-add="addIncludeTags"
              @include-tag-remove="removeIncludeTags"
              @exclude-tag-add="addExcludeTags"
              @exclude-tag-remove="removeExcludeTags"
              @clean-all="cleanAllTags"
            />
          </ModalCard>
        </template>
      </FloatModalSlot>
      <FlexContainer class="cards-filter">
        <TagsFiltredsList
          :include-tags="includeTags"
          :exclude-tags="excludeTags"
          @include-tag-remove="removeIncludeTag"
          @exclude-tag-remove="removeExcludeTags"
        />
      </FlexContainer>
    </FlexContainer>
    <FlexContainer
      flex-wrap="wrap"
      :align-items="'start'"
      justify-content="center"
      :style="{ with: '40px' }"
      class="cards-main"
    >
      <CardView
        v-for="(card, i) in cardsReverse"
        :key="i"
        :card="card"
        class="card"
        @emit-card="openCardUpdate"
      />
    </FlexContainer>
  </FlexContainer>
</template>

<style scoped lang="scss">
.card-main-container {
  width: 100%;
  & .cards-header {
    z-index: 1;
    position: sticky;
    top: 0;
    height: 60px;
    padding-left: 50px;
    background-color: v-bind('style.atualColor.front');
    & .cards-filter {
      max-width: calc(100dvw - 400px);
    }
    & .create-card-container {
      overflow: hidden;
      & hr {
        width: 100%;
      }
    }
  }
  & .cards-main {
    margin-top: 30px;
    min-height: 50px;
    padding-bottom: 80px;
    & .card {
      width: v-bind('width');
      max-width: 95dvw;
    }
  }
}
</style>
