<script setup lang="ts">
import AtualDate from './AtualDate.vue'
import CreateCard from './CreateCard.vue'
import SearchCard from './SearchCard.vue'
</script>

<template>
  <div class="desktop-topbar">
    <div class="container"><AtualDate /></div>
    <div class="container"><CreateCard /></div>
    <div class="container"><SearchCard /></div>
  </div>
</template>

<style scoped lang="scss">
.desktop-topbar {
  @media screen and (min-width: 769px) {
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
}
</style>
