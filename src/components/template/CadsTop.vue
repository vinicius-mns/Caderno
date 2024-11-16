<script setup lang="ts">
import { useWindows } from '@/stores/windows'
import TagsFiltredsList from '../organisms/TagsFiltredsList.vue'
import { useTags } from '@/stores/tags/tags'
import { useCards } from '@/stores/cards/cards'
import FloatModalSlot from '../atoms/FloatModalSlot.vue'
import ModalCard from '../atoms/ModalCard.vue'
import TagsFilterCards from '../organisms/TagsFilterCards.vue'
import FilterIco from '../atoms/icons/FilterIco.vue'
import FlexContainer from '../atoms/FlexContainer.vue'
import PencilIco from '../atoms/icons/PencilIco.vue'
import ButtonCoinSlot from '../molecules/ButtonCoinSlot.vue'
import ButtonSlot from '../molecules/ButtonSlot.vue'
import GearIco from '../atoms/icons/GearIco.vue'
import TagWithOptions from '../organisms/TagWithOptions.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import { useFloatMessage } from '@/stores/floatMessage'
import SearchImput from '../molecules/SearchImput.vue'

const window = useWindows()
const cards = useCards()
const floatMessage = useFloatMessage()
const tags = useTags()

const sendFilter = async (filter: { include: Itag[]; exclude: Itag[] }) => {
  const newFilter = {
    includeTags: filter.include,
    excludeTags: filter.exclude
  }

  await tags.setFilter(newFilter)

  await cards.atualizeReactiveCards({
    includeTags: filter.include,
    excludeTags: filter.exclude
  })

  floatMessage.openMessage(floatMessage.messages.tagsFilterSucess)
}

const clearFilter = () => {
  floatMessage.openMessage(floatMessage.messages.tagClearFilterSucess)
}
</script>

<template>
  <FlexContainer class="cards-header" align-items="center" justify-content="space-between">
    <FlexContainer align-items="center" class="filter-container section">
      <FloatModalSlot>
        <template #button-slot>
          <ButtonCoinSlot content="Filtrar cards">
            <FilterIco />
          </ButtonCoinSlot>
        </template>

        <template #container-slot>
          <ModalCard class="modal-card">
            <TagsFilterCards
              :allTags="tags.tags"
              :include-tags="tags.includeTags"
              :exclude-tags="tags.excludeTags"
              :text-filter-tags="tags.textFilterTags"
              @emit-filter="sendFilter"
              @clear-filter="clearFilter"
              @search-tag="tags.realAllTagsByName"
            />
          </ModalCard>
        </template>
      </FloatModalSlot>

      <FlexContainer class="cards-filter">
        <TagsFiltredsList :include-tags="tags.includeTags" :exclude-tags="tags.excludeTags" />
      </FlexContainer>
    </FlexContainer>

    <FlexContainer class="section search-card">
      <SearchImput placeholder="Pesquisar" key-id="sear-card" />
    </FlexContainer>

    <FlexContainer align-items="center" justify-content="end" class="buttons-container section">
      <ButtonSlot
        content="Criar tag"
        class="create-tag-button button-x"
        @click="window.tagCreate.open(null)"
      >
        <PencilIco />
      </ButtonSlot>

      <hr />

      <TagWithOptions
        :tags="tags.tags"
        :text-filter="tags.textFilterTags"
        @search-tag="tags.realAllTagsByName"
        @update-tag="window.tagEditor.open"
        @delete-tag="window.tagDelete.open"
        @delete-cards-withtag="window.tagDeleteCard.open"
      />

      <ButtonCoinSlot content="configurações" class="button-x" @click="window.config.open(null)">
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

  & .section {
    overflow: hidden;
    width: calc(50% - 190px);
  }

  & .search-card {
    width: 320px;
  }

  & .modal-card {
    display: flex;
    flex-direction: column;
    width: 408px;
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
  }

  & hr {
    height: 35px;
    margin: 5px 3px;
  }
}
</style>
