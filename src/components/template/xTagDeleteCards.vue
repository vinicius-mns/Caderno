<!-- <script setup lang="ts">
import { useCards } from '@/stores/local/cards'
import TagDeleteCards from '../organisms/TagDeleteCards.vue'
import { computed, nextTick } from 'vue'
import { usePanelControll } from '@/stores/panelControll'

const cards = useCards()

const panelControll = usePanelControll()

const tag = computed(() => panelControll.route.tagsOptions.props)

const cardsToDelete = computed(() =>
  cards.filterReturn.findByTags([panelControll.route.tagsOptions.props.id])
)

const cardsDelete = (tagId: string) => {
  cards.cardsDeleteByTag(tagId)
  nextTick(() => {
    panelControll.route.tags.pushRoute()
  })
}
</script>

<template>
  <div class="modal-card">
    <TagDeleteCards :cards="cardsToDelete" :tag="tag" @cards-delete="cardsDelete" />
  </div>
</template>

<style scoped lang="scss">
.modal-card {
  width: 100%;
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
}
</style> -->
