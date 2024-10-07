<script setup lang="ts">
import type { IColorPage } from '@/stores/stylesPage/interfaces'
import FlexContainer from '../atoms/FlexContainer.vue'
import RadioBase from '../atoms/RadioBase.vue'
import ThemeP from '../atoms/ThemeP.vue'
import { ref } from 'vue'

const props = defineProps<{
  allColor: IColorPage[]
  atualColor: IColorPage
}>()

const emit = defineEmits<{
  (e: 'setColorName', v: string): void
}>()

const useStyleColor = () => {
  const atualColor = ref<IColorPage>(props.atualColor)

  const setAtualColor = (colorName: string) => {
    const colorStyle = props.allColor.find((color) => color.name === colorName)

    if (colorStyle) {
      atualColor.value = colorStyle

      emit('setColorName', colorName)
    }
  }

  return {
    atualColor,
    setAtualColor
  }
}

const styleColor = useStyleColor()
</script>

<template>
  <div class="color-page-container">
    <ThemeP content="Selecione a cor do site:" class="title" />

    <FlexContainer flex-wrap="wrap" class="xxx">
      <RadioBase
        v-for="(color, i) in props.allColor"
        :id="color.name"
        :key="i"
        :checked-value="styleColor.atualColor.value.name"
        radio-name="select-color"
        class="color-radio-option"
        @select="styleColor.setAtualColor"
      >
        <FlexContainer flex-direction="column" class="option">
          <ThemeP :content="color.name" class="sub-title" />

          <FlexContainer flex-wrap="nowrap">
            <div :style="{ backgroundColor: color.back, height: '40px', width: '100%' }"></div>
            <div :style="{ backgroundColor: color.front, height: '40px', width: '100%' }"></div>
            <div :style="{ backgroundColor: color.hover, height: '40px', width: '100%' }"></div>
            <div :style="{ backgroundColor: color.text, height: '40px', width: '100%' }"></div>
          </FlexContainer>
        </FlexContainer>
      </RadioBase>
    </FlexContainer>
  </div>
</template>

<style scoped lang="scss">
.color-page-container {
  width: 100%;
  height: 100%;

  & .title {
    margin: 5px;
  }

  & .color-radio-option {
    flex-grow: 1;
    flex-shrink: 0;
    flex-basis: 200px;
    margin: 1px;
    padding: 10px;

    & .option {
      width: 100%;

      & .sub-title {
        margin-bottom: 5px;
      }
    }
  }
}
</style>
