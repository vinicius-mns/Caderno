<script setup lang="ts">
import ThemeP from '@/components/atoms/ThemeP.vue'
import ThemeButton from '@/components/atoms/ThemeButton.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'

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
    <div class="option-button">
      <div class="ico">
        <slot></slot>
      </div>
      <div class="text">
        <ThemeP :content="props.content" />
      </div>
    </div>
  </ThemeButton>
</template>

<style scoped lang="scss">
.option-button-container {
  width: 100%;
  height: 40px;
  flex-shrink: 0;
  flex-grow: 0;
  & .option-button {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    & .ico {
      flex-shrink: 0;
      height: 100%;
      width: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 10px;
    }
    & .text {
      flex-shrink: 0;
      width: calc(100% - 30px);
      height: 100%;
      display: flex;
      align-items: center;
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
}
.visible {
  background-color: v-bind('stylePage.atualColor.front');
  // border: solid 1px v-bind('stylePage.atualColor.border');
}
.transparent {
  background-color: transparent;
}
</style>
