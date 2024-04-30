<script setup lang="ts">
import CardsActions from '@/components/template/cards/CardsActions.vue'
import CardsPage from '@/components/template/cards/CardsPage.vue'
import CardsSide from '@/components/template/cards/CardsSide.vue'
import PageTemplate from '@/components/template/PageTemplate.vue'
</script>

<template>
  <div class="cards-page-container">
    <PageTemplate>
      <template #sidebar-content>
        <CardsSide />
      </template>
      <template #action-button>
        <CardsActions />
      </template>
      <template #page-content>
        <CardsPage />
      </template>
    </PageTemplate>
  </div>
</template>

<style scoped lang="scss"></style>
