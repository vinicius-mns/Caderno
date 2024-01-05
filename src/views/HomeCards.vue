<script setup lang="ts">
import { computed } from 'vue'
import CardComponent from '@/components/widgets/CardComponent.vue'
import { mockCards } from './mockCards'
import type { ICard } from '../api/local/Card'

const numberOfColumns = () => {
  const screen = window.innerWidth
  if (screen < 768) return 1
  if (screen >= 768 && screen < 1024) return 2
  return 3
}

const renderCards = (numberOfColumns: number, cards: ICard[]) => {
  const addCardsOnColum = (colum: ICard[], columnIndex: number) => {
    for (let i = columnIndex; i < cards.length; i += numberOfColumns) {
      colum.push(cards[i])
    }
    return colum
  }
  const columnsEmpty = new Array(numberOfColumns).fill(0).map(() => [])
  const columns = columnsEmpty.map((colum, index) => addCardsOnColum(colum, index))
  return columns
}

const cards = mockCards.map((card) => ({ ...card, date: new Date(card.date) }))
const cardsInColumns = computed(() => renderCards(numberOfColumns(), cards))
</script>

<template>
  <div class="cards-container">
    <div class="colum" v-for="(colum, i) in cardsInColumns" :key="i">
      <CardComponent
        v-for="(card, ii) in colum"
        :key="ii"
        :content="card.content"
        :tags="card.tags"
        :date="new Date(card.date)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.cards-container {
  //medidas
  width: 100%;
  max-width: 3080px;
  // display
  display: flex;

  & .colum {
    //medidas
    width: 100%;
    padding-bottom: 40px;
    overflow: hidden;
    //display
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    align-items: center;
  }
}
</style>
