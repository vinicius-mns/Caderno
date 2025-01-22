<script setup lang="ts">
import FloatDescription from '../atoms/FloatDescription.vue'
import ThemeButton from '../atoms/ThemeButton.vue'

const props = withDefaults(
  defineProps<{
    content: string
    backgroundColor?: string
    borderColor?: string
    borderRadius?: string
    size?: string
    invertColor?: boolean
  }>(),
  {
    backgroundColor: '',
    borderColor: '',
    borderRadius: '50px',
    size: '40px',
    invertColor: false
  }
)
</script>

<template>
  <FloatDescription :content="props.content">
    <ThemeButton
      class="coin-button-container"
      :background-color="props.backgroundColor"
      :border-color="props.borderColor"
      :border-radius="props.borderRadius"
      :invert-color="props.invertColor"
    >
      <slot></slot>
    </ThemeButton>
  </FloatDescription>
</template>

<style scoped lang="scss">
.coin-button-container {
  height: v-bind('props.size');
  width: v-bind('props.size');
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  outline: none;
}
</style>
