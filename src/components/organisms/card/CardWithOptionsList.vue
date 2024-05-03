<script setup lang="ts">
import { useStyle } from '@/stores/style'
import CardWithOptions from './CardWithOptions.vue'
import { computed, ref, watchEffect } from 'vue'
import { useConfig } from '@/stores/config'
import { useCards } from '@/stores/local/cards'

const { config } = useConfig()

const { style } = useStyle()

const cards = useCards()

const allCards = ref(cards.cards)

const carsSize = computed(() => `${config.value.cardWidth}px`)

watchEffect(() => {
  allCards.value = cards.cards.reverse()
})
</script>

<template>
  <div class="container-cards-list">
    <CardWithOptions v-for="(card, ii) in allCards" :key="ii" :card="card" class="card" />
  </div>
</template>

<style scoped lang="scss">
$buttonSize: v-bind('style.button.size');
.container-cards-list {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  & .card {
    width: v-bind('carsSize');
    max-width: 100%;
    margin: 10px;
  }
}
@media screen and (max-width: 768px) {
  .container-cards-list {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    // justify-content: center;
    & .card {
      width: 100%;
      margin: 10px;
    }
  }
}

// & .c {
//   background-color: black;
//   margin: 20px;
//   width: 380px;
//   height: 100px;
// }
// max-width: 1628px;
// column-gap: 20px;
// padding: 20px 20px 20px 20px;
// box-sizing: border-box;
// columns: v-bind(columnsNumber);
// background-color: v-bind('style.color.background');
// @media screen and (max-width: 768px) {
//   .container-cards-list {
//     width: 98%;
//     padding: 0;
//     display: flex;
//     flex-direction: column;
//     padding: 2px 0 120px 0;
//     background-color: v-bind('style.color.background');
//     & .card {
//       padding: 3px;
//       margin-top: 3px;
//       box-sizing: border-box;
//     }
//   }
// }
</style>
