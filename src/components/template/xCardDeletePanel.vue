<!-- <script setup lang="ts">
import { usePanelControll } from '@/stores/panelControll'
import { computed, nextTick } from 'vue'
import { useCards } from '@/stores/local/cards'
import CardDelete from '../organisms/CardDelete.vue'

const panelControll = usePanelControll()

const cards = useCards()

const card = computed(() => panelControll.route.card.props)

const cardDelete = (id: string) => {
  cards.deleteOne(id)
  nextTick(() => {
    panelControll.route.nothing.pushRoute()
  })
}
</script>

<template>
  <div class="container-cards">
    <CardDelete :card="card" @emit-delete-id="cardDelete" />
  </div>
</template>

<style scoped lang="scss">
.container-cards {
  height: 100%;
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
}
</style> -->
