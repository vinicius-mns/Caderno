<script setup lang="ts">
import ThemeButton from '@/components/atoms/ThemeButton.vue'
import FloatDescription from '@/components/molecules/FloatDescription.vue'

const props = defineProps<{
  description: string
  ico: string
}>()
</script>

<template>
  <FloatDescription :content="props.description">
    <ThemeButton class="action-button">{{ props.ico }}</ThemeButton>
  </FloatDescription>
</template>

<style scoped lang="scss">
.action-button {
  transition: all 0.2s;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  font-size: 20px;
  filter: grayscale(100%);
  &:hover {
    filter: grayscale(0);
  }
  &:active {
    transform: scale(80%);
  }
}
</style>
