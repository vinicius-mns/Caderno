<script setup lang="ts">
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import TagsFilterCards from '../organisms/TagsFilterCards.vue'
import TagsWithOptions from '../organisms/TagsWithOptions.vue'
import FilterIco from '../atoms/icons/FilterIco.vue'
import TagIco from '../atoms/icons/TagIco.vue'
import CoinButton from '../molecules/CoinButton.vue'
import { useWindows } from '@/stores/windows'
import { useCards } from '@/stores/local/cards'
import FloatModalSlot from '../atoms/FloatModalSlot.vue'
import ModalCard from '../atoms/ModalCard.vue'
import AddCardIco from '@/components/atoms/icons/AddCardIco.vue'
import AddTagIco from '@/components/atoms/icons/AddTagIco.vue'
import SearchImput from '../molecules/SearchImput.vue'
import ButtonOption from '../molecules/ButtonOption.vue'
import PencilIco from '../atoms/icons/PencilIco.vue'
import GearIco from '@/components/atoms/icons/GearIco.vue'
import MenuIco from '../atoms/icons/MenuIco.vue'
import { useTags } from '@/stores/local/tags'

const window = useWindows()

const cards = useCards()

const tags = useTags()

const props = defineProps<{
  allTags: ITag[]
}>()

const filterCards = (v: { includeTags: string[]; excludesTags: string[] }) => {
  cards.filterIncludeTag(v.includeTags)
  cards.filterExcludeTags(v.excludesTags)
}

const tagCreateOpen = () => window.open.tagCreate({ content: '', emoji: '', id: '' })

const deleteTagOpen = (tag: ITag) => window.open.tagDelete(tag)

const deleteCardsWithTagOpen = (tag: ITag) => window.open.tagDeleteCards(tag)

const updateTagOpen = (tag: ITag) => window.open.tagUpdate(tag)

const searchTagText = (v: string) => tags.filterText(v)
</script>

<template>
  <div class="cards-bottom">
    <CoinButton
      class="coin-button"
      size="50px"
      description="configuraćão"
      @click="window.open.config"
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
          <SearchImput
            class="input-option"
            placeholder="Pesquisar tag"
            key-id="search-tag"
            @emit-content="searchTagText"
          />
          <ButtonOption content="Criar tag" class="input-option" @click="tagCreateOpen">
            <PencilIco />
          </ButtonOption>
          <div class="tags">
            <TagsWithOptions
              :all-tags="props.allTags"
              @update="updateTagOpen"
              @delete="deleteTagOpen"
              @delete-cards-with-tag="deleteCardsWithTagOpen"
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
          <SearchImput
            class="input-option"
            placeholder="Pesquisar tag"
            key-id="search-tag-filter"
            @emit-content="searchTagText"
          />
          <div class="tags">
            <TagsFilterCards :allTags="props.allTags" @emit-tags="filterCards" />
          </div>
        </ModalCard>
      </template>
    </FloatModalSlot>
    <CoinButton
      description="Criar Card"
      class="coin-button"
      size="50px"
      @click="window.open.cardCreate"
    >
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
