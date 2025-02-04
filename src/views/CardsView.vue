<script setup lang="ts">
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import CardsBottom from '@/components/template/CardsBottom.vue'
import CardsMain from '@/components/template/CardsMain.vue'
import FloatMessage from '@/components/template/FloatMessage.vue'
import WindowsAll from '@/components/template/windows/WindowsAll.vue'
import { useCards } from '@/stores/cards/cards'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'
import { useTags } from '@/stores/tags/tags'
import { onMounted } from 'vue'

const style = useStylesPage()

const cards = useCards()

const tags = useTags()

onMounted(async () => {
  await tags.init()

  await cards.atualizeReactiveCards({
    includeTags: tags.includeTags,
    excludeTags: tags.excludeTags
  })
})
</script>

<template>
  <FlexContainer class="cards-page-container">
    <CardsMain />

    <CardsBottom />

    <WindowsAll class="all-windows" />

    <FloatMessage class="float-message" />
  </FlexContainer>
</template>

<style scoped lang="scss">
.cards-page-container {
  min-height: 100dvh;
  background-color: v-bind('style.atualColor.front');

  & .page {
    width: calc(100% - 410px);
    margin-left: 410px;
    // height: 100%;
    // padding-top: 10px;
    // padding-bottom: 100px;
    // overflow-y: auto;
  }

  & .side {
    position: fixed;
    height: 100dvh;
    width: 410px;
    background-color: v-bind('style.atualColor.front');

    & hr {
      top: -10px;
      right: 0;
      position: absolute;
      border: none;
      // background-color: red;
      background-color: v-bind('style.atualColor.border');
      height: 100%;
      width: 1px;
      position: absolute;
    }
  }

  & .top {
    background-color: v-bind('style.atualColor.front');
    height: 60px;
    width: 100%;
    flex-shrink: 0;
  }

  & .all-windows {
    z-index: 999;
  }

  & .bottom {
    background-color: transparent;
    position: fixed;
    bottom: 0;
    height: 80px;
    width: 100%;
    flex-shrink: 0;
  }

  & .float-message {
    z-index: 9999;
  }
}
</style>
