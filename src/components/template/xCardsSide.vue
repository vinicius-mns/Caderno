<!-- <script setup lang="ts">
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import SideActions from '../organisms/SideActions.vue'
import TagsFilterCards from '../organisms/TagsFilterCards.vue'
import SideContainer from '../organisms/SideContainer.vue'
import TagsWithOptions from '../organisms/TagsWithOptions.vue'
import FilterIco from '../atoms/icons/FilterIco.vue'
import MenuIco from '../atoms/icons/MenuIco.vue'
import PencilIco from '../atoms/icons/PencilIco.vue'
import TagIco from '../atoms/icons/TagIco.vue'
import CoinButton from '../molecules/CoinButton.vue'
import { ref } from 'vue'
import { useWindows } from '@/stores/windows'
import { useCards } from '@/stores/local/cards'

const window = useWindows()

const cards = useCards()

const props = defineProps<{
  allTags: ITag[]
}>()

type Ishow = 'tags' | 'filter'
const show = ref<Ishow>('tags')
const showSet = (v: Ishow) => (show.value = v)
const showIs = (v: Ishow) => show.value === v

const filterCards = (v: { includeTags: string[]; excludesTags: string[] }) => {
  cards.filterIncludeTag(v.includeTags)
  cards.filterExcludeTags(v.excludesTags)
}

const tagCreateOpen = () => window.open.tagCreate({ content: '', emoji: '', id: '' })

const deleteTagOpen = (tag: ITag) => window.open.tagDelete(tag)

const deleteCardsWithTagOpen = (tag: ITag) => window.open.tagDeleteCards(tag)

const updateTagOpen = (tag: ITag) => window.open.tagUpdate(tag)
</script>

<template>
  <SideContainer class="cards-side">
    <div class="sub-container">
      <TagsFilterCards :allTags="props.allTags" v-if="showIs('filter')" @emit-tags="filterCards" />
      <div class="tags" v-if="showIs('tags')">
        <TagsWithOptions
          :all-tags="props.allTags"
          @update="updateTagOpen"
          @delete="deleteTagOpen"
          @delete-cards-with-tag="deleteCardsWithTagOpen"
        />
      </div>
    </div>
    <SideActions>
      <CoinButton description="Menu">
        <MenuIco />
      </CoinButton>
      <CoinButton description="Minhas tags" @click="showSet('tags')">
        <TagIco />
      </CoinButton>
      <CoinButton description="Filtrar cards" @click="showSet('filter')">
        <FilterIco />
      </CoinButton>
      <CoinButton description="Criar tag" @click="tagCreateOpen">
        <PencilIco />
      </CoinButton>
    </SideActions>
  </SideContainer>
</template>

<style scoped lang="scss">
.cards-side {
  display: flex;
  flex-direction: column;
  & .sub-container {
    height: 100%;
    width: 100%;
    overflow-y: auto;
    & .tags {
      display: flex;
      flex-direction: column;
      & .create-tag {
        width: 90%;
        margin-left: 5%;
      }
    }
  }
}
</style> -->
