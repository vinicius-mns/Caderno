<script setup lang="ts">
import { useStyle } from '@/stores/style'

const { atualStyle } = useStyle()
</script>

<template>
  <div class="modal-card-container">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.modal-card-container {
  padding: 15px;
  box-sizing: border-box;
  border-radius: v-bind('atualStyle.borderRadius.two');
  background-color: v-bind('atualStyle.color.two');
  box-shadow: v-bind('atualStyle.boxShadow');
}
</style>
