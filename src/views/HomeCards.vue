<script setup lang="ts">
import type { ICard } from '../api/local/Card'
import CardComponent from '@/components/widgets/CardComponent.vue'
import { useLocalCards } from '@/stores/local/cards'
import { computed, onMounted, ref, onUnmounted } from 'vue'

const useCards = useLocalCards()

const myCards = computed(() => useCards.getAll)

const renderCards = (coluns: number, cards: ICard[]) => {
  const colunsList = () => {
    const list = []

    for (let i = 0; i < coluns; i++) {
      list.push([])
    }

    return list as ICard[][]
  }

  const addCardsOnLists = () => {
    const lists = colunsList()

    for (let i = 0; i < coluns; i++) {
      const listOfCardsSize = cards.length

      for (let ii = i; ii < listOfCardsSize; ii += coluns) {
        lists[i].push(cards[ii])
      }
    }

    return lists
  }

  return addCardsOnLists()
}

const coluns = ref(3)
const ColumOfCards = computed(() => renderCards(coluns.value, myCards.value))

const defineNumberOfColuns = () => {
  const withScreen = window.innerWidth
  if (withScreen < 768) coluns.value = 1
  if (withScreen >= 768) coluns.value = 2
  if (withScreen >= 1024) coluns.value = 3
}

onMounted(() => {
  defineNumberOfColuns()
  window.addEventListener('resize', defineNumberOfColuns)
})

onUnmounted(() => {
  window.removeEventListener('resize', defineNumberOfColuns)
})
</script>

<template>
  <div class="cards-container">
    <div class="colum" v-for="(colum, i) in ColumOfCards" :key="i">
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
  height: 1900px;
  // display
  display: flex;
  //estilo
  background-color: rgb(239, 201, 104);

  & .colum {
    //medidas
    width: 100%;
    overflow: hidden;
    //display
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    align-items: center;
  }
}
</style>
