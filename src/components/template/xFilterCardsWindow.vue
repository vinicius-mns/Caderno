<!-- <script setup lang="ts">
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import TagsFilterCards from '@/components/organisms/TagsFilterCards.vue'
import { useCards } from '@/stores/local/cards'
import { usePanelControll } from '@/stores/panelControll'

const cards = useCards()

const panelControll = usePanelControll()

const props = defineProps<{
  allTags: ITag[]
}>()

const filterCards = (v: { includeTags: string[]; excludesTags: string[] }) => {
  cards.filterIncludeTag(v.includeTags)
  cards.filterExcludeTags(v.excludesTags)
}
</script>

<template>
  <div class="container" v-if="panelControll.route.filterCardsByTags.show()">
    <TagsFilterCards :all-tags="props.allTags" @emit-tags="filterCards" />
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
}
</style> -->
