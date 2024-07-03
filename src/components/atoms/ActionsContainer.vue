<script setup lang="ts">
import { useStyle } from '@/stores/style'

const { atualStyle } = useStyle()
</script>

<template>
  <div class="actions-container">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.actions-container {
  background-color: v-bind('atualStyle.color.three');
  width: 100%;
  height: 68px;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
