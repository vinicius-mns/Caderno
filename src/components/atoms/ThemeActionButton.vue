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
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  font-size: 24px;
}
</style>
