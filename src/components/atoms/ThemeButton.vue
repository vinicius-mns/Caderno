<script setup lang="ts">
import { useStylesPage } from '@/stores/stylesPage/stylesPage'

const stylePage = useStylesPage()

const props = withDefaults(
  defineProps<{ backgroundColor?: 'name' | 'text' | 'back' | 'front' | 'hover' | 'border' }>(),
  { backgroundColor: 'back' }
)
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
  background-color: v-bind('stylePage.atualColor[props.backgroundColor]');
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
  }
}
</style>
