<!-- <script setup lang="ts">
import ThemeP from '@/components/atoms/ThemeP.vue'
import ThemeButton from '@/components/atoms/ThemeButton.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'
import FlexContainer from '../atoms/FlexContainer.vue'
import CaretIco from '../atoms/icons/CaretIco.vue'
import { ref } from 'vue'

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

const show = ref(true)

const togggleShow = () => (show.value = !show.value)
</script>

<template>
  <FlexContainer flex-direction="column">
    <ThemeButton
      :class="[props.visible ? 'visible' : 'transparent', 'option-button-container']"
      @click="togggleShow"
    >
      <FlexContainer
        align-items="center"
        justify-center="center"
        :style="{ width: '100%', height: '100%' }"
      >
        <CaretIco direction="down" class="ico" v-show="show" />
        <CaretIco direction="right" class="ico" v-show="!show" />
        <FlexContainer class="ico slot" align-items="center" justify-content="center">
          <slot name="ico"></slot>
        </FlexContainer>
        <div class="text">
          <ThemeP :content="props.content" />
        </div>
      </FlexContainer>
    </ThemeButton>
    <FlexContainer flex-direction="column" class="list" v-show="show">
      <slot name="list"></slot>
    </FlexContainer>
  </FlexContainer>
</template>

<style scoped lang="scss">
.option-button-container {
  width: 100%;
  height: 40px;
  flex-shrink: 0;
  flex-grow: 0;
  & .ico {
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 5px;
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
.list {
  margin-left: 20px;
}
.visible {
  background-color: v-bind('stylePage.atualColor.front');
}
.transparent {
  background-color: transparent;
}
</style> -->
