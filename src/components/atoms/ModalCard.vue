<script setup lang="ts">
import { useStylesPage } from '@/stores/stylesPage/stylesPage'

const stylePage = useStylesPage()

const props = withDefaults(
  defineProps<{
    backgroundColor?: 'front' | 'back'
    padding?: string
    borderRadius?: 'inside' | 'outside'
  }>(),
  {
    backgroundColor: 'back',
    padding: '15px',
    borderRadius: 'outside'
  }
)
</script>

<template>
  <div class="modal-card-container">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.modal-card-container {
  padding: v-bind('props.padding');
  box-sizing: border-box;
  border-radius: v-bind('stylePage.borderRadius[props.borderRadius]');
  background-color: v-bind('stylePage.atualColor[props.backgroundColor]');
  border: solid 1px v-bind('stylePage.atualColor.border');
  box-shadow: v-bind('stylePage.atualColor.back') 0px 8px 28px;
}
</style>
