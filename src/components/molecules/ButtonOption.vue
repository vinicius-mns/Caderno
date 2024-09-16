<script setup lang="ts">
import ThemeP from '@/components/atoms/ThemeP.vue'
import ThemeButton from '@/components/atoms/ThemeButton.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'
import FlexContainer from '../atoms/FlexContainer.vue'

const stylePage = useStylesPage()

const props = withDefaults(
  defineProps<{
    content: string
    visible?: boolean
    fontSize?: string
  }>(),
  {
    visible: false,
    fontSize: '14px'
  }
)
</script>

<template>
  <ThemeButton :class="[props.visible ? 'visible' : 'transparent', 'option-button-container']">
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
  width: 100%;
  height: 40px;
  flex-shrink: 0;
  flex-grow: 0;
  & .container-flex {
    width: 100%;
    height: 100%;
  }
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
.visible {
  background-color: v-bind('stylePage.atualColor.front');
}
.transparent {
  background-color: transparent;
}
</style>
