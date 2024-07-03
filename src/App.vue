<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useStyle } from '@/stores/style'

const style = useStyle()
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
a,
strong {
  padding: 3px;
  border-radius: 4px;
}
table {
  // background-color: v-bind('atualStyle.color.text');
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  text-align: left;
  padding: 8px;
}
svg {
  fill: v-bind('style.atualStyle.color.text');
  height: 18px;
  width: 18px;
  flex-shrink: 0;
}
</style>
