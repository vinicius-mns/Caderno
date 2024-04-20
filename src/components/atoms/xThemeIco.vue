<script setup lang="ts">
import { useStyle } from '@/stores/style'
import { computed } from 'vue'

const { style } = useStyle()

const props = defineProps<{
  ico: string
  content: string
  size: string
  colored?: boolean
}>()

const localStyle = computed(() => ({
  'font-size': props.size,
  filter: props.colored ? 'grayscale(0)' : '',
  'background-color': props.colored ? 'rgb(154, 218, 154)' : ''
}))
</script>

<template>
  <div class="theme-ico" :title="props.content">
    <button class="button" :style="localStyle">
      {{ props.ico }}
    </button>
    <p class="content">{{ props.content }}</p>
  </div>
</template>

<style scoped lang="scss">
$buttonSize: v-bind('style.button.size');
$color: v-bind('style.button.textColor');
$buttonBgColor: v-bind('style.button.bgColor');
$size: calc($buttonSize + 2px);
$borderRadius: v-bind('style.button.borderRadius');
$boxShadow: v-bind('style.boxShadow');
.theme-ico {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 4px;
  padding: 5px;
  box-sizing: border-box;
  & .button {
    transition: all 0.1s;
    width: 100%;
    height: $size;
    background-color: $buttonBgColor;
    flex-shrink: 0;
    margin: 0;
    padding: 0;
    border-radius: $borderRadius;
    border: none;
    cursor: pointer;
    filter: grayscale(100%);
    box-shadow: $boxShadow;
    &:hover {
      filter: grayscale(0%);
      background-color: rgba(154, 218, 154, 0.6);
    }
    &:active {
      transform: scale(0.9);
    }
  }
  & .content {
    color: $color;
    margin: 0;
    padding: 0;
    font-size: 13px;
    overflow: hidden;
    text-emphasis: none;
    text-overflow: ellipsis;
    text-wrap: nowrap;
  }
}
</style>
