<script setup lang="ts">
import FloatDescription from '../atoms/FloatDescription.vue'
import ThemeButton from '../atoms/ThemeButton.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'

const stylePage = useStylesPage()

const props = withDefaults(
  defineProps<{
    size?: string
    description: string
  }>(),
  {
    size: '40px'
  }
)
</script>

<template>
  <FloatDescription :content="props.description">
    <ThemeButton class="coin-button-container">
      <slot></slot>
    </ThemeButton>
    <!-- <button >
    </button> -->
  </FloatDescription>
</template>

<style scoped lang="scss">
$buttonSize: v-bind('props.size');
.coin-button-container {
  height: $buttonSize;
  width: $buttonSize;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
  outline: none;
  background-color: transparent;
  border: solid 1px v-bind('stylePage.atualColor.border');
}
</style>
