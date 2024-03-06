<script setup lang="ts">
import CardsList from '../organisms/card/CardsList.vue'
import CardsRange from '../organisms/card/CardsRange.vue'
</script>

<template>
  <div class="cards-container">
    <CardsList />
    <CardsRange class="range" />
  </div>
</template>

<style scoped lang="scss">
.cards-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-top: 30px;
  & .range {
    position: fixed;
    top: 0;
  }
}
</style>
