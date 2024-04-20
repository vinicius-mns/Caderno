<script setup lang="ts">
import { useStyle } from '@/stores/style'
import ThemeP from '../atoms/ThemeP.vue'

const { style } = useStyle()

const props = defineProps<{
  content: string
}>()
</script>

<template>
  <div class="option-in-line-container">
    <div class="container text">
      <ThemeP :content="props.content" />
    </div>
    <div class="container option">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
$buttonSize: v-bind('style.button.size');
$margin: 10px;
.option-in-line-container {
  height: calc($buttonSize * 1.5);
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  & .container {
    height: calc($buttonSize * 1.5);
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  & .text {
    flex-shrink: 0;
    padding: 0 $margin 0 $margin;
  }
  & .option {
    width: 100%;
  }
}
</style>
