<script setup lang="ts">
import { useStyle } from '@/stores/style'

const { style } = useStyle()
</script>

<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
$boxShadow: v-bind('style.boxShadow');
$buttonSize: v-bind('style.button.size');
$buttonHoverColor: v-bind('style.color.highlight');
$buttonTextColor: v-bind('style.button.textColor');
$buttonBorderRadius: v-bind('style.button.borderRadius');
$buttonBgColor: v-bind('style.color.base');
.button {
  height: $buttonSize;
  box-shadow: $boxShadow;
  background-color: $buttonBgColor;
  border-radius: $buttonBorderRadius;
  color: $buttonTextColor;
  border: none;
  overflow: hidden;
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: $buttonHoverColor;
  }
  &:active {
    background-color: $buttonBgColor;
  }
}
</style>
