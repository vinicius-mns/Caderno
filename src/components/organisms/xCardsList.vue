<!-- <script setup lang="ts">
import type { ICard } from '@/api/api_local/entites/cards/CardsTypes'
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import { useCards } from '@/stores/local/cards'
import { useWindows } from '@/stores/windows'
import ButtonOption from '../molecules/ButtonOption.vue'
import PencilIco from '../atoms/icons/PencilIco.vue'
import CardView from '../molecules/CardView.vue'

const window = useWindows()

const cards = useCards()

const props = defineProps<{
  allcards: ICard[]
  allTags: ITag[]
  width: string
}>()

const cardUpdate = (c: ICard) => window.open.cardUpdate(c)

const cardDelete = (c: ICard) => window.open.cardDelete(c)

const cardUpdatedTags = (c: ICard) => {
  cards.updateOne(c)
}
</script>

<template>
  <div class="container-cards">
    <!-- <ButtonOption content="Criar card" @click="window.open.cardCreate" class="card">
      <PencilIco />
    </ButtonOption> -->
    <CardView
      v-for="(card, i) in props.allcards"
      :key="i"
      :card="card"
      :with="props.width"
      class="card"
    />
  </div>
</template>

<style scoped lang="scss">
.container-cards {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  .card {
    width: v-bind('props.width');
    max-width: 95dvw;
  }
}
</style> -->
