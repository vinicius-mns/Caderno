<!-- <script setup lang="ts">
import { useCards } from '@/stores/local/cards'
import { usePanelControll } from '@/stores/panelControll'
import { computed, nextTick } from 'vue'
import CardEditor from '../organisms/CardEditor.vue'
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import type { ICard } from '@/api/local'

const cards = useCards()

const panelControll = usePanelControll()

const props = defineProps<{
  allTags: ITag[]
}>()

const card = computed(() => panelControll.route.card.props)

const updateCard = (card: ICard) => {
  cards.updateOne(card)
  panelControll.route.nothing.pushRoute()
}
</script>

<template>
  <div class="container">
    <CardEditor :all-tags="props.allTags" :card="card" @emit-card="updateCard" />
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
