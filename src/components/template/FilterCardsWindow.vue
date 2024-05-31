<script setup lang="ts">
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import TagsFilterCards from '@/components/organisms/TagsFilterCards.vue'
import { useCards } from '@/stores/local/cards'
import { useWindows } from '@/stores/windows'
import WindowModal from '../atoms/WindowModal.vue'
import ModalCard from '../atoms/ModalCard.vue'

const cards = useCards()

const window = useWindows()

const props = defineProps<{
  allTags: ITag[]
}>()

const close = () => window.filterCardsWindow.close()

const filterCards = (v: { includeTags: string[]; excludesTags: string[] }) => {
  cards.filterIncludeTag(v.includeTags)
  cards.filterExcludeTags(v.excludesTags)
}
</script>

<template>
  <WindowModal title="Filtrar cards" v-if="window.filterCardsWindow.value" @emit-close="close">
    <ModalCard class="container">
      <TagsFilterCards :all-tags="props.allTags" @emit-tags="filterCards" />
    </ModalCard>
  </WindowModal>
</template>

<style scoped lang="scss">
$margin: 10px;
$buttonSize: 36px;
.container {
  width: 300px;
  height: 48dvh;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    width: 100dvw;
  }
}
</style>
