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
$boxShadow: v-bind('atualStyle.boxShadow');
$buttonSize: 36px;
$buttonHoverColor: v-bind('atualStyle.color.three');
$buttonTextColor: v-bind('atualStyle.color.text');
$buttonBorderRadius: v-bind('atualStyle.borderRadius.one');
$buttonBgColor: v-bind('atualStyle.color.three');
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
    background-color: v-bind('atualStyle.color.four');
  }
  &:active {
    background-color: v-bind('atualStyle.color.one');
  }
}
</style>
