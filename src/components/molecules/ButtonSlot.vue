<script setup lang="ts">
import ThemeP from '@/components/atoms/ThemeP.vue'
import ThemeButton from '@/components/atoms/ThemeButton.vue'
import FlexContainer from '../atoms/FlexContainer.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'
import { ref, watchEffect } from 'vue'

const style = useStylesPage()

const props = withDefaults(
  defineProps<{
    content: string
    borderColor?: string
    backgroundColor?: string
    border?: boolean
    reverseColor?: boolean
    fontSize?: string
  }>(),
  {
    borderColor: '',
    backgroundColor: '',
    border: false,
    reverseColor: false,
    fontSize: '14px'
  }
)

const bgColor = ref('')

const bgBorderColor = ref('')

const borderClasse = props.border && 'border'

const reverseColorClass = props.reverseColor && 'reverse-color'

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
  <ThemeButton :class="['option-button-container', reverseColorClass, borderClasse]">
    <FlexContainer align-items="center" justify-center="center" class="teste">
      <FlexContainer class="ico" align-items="center" justify-content="center">
        <slot></slot>
      </FlexContainer>

      <FlexContainer class="text">
        <ThemeP :content="props.content" />
      </FlexContainer>
    </FlexContainer>
  </ThemeButton>
</template>

<style scoped lang="scss">
.option-button-container {
  height: 40px;
  width: 100%;
  flex-shrink: 0;
  flex-grow: 0;
  position: relative;
  background-color: v-bind('bgColor');

  & .ico {
    flex-shrink: 0;
    margin-left: 15px;
    margin-right: 5px;
  }

  & .text {
    flex-shrink: 0;
    width: 100%;

    & p {
      margin-left: 10px;
      padding-right: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      text-wrap: nowrap;
      font-size: v-bind('props.fontSize');
    }
  }
}

.reverse-color {
  background-color: v-bind('style.atualColor.hover');

  &:hover {
    background-color: v-bind('style.atualColor.back');
  }
}

.border {
  border: solid 1px v-bind('bgBorderColor');
}
</style>
