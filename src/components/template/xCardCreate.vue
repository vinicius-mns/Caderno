<!-- <script setup lang="ts">
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import type { ICard } from '@/api/local'
import { useCards } from '@/stores/local/cards'
import CardEditor from '../organisms/CardEditor.vue'
import { usePanelControll } from '@/stores/panelControll'

const cards = useCards()

const panelControll = usePanelControll()

const props = defineProps<{ alltags: ITag[] }>()

const cardInit: ICard = { content: '', date: new Date(), id: '', tags: [] }

const cardCreate = (card: ICard) => {
  cards.createOne(card)
}
</script>

<template>
  <div class="container" v-if="panelControll.route.cardCreate.show()">
    <CardEditor :card="cardInit" :all-tags="props.alltags" @emit-card="cardCreate" />
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
