<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import FloatDescription from '../atoms/FloatDescription.vue'
import ThemeButton from '../atoms/ThemeButton.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'

const style = useStylesPage()

const props = withDefaults(
  defineProps<{
    content: string
    borderColor?: string
    backgroundColor?: string
    border?: boolean
  }>(),
  {
    borderColor: '',
    backgroundColor: '',
    border: false
  }
)

const bgColor = ref('')

const bgBorderColor = ref('')

const borderClasse = props.border && 'border'

watchEffect(() => {
  props.backgroundColor === ''
    ? (bgColor.value = style.atualColor.front)
    : (bgColor.value = props.backgroundColor)

  props.borderColor === ''
    ? (bgBorderColor.value = style.atualColor.border)
    : (bgBorderColor.value = props.borderColor)
})
</script>

<template>
  <FloatDescription :content="props.content">
    <ThemeButton :class="[borderClasse, 'coin-button-container']">
      <slot></slot>
    </ThemeButton>
  </FloatDescription>
</template>

<style scoped lang="scss">
.coin-button-container {
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
  outline: none;
  background-color: v-bind('bgColor');
}

.border {
  border: solid 1px v-bind('bgBorderColor');
}
</style>
