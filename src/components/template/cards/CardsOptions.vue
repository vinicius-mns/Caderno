<script setup lang="ts">
import CardsFilter from '@/components/organisms/card/CardsFilter.vue'
import cardChengeWidth from '@/components/organisms/card/CardChangeWidth.vue'
</script>

<template>
  <div class="cards-options-container">
    <cardChengeWidth />
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
