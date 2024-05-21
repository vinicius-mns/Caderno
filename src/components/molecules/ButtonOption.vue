<script setup lang="ts">
import ThemeP from '@/components/atoms/ThemeP.vue'
import ThemeButton from '@/components/atoms/ThemeButton.vue'

const props = defineProps<{ content: string }>()
</script>

<template>
  <ThemeButton class="option-button-container">
    <div class="option-button">
      <slot></slot>
      <ThemeP :content="props.content" class="text" />
    </div>
  </ThemeButton>
</template>

<style scoped lang="scss">
.option-button-container {
  width: 100%;
  flex-shrink: 0;
  & .option-button {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    color: white;
    & .text {
      margin: 8px;
    }
  }
}
</style>
