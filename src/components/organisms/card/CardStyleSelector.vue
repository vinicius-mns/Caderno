<script setup lang="ts">
import type { ICard } from '@/api/api_local/entites/cards/CardsTypes'
import { useCardStyle } from '@/stores/cardStyle'
import { computed } from 'vue'
import CardView from './CardView.vue'
import ThemeP from '@/components/atoms/ThemeP.vue'

const cardStyle = useCardStyle()

const allCardsStyles = computed(() => cardStyle.cardsStyle)

const mockCard: ICard = {
  content: 'mock card',
  date: new Date(),
  id: '0',
  tags: ['']
}

const setCard = (index: number) => {
  cardStyle.setCardStyle(index)
}
</script>

<template>
  <div class="container-card-style-selector">
    <ThemeP content="Selecionar estilo do card" />
    <CardView
      class="card"
      :card="mockCard"
      v-for="(CStyle, i) in allCardsStyles"
      :key="i"
      :style="CStyle"
      @click="() => setCard(i)"
    />
  </div>
</template>

<style scoped lang="scss">
.container-card-style-selector {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  & .card {
    margin: 10px 0 0;
    width: 100%;
  }
}
</style>
@/stores/cardStyle
