<script setup lang="ts">
import { useStylesPage } from '@/stores/stylesPage/stylesPage'

const stylePage = useStylesPage()

const props = defineProps<{
  checkboxName: string
  id: string
  isChecked: boolean
}>()

const emit = defineEmits<{
  (e: 'select', v: string): void
}>()

const select = () => emit('select', props.id)
</script>

<template>
  <div :class="[isChecked && 'checked', 'check-button']" @click="select">
    <slot></slot>
    <label :for="props.id"></label>
    <input type="checkbox" :name="props.checkboxName" :id="props.id" :checked="props.isChecked" />
  </div>
</template>

<style scoped lang="scss">
input {
  position: absolute;
  height: 0;
  width: 0;
}
.checked {
  background-color: v-bind('stylePage.atualColor.front');
  border: solid 1px v-bind('stylePage.atualColor.border');
}
.check-button {
  box-sizing: border-box;
  border-radius: v-bind('stylePage.borderRadius.inside');
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  &:hover {
    background-color: v-bind('stylePage.atualColor.hover');
    animation: hoverAnitation 0.2s;
  }
  &:active {
    transform: scale(0.92);
    background-color: v-bind('stylePage.atualColor.back');
  }
}
@keyframes hoverAnitation {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.94);
  }
  100% {
    transform: scale(1);
  }
}
</style>
