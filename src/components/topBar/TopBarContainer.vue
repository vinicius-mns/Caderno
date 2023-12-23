<script setup lang="ts">
import CreateCard from './CreateCard.vue'
import AtualDate from './AtualDate.vue'
</script>

<template>
  <div class="topbar-container">
    <div class="date-container container">
      <AtualDate />
    </div>
    <div class="create-card-container container">
      <CreateCard />
    </div>
    <div class="search-container container">Pesquisa</div>
  </div>
</template>

<style scoped lang="scss">
.topbar-container {
  // medidas
  width: 100%;
  height: 100%;
  // display
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  & .container {
    width: 100%;
    height: 100%;
  }
}
</style>
