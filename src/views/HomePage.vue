<script setup lang="ts">
import SideBarContainer from '@/components/sideBar/SideBarContainer.vue'
import TopBarContainer from '@/components/topBar/TopBarContainer.vue'
import { computed, onMounted, onUnmounted, reactive, watchEffect } from 'vue'
import { RouterView } from 'vue-router'
import { useSize } from '@/stores/style'

const sideBar = reactive({
  atualSize: '0',
  desktopSize: '280px',
  tableSize: '180px',
  mobileSize: '40px'
})

const size = useSize()
const screen = computed(() => size.store.screen)

const defineSizeSideBar = () => {
  if (screen.value === 'mobile') sideBar.atualSize = sideBar.mobileSize
  if (screen.value === 'tablet') sideBar.atualSize = sideBar.tableSize
  if (screen.value === 'desktop') sideBar.atualSize = sideBar.desktopSize
}

watchEffect(defineSizeSideBar)

onMounted(() => {
  addEventListener('resize', size.defineSizeScreen)
  size.defineSizeScreen()
})

onUnmounted(() => {
  removeEventListener('resize', size.defineSizeScreen)
})
</script>

<template>
  <div class="home-page">
    <aside>
      <SideBarContainer />
    </aside>
    <main>
      <header>
        <TopBarContainer />
      </header>
      <article>
        <RouterView />
      </article>
    </main>
  </div>
</template>

<style scoped lang="scss">
.home-page {
  // medidas
  width: 100%;
  height: 100vh;
  // displa
  display: flex;

  & aside {
    // medidas
    height: 100%;
    width: v-bind('sideBar.atualSize');
    min-width: v-bind('sideBar.atualSize');
    //posicionamento
    position: relative;
    // estilo
    background-color: blue;

    & .minimize-sideBar-button {
      // medidas
      height: 30px;
      aspect-ratio: 1;
      //posicionamento
      position: absolute;
      // estilo
      right: 0;
    }

    transition: all 0.3s;
  }

  & main {
    // medidas
    height: 100%;
    width: 100%;
    overflow: auto;
    //display
    display: flex;
    flex-direction: column;
    // estilo
    background-color: aqua;

    & header {
      // medidas
      width: 100%;
      height: 44px;
      min-height: 44px;
      // estilo
      background-color: pink;
    }

    & article {
      // medidas
      width: 100%;
      height: 100%;
      overflow: auto;
      // estilo
      background-color: purple;
    }

    transition: all 0.3s;
  }
}
</style>
