<script setup lang="ts">
import { useStylesPage } from '@/stores/stylesPage/stylesPage'

const stylePage = useStylesPage()

const props = withDefaults(
  defineProps<{
    backgroundColor?: 'front' | 'back'
    padding?: string
    border?: boolean
    borderRadius?: 'inside' | 'outside'
  }>(),
  {
    backgroundColor: 'back',
    padding: '15px',
    borderRadius: 'outside',
    border: true
  }
)

const borderClass = props.border && 'border'
</script>

<template>
  <div :class="[borderClass, 'modal-card-container']">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.modal-card-container {
  padding: v-bind('props.padding');
  box-sizing: border-box;
  border-radius: v-bind('stylePage.borderRadius[props.borderRadius]');
  background-color: v-bind('stylePage.atualColor[props.backgroundColor]');
  box-shadow: v-bind('stylePage.atualColor.back') 0px 8px 28px;
}

.border {
  border: solid 1px v-bind('stylePage.atualColor.border');
}
</style>
