<script setup lang="ts">
import CardsFilter from '@/components/organisms/card/CardsFilter.vue'
import CardsRange from '@/components/organisms/card/CardsRange.vue'
</script>

<template>
  <div class="cards-options-container">
    <CardsRange />
    <CardsFilter />
  </div>
</template>

<style scoped lang="scss">
.cards-options-container {
  background-color: black;
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
