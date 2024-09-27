<!-- <script setup lang="ts">
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

const style = useStylesPage()

const window = useWindows()

const tags = useTags()

const cards = useCards()

const config = useConfig()

const allTags = computed(() => tags.tags)

const width = computed(() => `${config.config.value.cardWidth}px`)

const openCardUpdate = (card: Icard) => window.cardEdit.open(card)

const openCardCreate = async () => {
  window.cardCreate.open({ content: '', date: new Date(), id: '', tags: [] })
}

const cardsReverse = computed(() => {
  const propsCards = cards.cards
  return propsCards.reverse()
})

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
  <FlexContainer align-items="center" class="cards-header">
    <FloatModalSlot>
      <template #button-slot>
        <CoinButton description="Filtrar cards" class="coin-button" size="50px">
          <FilterIco />
        </CoinButton>
      </template>
      <template #container-slot>
        <ModalCard class="modal-card">
          <div class="tags">
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
          </div>
        </ModalCard>
      </template>
    </FloatModalSlot>
    <TagsFiltredsList
      :include-tags="includeTags"
      :exclude-tags="excludeTags"
      class="filtred-cards"
      @include-tag-remove="removeIncludeTag"
      @exclude-tag-remove="removeExcludeTags"
    />
  </FlexContainer>
</template>

<style scoped lang="scss">
.cards-header {
  height: 100%;
  padding-left: 20px;
  & .modal-card {
    height: 60dvh;
    width: 360px;
    max-width: 95dvw;
    display: flex;
    flex-direction: column;
    & .input-option {
      margin-bottom: 5px;
    }
    & .tags {
      height: 100%;
      overflow: auto;
    }
  }
}
</style> -->
