<script setup lang="ts">
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import CardsTop from '@/components/template/CadsTop.vue'
import CardsBottom from '@/components/template/CardsBottom.vue'
import CardsMain from '@/components/template/CardsMain.vue'
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
  await cards.init({
    includeTags: tags.getNames(tags.includeTags),
    excludeTags: tags.getNames(tags.excludeTags)
  })
})
</script>

<template>
  <FlexContainer class="cards-page-container" flex-direction="column">
    <div class="top">
      <CardsTop />
    </div>

    <div class="main">
      <CardsMain />
    </div>

    <FlexContainer align-items="center" justify-content="center" class="bottom">
      <CardsBottom />
    </FlexContainer>

    <WindowsAll />
  </FlexContainer>
</template>

<style scoped lang="scss">
.cards-page-container {
  display: flex;
  height: 100dvh;

  & .main {
    background-color: v-bind('style.atualColor.front');
    width: 100%;
    height: 100%;
    padding-top: 10px;
    padding-bottom: 100px;
    overflow-y: auto;
  }

  & .top {
    background-color: v-bind('style.atualColor.front');
    height: 60px;
    width: 100%;
    flex-shrink: 0;
  }

  & .bottom {
    background-color: transparent;
    position: fixed;
    bottom: 0;
    height: 80px;
    width: 100%;
    flex-shrink: 0;
  }
}
</style>
