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
import ButtonSlot from '../molecules/ButtonSlot.vue'
import GearIco from '../atoms/icons/GearIco.vue'
import TagWithOptions from '../organisms/TagWithOptions.vue'

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
  <FlexContainer class="cards-header" align-items="center" justify-content="space-between">
    <FlexContainer align-items="center" class="filter-container">
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

    <FlexContainer align-items="center" class="buttons-container">
      <ButtonSlot
        content="Criar tag"
        class="create-tag-button button-x"
        :border="true"
        @click="window.tagCreate.open(null)"
      >
        <PencilIco />
      </ButtonSlot>

      <hr />

      <FloatModalSlot>
        <template #button-slot>
          <ButtonCoinSlot content="Tags" :border="true" class="button-x">
            <TagIco />
          </ButtonCoinSlot>
        </template>

        <template #container-slot>
          <ModalCard class="tags-card">
            <FlexContainer flex-direction="column" class="tags-flex-container">
              <FlexContainer flex-wrap="wrap" class="tags-area">
                <TagWithOptions
                  v-for="(tag, i) in allTags"
                  :key="i"
                  :tag="tag"
                  @update-tag="window.tagEditor.open"
                  @delete-tag="window.tagDelete.open"
                  @delete-cards-withtag="window.tagDeleteCard.open"
                />
              </FlexContainer>

              <ButtonSlot
                content="Criar tag"
                class="create-tag-button"
                @click="window.tagCreate.open(null)"
              >
                <PencilIco />
              </ButtonSlot>
            </FlexContainer>
          </ModalCard>
        </template>
      </FloatModalSlot>

      <ButtonCoinSlot
        content="configurações"
        class="button-x"
        :border="true"
        @click="window.config.open(null)"
      >
        <GearIco />
      </ButtonCoinSlot>
    </FlexContainer>
  </FlexContainer>
</template>

<style scoped lang="scss">
.cards-header {
  width: calc(100% - 150px);
  justify-self: center;
  height: 100%;

  @media screen and (max-width: 767px) {
    width: calc(100% - 10px);
  }

  & .modal-card {
    display: flex;
    flex-direction: column;
    width: 360px;
    max-width: 95dvw;
    max-height: 60dvh;
  }

  & .filter-container {
    & .cards-filter {
      max-width: calc(100dvw - 460px);
      overflow: hidden;

      @media screen and (max-width: 767px) {
        display: none;
      }
    }
  }

  & .buttons-container {
    & .create-tag-button {
      width: 130px;
      width: auto;
      padding-right: 10px;
    }

    & .button-x {
      margin: 5px 3px;
    }

    & .tags-card {
      display: flex;
      flex-direction: column;
      width: 340px;
      max-height: 55dvh;

      & .tags-flex-container {
        height: 100%;
        overflow: hidden;
        & .tags-area {
          height: 100%;
          width: 100%;
          overflow: auto;
          flex-shrink: 1;
        }
        & .create-tag-button {
          margin-top: 10px;
        }
      }
    }
  }

  & hr {
    height: 35px;
    margin: 5px 3px;
  }
}
</style>
