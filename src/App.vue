<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useStyle } from '@/stores/style'

const { atualStyle } = useStyle()
</script>

<template>
  <div class="body">
    <RouterView />
  </div>
</template>

<style lang="scss">
.body {
  background-color: v-bind('atualStyle.color.one');
  min-height: 100dvh;
}
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
th {
  // color: $textColor;
}
svg {
  fill: v-bind('atualStyle.color.text');
  height: 16px;
  width: 16px;
}
</style>
