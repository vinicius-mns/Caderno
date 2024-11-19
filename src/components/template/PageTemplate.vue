<script setup lang="ts">
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'

const stylesPage = useStylesPage()
</script>

<template>
  <FlexContainer class="page-template-container">
    <FlexContainer class="side-container">
      <slot name="side"></slot>
      <div class="line"></div>
    </FlexContainer>

    <FlexContainer class="main-container">
      <slot name="page"></slot>
    </FlexContainer>
  </FlexContainer>
</template>

<style scoped lang="scss">
$side-size: 408px;

.page-template-container {
  & .side-container {
    top: 0;
    position: fixed;
    width: $side-size;
    height: 100%;
    background-color: v-bind('stylesPage.atualColor.front');

    & .line {
      right: 0;
      position: absolute;
      background-color: v-bind('stylesPage.atualColor.back');
      width: 1px;
      height: 90dvh;
      top: 5dvh;
    }
  }

  & .main-container {
    width: calc(100% - $side-size);
    margin-left: $side-size;
    min-height: 100dvh;
    background-color: v-bind('stylesPage.atualColor.front');
  }
}
</style>
