<script setup lang="ts">
import FloatDescription from '../atoms/FloatDescription.vue'
import ThemeButton from '../atoms/ThemeButton.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'

const stylePage = useStylesPage()

const props = withDefaults(
  defineProps<{
    backgroundColor?: string
    size?: string
    border?: boolean
    description: string
  }>(),
  {
    size: '40px',
    backgroundColor: '',
    border: true
  }
)
</script>

<template>
  <FloatDescription :content="props.description">
    <ThemeButton
      :class="[
        props.border ? 'border' : 'no-border',
        props.backgroundColor ? 'background-color' : 'default-background-color',
        'coin-button-container'
      ]"
    >
      <slot></slot>
    </ThemeButton>
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
  border-radius: 8px;
  overflow: hidden;
  outline: none;
}
.background-color {
  background-color: v-bind('props.backgroundColor');
}
.default-background-color {
  background-color: v-bind('stylePage.atualColor.front');
}
.border {
  border: solid 1px v-bind('stylePage.atualColor.border');
}
.no-border {
  border: none;
}
</style>
