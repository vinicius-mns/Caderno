<script setup lang="ts">
import WindowsSlot from '@/components/molecules/WindowsSlot.vue'
import { useWindows } from '@/stores/windows'
import ThemeP from '@/components/atoms/ThemeP.vue'
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import ThemeH1 from '@/components/atoms/ThemeH1.vue'

import tagCreateVideo from '@/components/atoms/videos/criar-tag.mp4'

import tagCreateManyVideo from '@/components/atoms/videos/criar-varias-tags.mp4'

const window = useWindows()
</script>

<template>
  <WindowsSlot
    v-if="window.errorCardNoTag.show"
    :title="window.errorCardNoTag.title"
    @close="window.errorCardNoTag.close"
  >
    <FlexContainer flex-direction="column" class="container" align-items="center">
      <ThemeH1 content="Voce nao tem nenhuma tag criada 😢" class="title" />

      <FlexContainer flex-direction="column" class="tutorial-container">
        <ThemeP content="Como criar uma tag 😉" size="20px" class="title-video" />

        <video controls :src="tagCreateVideo" class="video"></video>
      </FlexContainer>

      <FlexContainer flex-direction="column" class="tutorial-container">
        <ThemeP content="Como criar varias tags 🤯" size="20px" class="title-video" />

        <video controls :src="tagCreateManyVideo" class="video"></video>
      </FlexContainer>
    </FlexContainer>
  </WindowsSlot>
</template>

<style scoped lang="scss">
.container {
  padding: 15px;
  font-size: 20px;
  font-weight: 100;
  width: 680px;
  max-width: 95dvw;
  max-height: 80dvh;
  overflow: auto;

  & .title {
    margin: 20px;
  }

  & .tutorial-container {
    width: 98%;
    margin-top: 30px;

    & .title-video {
      margin: 5px;
    }

    & .video {
      width: 100%;
    }
  }
}
</style>
