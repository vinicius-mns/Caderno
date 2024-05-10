<script setup lang="ts">
import { useStyle } from '@/stores/style'
import FloatDescription from '../atoms/FloatDescription.vue'

const { atualStyle } = useStyle()

const props = defineProps<{ description: string }>()
</script>

<template>
  <FloatDescription :content="props.description">
    <button class="coin-button-container">
      <slot></slot>
    </button>
  </FloatDescription>
</template>

<style scoped lang="scss">
$boxShadow: v-bind('atualStyle.boxShadow');
$buttonSize: 48px;
$buttonHoverColor: v-bind('atualStyle.color.three');
$buttonTextColor: v-bind('atualStyle.color.text');
$buttonBorderRadius: v-bind('atualStyle.borderRadius');
$buttonBgColor: v-bind('atualStyle.color.two');
.coin-button-container {
  height: $buttonSize;
  width: $buttonSize;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: $boxShadow;
  background-color: $buttonBgColor;
  border-radius: 50%;
  color: $buttonTextColor;
  border: $buttonTextColor solid 1px;
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
