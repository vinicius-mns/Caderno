<script setup lang="ts">
import { useStyle } from '@/stores/style'

const { atualStyle } = useStyle()
</script>

<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.button {
  height: 36px;
  box-shadow: v-bind('atualStyle.boxShadow');
  background-color: v-bind('atualStyle.color.three');
  border-radius: v-bind('atualStyle.borderRadius.one');
  color: v-bind('atualStyle.color.text');
  border: none;
  overflow: hidden;
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: v-bind('atualStyle.color.four');
  }
  &:active {
    background-color: v-bind('atualStyle.color.one');
  }
}
</style>
