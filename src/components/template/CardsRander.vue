<script setup lang="ts">
import CardsFilter from '../organisms/card/CardsFilter.vue'
import CardsList from '../organisms/card/CardsList.vue'
import CardsRange from '../organisms/card/CardsRange.vue'
</script>

<template>
  <div class="cards-container">
    <header>
      <CardsRange />
      <CardsFilter />
    </header>
    <main>
      <CardsList />
    </main>
  </div>
</template>

<style scoped lang="scss">
.cards-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 2s;
  & header {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  & main {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    // height: calc(100dvh - $headerSize);
    // overflow: auto;
  }
}
</style>
