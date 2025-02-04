<script setup lang="ts">
import { useStylesPage } from '@/stores/stylesPage/stylesPage'
import { computed } from 'vue'

const stylePage = useStylesPage()

const props = withDefaults(
  defineProps<{
    backgroundColor?: string
    borderColor?: string
    borderRadius?: string
    invertColor?: boolean
  }>(),
  {
    backgroundColor: 'back',
    borderColor: '',
    borderRadius: '',
    invertColor: false
  }
)

const backgroundColorValue = computed(() => {
  if (props.backgroundColor in stylePage.atualColor) {
    return stylePage.atualColor[props.backgroundColor as keyof typeof stylePage.atualColor]
  }

  if (props.backgroundColor === '') {
    return stylePage.atualColor.front
  }

  return props.backgroundColor
})

const borderRadiusValue = computed(() =>
  props.borderRadius === '' ? stylePage.borderRadius.inside : props.borderRadius
)

const borderColorValue = computed(() =>
  props.borderColor === '' ? stylePage.atualColor.border : props.borderColor
)

const invertClass = computed(() => (props.invertColor ? 'invert' : ''))
</script>

<template>
  <button :class="['button', invertClass]">
    <slot></slot>
  </button>
</template>

<style scoped lang="scss">
.button {
  // height: 36px;
  display: flex;
  align-items: center;
  background-color: v-bind('backgroundColorValue');
  border-radius: v-bind('borderRadiusValue');
  color: v-bind('stylePage.atualColor.text');
  border: solid 1px v-bind('borderColorValue');
  overflow: hidden;
  outline: none;
  cursor: pointer;
  transition:
    all 0.1s,
    border-radius 0s,
    border-width 0s,
    border-color 0s;

  margin: 0;
  padding: 0;

  &:hover {
    background-color: v-bind('stylePage.atualColor.hover');
  }

  &:active {
    filter: invert(1);
  }
}

.invert {
  filter: invert(1);

  &:hover {
    filter: invert(0);
  }

  &:active {
    filter: invert(1);
  }
}
</style>
