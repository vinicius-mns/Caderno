<script setup lang="ts">
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import FloatModalSlot from '@/components/atoms/FloatModalSlot.vue'
import CoinButton from '@/components/molecules/CoinButton.vue'
import FilterIco from '@/components/atoms/icons/FilterIco.vue'
import TagsFilterCards from '@/components/organisms/tag/TagsFilterCards.vue'
import { useCards } from '@/stores/local/cards'

const cards = useCards()

const props = defineProps<{
  allTags: ITag[]
}>()

const filterCards = (v: { includeTags: string[]; excludesTags: string[] }) => {
  cards.filterIncludeTag(v.includeTags)
  cards.filterExcludeTags(v.excludesTags)
}
</script>

<template>
  <FloatModalSlot>
    <template #button-slot>
      <CoinButton description="Filrar cards">
        <FilterIco />
      </CoinButton>
    </template>
    <template #container-slot>
      <div class="container">
        <TagsFilterCards :all-tags="props.allTags" @emit-tags="filterCards" />
      </div>
    </template>
  </FloatModalSlot>
</template>

<style scoped lang="scss">
$margin: 10px;
$buttonSize: 36px;
.container {
  width: 100%;
  height: 45dvh;
  display: flex;
  flex-direction: column;
}
</style>
