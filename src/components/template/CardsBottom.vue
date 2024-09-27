<script setup lang="ts">
import { useWindows } from '@/stores/windows'
import CardView from '../molecules/CardView.vue'
import { computed, ref } from 'vue'
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
import AddTagIco from '../atoms/icons/AddTagIco.vue'
import TagIco from '../atoms/icons/TagIco.vue'
import GearIco from '../atoms/icons/GearIco.vue'
import BaseHr from '../atoms/BaseHr.vue'
import TagWithOptions from '../organisms/TagWithOptions.vue'
import type { Itag } from '@/stores/tags/Interfaces'

const style = useStylesPage()

const window = useWindows()

const cards = useCards()

const config = useConfig()

const tags = useTags()

const width = computed(() => `${config.config.value.cardWidth}px`)

const openCardUpdate = (card: Icard) => window.cardEdit.open(card)

const openTagCreate = () => {
  window.tagCreate.open(['', ''])
}

const openCardCreate = () => {
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

// const useTag = () => {
//   const tagRef = ref<Itag>(['', ''])

//   const openCreateTag = (tag: Itag) => {
//     window.tagCreate.open(tag)
//   }
// }
</script>

<template>
  <FlexContainer class="main-container" align-items="center" justify-content="center">
    <ModalCard class="card-container">
      <FlexContainer flex-direction="row" align-items="center">
        <ButtonOption
          content="Criar tag"
          class="button create-tag"
          :visible="true"
          @click="openTagCreate"
        >
          <TagIco />
        </ButtonOption>

        <ButtonOption
          content="Criar cards"
          class="button create-card"
          :visible="true"
          @click="openCardCreate"
        >
          <PencilIco />
        </ButtonOption>

        <hr />

        <FloatModalSlot>
          <template #button-slot>
            <CoinButton description="Tags" :border="false" class="button">
              <TagIco />
            </CoinButton>
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

                <ButtonOption
                  content="Criar tag"
                  :visible="true"
                  class="create-tag-button"
                  @click="window.tagCreate.open(['', ''])"
                >
                  <PencilIco />
                </ButtonOption>
              </FlexContainer>
            </ModalCard>
          </template>
        </FloatModalSlot>

        <CoinButton
          description="Configurações"
          :border="false"
          class="button"
          @click="window.config.open"
        >
          <GearIco />
        </CoinButton>
      </FlexContainer>
    </ModalCard>
  </FlexContainer>
</template>

<style scoped lang="scss">
.main-container {
  position: fixed;
  bottom: 0;
  height: 80px;
  width: 100dvw;
}
.card-container {
  bottom: 20px;
  width: 440px;
  max-width: 95dvw;
  left: 50%;
  padding: 5px;
  border: none;
  & hr {
    height: 35px;
    margin: 5px 3px;
  }
  & .tags-card {
    width: 340px;
    height: 55dvh;
    & .tags-flex-container {
      height: 100%;
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
  & .button {
    margin: 5px 3px;
  }
  & .create-tag {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0;
  }
  & .create-card {
    flex-grow: 1.5;
    flex-shrink: 1;
    flex-basis: 0;
  }
}
</style>
