<script setup lang="ts">
import PageTemplate from '@/components/template/PageTemplate.vue'
import SideConfig from '@/components/template/SideConfig.vue'
</script>

<template>
  <div class="cards-page-container">
    <PageTemplate>
      <template v-slot:sidebar-content>
        <SideConfig />
      </template>
      <template v-slot:page-content>
        <p>condig</p>
      </template>
    </PageTemplate>
  </div>
</template>

<style scoped lang="scss"></style>
