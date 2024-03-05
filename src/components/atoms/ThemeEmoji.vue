<script setup lang="ts">
import { useStyle } from '@/stores/style'
import { computed } from 'vue'

const { style } = useStyle()

const props = defineProps<{
  emoji: string
  size: string
  colored: boolean
}>()

const localStyle = computed(() => ({
  filter: props.colored ? '' : 'grayscale(100%)',
  'font-size': props.size
}))
</script>

<template>
  <p class="theme-emoji" :style="localStyle">{{ props.emoji }}</p>
</template>

<style scoped lang="scss">
.theme-emoji {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
