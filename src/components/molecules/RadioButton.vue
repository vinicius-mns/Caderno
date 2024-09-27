<script setup lang="ts">
import { useStylesPage } from '@/stores/stylesPage/stylesPage'

const stylePage = useStylesPage()

const props = defineProps<{
  name: string
  id: string
  checkedValue: string
}>()

const emit = defineEmits<{
  (e: 'select', v: string): void
}>()

const select = () => emit('select', props.id)
</script>

<template>
  <div class="radio-group-container" @click="select">
    <input
      type="radio"
      :name="props.name"
      :id="props.id"
      :checked="props.checkedValue === props.id"
    />
    <label :for="props.id"></label>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.radio-group-container {
  padding: 10px;
  // margin: 5px;
  cursor: pointer;
  display: inline-block;
  border-radius: v-bind('stylePage.borderRadius.inside');
  background-color: v-bind('stylePage.atualColor.front');
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    animation: hoverAnitation 0.3s;
    background-color: v-bind('stylePage.atualColor.hover');
  }
  & input {
    position: absolute;
    height: 0;
    width: 0;
  }
  & input[type='radio']:checked + label::after {
    content: '';
    position: absolute;
    height: 20px;
    width: 20px;
    background-color: rgb(95, 146, 88);
    border-radius: 50%;
    top: 4px;
    right: 4px;
  }
}
@keyframes hoverAnitation {
  0% {
    transform: scale(0.95);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
}
</style>
