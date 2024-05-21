<!-- <script setup lang="ts">
import ThemeButton from '@/components/atoms/ThemeButton.vue'
import FloatDescription from '@/components/atoms/FloatDescription.vue'

const props = defineProps<{
  description: string
}>()
</script>

<template>
  <FloatDescription :content="props.description">
    <ThemeButton class="action-button">
      <slot></slot>
    </ThemeButton>
  </FloatDescription>
</template>

<style scoped lang="scss">
.action-button {
  transition: all 0.2s;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:active {
    transform: scale(80%);
  }
}

svg {
  fill: red;
  width: 20px;
}
</style> -->
