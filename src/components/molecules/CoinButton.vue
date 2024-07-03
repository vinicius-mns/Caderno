<script setup lang="ts">
import { useStyle } from '@/stores/style'
import FloatDescription from '../atoms/FloatDescription.vue'

const style = useStyle()

const props = withDefaults(
  defineProps<{
    size?: string
    description: string
  }>(),
  {
    size: '40px'
  }
)
</script>

<template>
  <FloatDescription :content="props.description">
    <button class="coin-button-container">
      <slot></slot>
    </button>
  </FloatDescription>
</template>

<style scoped lang="scss">
$buttonSize: v-bind('props.size');
.coin-button-container {
  height: $buttonSize;
  width: $buttonSize;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: none;
  color: white;
  overflow: hidden;
  outline: none;
  cursor: pointer;
  background-color: v-bind('style.atualStyle.color.four');
  &:hover {
    background-color: v-bind('style.atualStyle.color.four');
  }
  &:active {
    background-color: v-bind('style.atualStyle.color.one');
  }
}
</style>
