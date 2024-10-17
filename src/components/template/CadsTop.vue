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
import FilterIco from '../atoms/icons/FilterIco.vue'
import FlexContainer from '../atoms/FlexContainer.vue'
import CardCreateIco from '../atoms/icons/CardCreateIco.vue'
import ThemeP from '../atoms/ThemeP.vue'
import PencilIco from '../atoms/icons/PencilIco.vue'
import ThemeButton from '../atoms/ThemeButton.vue'
import AddTagIco from '../atoms/icons/AddTagIco.vue'
import TagIco from '../atoms/icons/TagIco.vue'
import ButtonCoinSlot from '../molecules/ButtonCoinSlot.vue'

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
  <FlexContainer class="cards-header" align-items="end" flex-direction="row">
    <FloatModalSlot>
      <template #button-slot>
        <ButtonCoinSlot content="Filtrar cards">
          <FilterIco />
        </ButtonCoinSlot>
      </template>

      <template #container-slot>
        <ModalCard class="modal-card">
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
</template>

<style scoped lang="scss">
.cards-header {
  position: fixed;
  top: 0;
  height: 60px;
  width: 100dvw;
  padding-left: 50px;
  background-color: v-bind('style.atualColor.front');

  & .modal-card {
    display: flex;
    flex-direction: column;
    width: 360px;
    max-width: 95dvw;
    max-height: 60dvh;
  }

  & .cards-filter {
    max-width: calc(100dvw - 100px);
    overflow: hidden;

    @media screen and (max-width: 767px) {
      display: none;
    }
  }

  & .create-card-container {
    overflow: hidden;
    & hr {
      width: 100%;
    }
  }
}
</style>
