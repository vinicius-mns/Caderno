<script setup lang="ts">
import ConfigBottom from '@/components/template/ConfigBottom.vue'
import ConfigMain from '@/components/template/ConfigMain.vue'
import PageTemplate from '@/components/template/PageTemplate.vue'
</script>

<template>
  <PageTemplate>
    <template #main>
      <ConfigMain />
    </template>
    <template #aside>
      <ConfigBottom />
    </template>
  </PageTemplate>
</template>

<style scoped lang="scss"></style>
