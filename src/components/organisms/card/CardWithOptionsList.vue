<script setup lang="ts">
import CardWithOptions from './CardWithOptions.vue'
import { computed, ref, watchEffect } from 'vue'
import { useConfig } from '@/stores/config'
import { useCards } from '@/stores/local/cards'
const { config } = useConfig()

const cards = useCards()

const allCards = ref(cards.cards)

const carsSize = computed(() => `${config.value.cardWidth}px`)

watchEffect(() => {
  allCards.value = cards.cards.reverse()
})
</script>

<template>
  <div class="container-cards-list">
    <CardWithOptions v-for="(card, ii) in allCards" :key="ii" :card="card" class="card-item" />
  </div>
</template>

<style scoped lang="scss">
$buttonSize: 36px;
.container-cards-list {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  & .card-item {
    width: v-bind('carsSize');
    max-width: 100%;
    margin: 10px;
  }
}
@media screen and (max-width: 768px) {
  .container-cards-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    & .card-item {
      width: 95%;
    }
  }
}
</style>
