<script setup lang="ts">
import CardCreateN from '@/components/organisms/card/CardCreateN.vue'
import CardWithOptionsList from '../../organisms/card/CardWithOptionsList.vue'
import SearchCardText from '../../organisms/card/SearchCardText.vue'
</script>

<template>
  <div class="cards-container">
    <header>
      <SearchCardText class="filter-card-text" />
    </header>
    <CardWithOptionsList />
    <CardCreateN />
  </div>
</template>

<style scoped lang="scss">
.cards-container {
  width: 100%;
  header {
    height: 60px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 1;
    & .filter-card-text {
      width: 80%;
      max-width: 400px;
    }
  }
  .card-create {
    z-index: 1;
    // width: 140px;
    position: sticky;
    margin: 0;
    padding: 0;
    position: fixed;
    bottom: 40px;
    right: 10%;
    // left: calc(90% - 60px);
  }
}
</style>
