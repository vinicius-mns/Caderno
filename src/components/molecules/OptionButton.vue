<script setup lang="ts">
import ThemeP from '@/components/atoms/ThemeP.vue'
import ThemeButton from '@/components/atoms/ThemeButton.vue'

const props = defineProps<{ content: string }>()
</script>

<template>
  <ThemeButton>
    <div class="option-button">
      <slot></slot>
      <ThemeP :content="props.content" class="text" />
    </div>
  </ThemeButton>
</template>

<style scoped lang="scss">
.option-button {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  // margin-left: -8px;
  // background-color: blue;
  & .text {
    margin: 8px;
  }
}
</style>
