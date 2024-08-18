<script setup lang="ts">
import { useStylesPage } from '@/stores/stylesPage/stylesPage'

const stylePage = useStylesPage()
</script>

<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.button {
  // height: 36px;
  display: flex;
  align-items: center;
  background-color: v-bind('stylePage.atualColor.back');
  border-radius: v-bind('stylePage.borderRadius.inside');
  color: v-bind('stylePage.atualColor.text');
  border: none;
  overflow: hidden;
  outline: none;
  cursor: pointer;
  transition: all 0.1s;
  margin: 0;
  padding: 0;
  &:hover {
    background-color: v-bind('stylePage.atualColor.hover');
    // animation: hoverAnitation 0.3s;
  }
  &:active {
    transform: scale(0.95);
    background-color: v-bind('stylePage.atualColor.back');
  }
}
@keyframes hoverAnitation {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.94);
  }
  100% {
    transform: scale(1);
  }
}
</style>
