<script setup lang="ts">
import CardsPageTemplate from '@/components/template/CardsPageTemplate.vue'
import SidebarCards from '@/components/template/SidebarCards.vue'
import PageTemplate from '@/components/template/PageTemplate.vue'
</script>

<template>
  <div class="cards-page-container">
    <PageTemplate>
      <template v-slot:sidebar-content>
        <SidebarCards />
      </template>
      <template v-slot:page-content>
        <CardsPageTemplate />
      </template>
    </PageTemplate>
  </div>
</template>

<style scoped lang="scss"></style>
