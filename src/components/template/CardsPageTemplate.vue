<script setup lang="ts">
import CardCreate from '../organisms/card/CardCreate.vue'
// import CardsFilter from '../organisms/card/CardsFilter.vue'
// import CardsRange from '../organisms/card/CardsRange.vue'
import CardsList from '../organisms/card/CardsList.vue'
import SearchCardText from '../organisms/card/SearchCardText.vue'
</script>

<template>
  <div class="cards-container">
    <header>
      <SearchCardText class="filter-card-text" />
      <!-- <CardsRange class="cards-range" /> -->
    </header>
    <CardCreate class="card-create" :big="true" />
    <CardsList />
  </div>
</template>

<style scoped lang="scss">
.cards-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
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
  .cards-range {
    z-index: 1;
    position: sticky;
    top: 0;
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
  .card-create {
    z-index: 1;
    position: sticky;
    margin: 0;
    padding: 0;
    position: fixed;
    bottom: 40px;
    left: calc(90% - 60px);
  }
}
</style>
