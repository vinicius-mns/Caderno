<script setup lang="ts">
import { useStylesPage } from '@/stores/stylesPage/stylesPage'

const stylePage = useStylesPage()

const props = defineProps<{
  radioName: string
  id: string
  checkedValue: string
}>()

const emit = defineEmits<{
  (e: 'select', v: string): void
}>()

const select = () => emit('select', props.id)
</script>

<template>
  <div :class="[props.id === checkedValue && 'checked', 'radio-container']" @click="select">
    <slot></slot>
    <label :for="props.id"></label>
    <input
      type="radio"
      :name="props.radioName"
      :id="props.id"
      :checked="props.checkedValue === 'props.id'"
    />
  </div>
</template>

<style scoped lang="scss">
input {
  position: absolute;
  height: 0;
  width: 0;
}

.radio-container {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  border: solid 1px v-bind('stylePage.atualColor.border');
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: v-bind('stylePage.atualColor.hover');
    animation: hoverAnitation 0.2s;
  }

  &:active {
    transform: scale(0.92);
    background-color: v-bind('stylePage.atualColor.back');
  }
}

.checked {
  background-color: v-bind('stylePage.atualColor.hover');
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
