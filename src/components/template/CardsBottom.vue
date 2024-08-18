<script setup lang="ts">
import TagsFilterCards from '../organisms/TagsFilterCards.vue'
import TagsWithOptions from '../organisms/TagsWithOptions.vue'
import FilterIco from '../atoms/icons/FilterIco.vue'
import TagIco from '../atoms/icons/TagIco.vue'
import CoinButton from '../molecules/CoinButton.vue'
import { useWindows } from '@/stores/windows'
import FloatModalSlot from '../atoms/FloatModalSlot.vue'
import ModalCard from '../atoms/ModalCard.vue'
import AddCardIco from '@/components/atoms/icons/AddCardIco.vue'
// import SearchImput from '../molecules/SearchImput.vue'
import ButtonOption from '../molecules/ButtonOption.vue'
import PencilIco from '../atoms/icons/PencilIco.vue'
import GearIco from '@/components/atoms/icons/GearIco.vue'
import { useTags } from '@/stores/tags/tags'
import type { Itag } from '@/stores/tags/Interfaces'
import { computed } from 'vue'
import { useCards } from '@/stores/cards/cards'

const window = useWindows()

const cards = useCards()

const tags = useTags()

const allTags = computed(() => tags.tags)

// const getTagIds = (tag: Itag[]) => tag.map(({ id }) => id)

const includeTags = computed(() => tags.includeTags)

const excludeTags = computed(() => tags.excludeTags)

// const updateAllCards = async () => {
//   await tags.init()
//   const include = getTagIds(tags.includeTags)
//   const exclude = getTagIds(tags.excludeTags)
//   await cards.init({ includeTags: include, excludeTags: exclude })
// }

const openTagCreate = () => window.tagCreate.open(['', ''])

const openTagDelete = (tag: Itag) => window.tagDelete.open(tag)

const openTagUpdate = (tag: Itag) => window.tagEditor.open(tag)

const openTagDeleteCard = async (tag: Itag) => {
  const allCards = await cards.read({ includeTags: [tag[1]], excludeTags: [] })
  if (allCards) {
    window.tagDeleteCard.open({ tag, cards: allCards })
  }
}

const openCardCreate = async () => {
  window.cardCreate.open({ content: '', date: new Date(), tags: [], id: '' })
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

// const searchTagText = (v: string) => tags.filterText(v)

// const includeTags = {
//   addToFilter: async (id: string) => {
//     await cardsFilter.filterMethods('includeTags').addToFilter(id)
//     cards.filterIncludeTag(cardsFilter.filterValues.includeTags)
//   },
//   removeToFilter: async (id: string) => {
//     await cardsFilter.filterMethods('includeTags').removeToFilter(id)
//     cards.filterIncludeTag(cardsFilter.filterValues.includeTags)
//   }
// }

// const excludeTags = {
//   addToFilter: async (id: string) => {
//     await cardsFilter.filterMethods('excludeTags').addToFilter(id)
//     cards.filterExcludeTags(cardsFilter.filterValues.excludeTags)
//   },
//   removeToFilter: async (id: string) => {
//     await cardsFilter.filterMethods('excludeTags').removeToFilter(id)
//     cards.filterExcludeTags(cardsFilter.filterValues.excludeTags)
//   }
// }

const cleanAllTags = () => {
  tags.filter('includeTags').clear()
  tags.filter('excludeTags').clear()
}
</script>

<template>
  <div class="cards-bottom">
    <CoinButton
      class="coin-button"
      size="50px"
      description="configuraćão"
      @click="() => window.config.open(null)"
    >
      <GearIco />
    </CoinButton>
    <FloatModalSlot>
      <template #button-slot>
        <CoinButton description="Tags" class="coin-button" size="50px">
          <TagIco />
        </CoinButton>
      </template>
      <template #container-slot>
        <ModalCard class="modal-card">
          <!-- <SearchImput
            class="input-option"
            placeholder="Pesquisar tag"
            key-id="search-tag"
            @emit-content="searchTagText"
          /> -->
          <ButtonOption
            content="Criar tag"
            class="input-option"
            @click="openTagCreate"
            :visible="true"
          >
            <PencilIco />
          </ButtonOption>
          <div class="tags">
            <TagsWithOptions
              :all-tags="allTags"
              @update="openTagUpdate"
              @delete="openTagDelete"
              @delete-cards-with-tag="openTagDeleteCard"
            />
          </div>
        </ModalCard>
      </template>
    </FloatModalSlot>
    <FloatModalSlot>
      <template #button-slot>
        <CoinButton description="Filtrar cards" class="coin-button" size="50px">
          <FilterIco />
        </CoinButton>
      </template>
      <template #container-slot>
        <ModalCard class="modal-card">
          <!-- <SearchImput
            class="input-option"
            placeholder="Pesquisar tag"
            key-id="search-tag-filter"
            @emit-content="searchTagText"
          /> -->
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
    <CoinButton description="Criar Card" class="coin-button" size="50px" @click="openCardCreate">
      <AddCardIco />
    </CoinButton>
  </div>
</template>

<style scoped lang="scss">
.cards-bottom {
  height: 100%;
  display: flex;
  align-items: center;
  & .coin-button {
    margin: 5px;
  }
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
</style>
