<!-- <script setup lang="ts">
import { useStyle } from '@/stores/style'

const { atualStyle } = useStyle()

const props = defineProps<{ content: string }>()
</script>

<template>
  <div class="panel-button-container">
    <button class="panel-button">
      <slot></slot>
    </button>
    <p>{{ props.content }}</p>
  </div>
</template>

<style scoped lang="scss">
$buttonSize: 50px;
.panel-button-container {
  width: $buttonSize;
  overflow-x: visible;
  margin: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & .panel-button {
    height: $buttonSize;
    width: $buttonSize;
    margin: 0;
    padding: 0;
    background-color: #e9e9e9;
    border-radius: 8px;
    border: none;
    overflow: hidden;
    outline: none;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.2) 0 0 8px 8px;
    &:hover {
      background-color: #ffffff;
    }
    &:active {
      background-color: #121e29;
    }
  }
  & p {
    margin: 0;
    padding: 0;
    text-wrap: nowrap;
    color: white;
    font-size: 14px;
  }
}
</style> -->
