<!-- <script setup lang="ts">
import { useStyle } from '@/stores/style'

const { style } = useStyle()

const props = defineProps<{
  list: {
    content: string
    title: string
  }[]
}>()
</script>

<template>
  <div class="tags-list">
    <p class="tag" v-for="(item, i) in props.list" :key="i" :title="item.title">
      {{ item.content }}
    </p>
  </div>
</template>

<style scoped lang="scss">
$buttonSize: v-bind('style.button.size');
.tags-list {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  & .tag {
    height: 100%;
    aspect-ratio: 1;
    border-radius: $buttonSize;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 4px;
    flex-shrink: 0;
  }
}
</style> -->
