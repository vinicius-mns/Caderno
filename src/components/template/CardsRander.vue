<script setup lang="ts">
import CardsList from '../organisms/card/CardsList.vue'
</script>

<template>
  <div class="cards-container">
    <CardsList />
  </div>
</template>

<style scoped lang="scss">
.cards-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
