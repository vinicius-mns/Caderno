<script setup lang="ts">
import CardsPage from '@/components/template/CardsPage.vue'
import CardsSide from '@/components/template/CardsSide.vue'
import PageTemplate from '@/components/template/PageTemplate.vue'
</script>

<template>
  <div class="cards-page-container">
    <PageTemplate>
      <template v-slot:sidebar-content>
        <CardsSide />
      </template>
      <template v-slot:page-content>
        <CardsPage />
      </template>
    </PageTemplate>
  </div>
</template>

<style scoped lang="scss"></style>
