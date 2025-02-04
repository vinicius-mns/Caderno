<script setup lang="ts">
import { useStylesPage } from '@/stores/stylesPage/stylesPage'
import { computed } from 'vue'

const stylePage = useStylesPage()

const props = withDefaults(
  defineProps<{
    backgroundColor?: 'front' | 'back'
    padding?: string
    border?: boolean
    borderRadius?: 'inside' | 'outside'
    boxShadow?: boolean
    introAnimation?: boolean
  }>(),
  {
    backgroundColor: 'front',
    padding: '15px',
    borderRadius: 'outside',
    border: true,
    introAnimation: false
  }
)

const borderClass = props.border && 'border'

const shadowClass = computed(() => props.boxShadow && 'shadow')

const introAnimationClass = computed(() => props.introAnimation && 'introAnimation')
</script>

<template>
  <div :class="[borderClass, shadowClass, introAnimationClass, 'modal-card-container']">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.modal-card-container {
  max-width: 95dvw;
  padding: v-bind('props.padding');
  box-sizing: border-box;
  border-radius: v-bind('stylePage.borderRadius[props.borderRadius]');
  background-color: v-bind('stylePage.atualColor[props.backgroundColor]');

  // box-shadow: v-bind('stylePage.atualColor.back') 0px 8px 28px;
}

.shadow {
  box-shadow:
    rgba(17, 17, 26, 0.5) 0px 4px 16px,
    rgba(17, 17, 26, 0.2) 0px 8px 32px;
}

.border {
  border: solid 1px v-bind('stylePage.atualColor.border');
}

.introAnimation {
  margin-bottom: -20px;
  opacity: 0;
  animation: introAnimation 0.3s forwards;
}

@keyframes introAnimation {
  to {
    opacity: 100%;
    margin-bottom: 0;
  }
}
</style>
