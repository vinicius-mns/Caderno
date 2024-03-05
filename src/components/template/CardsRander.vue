<script setup lang="ts">
import CardsList from '../organisms/card/CardsList.vue'
import CardsRange from '../organisms/card/CardsRange.vue';
</script>

<template>
  <div class="cards-container">
    <CardsRange />
    <CardsList />
  </div>
</template>

<style scoped lang="scss">
.cards-container {
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
