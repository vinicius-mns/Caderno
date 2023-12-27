<script setup lang="ts">
import SideBarContainer from '@/components/sideBar/SideBarContainer.vue'
import TopBarContainer from '@/components/topBar/TopBarContainer.vue'
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { RouterView } from 'vue-router'

const miniSideBar = ref(false)

const sideBar = reactive({
  atualSize: '0',
  desktopSize: '280px',
  tableSize: '180px',
  mobileSize: '40px'
})

const defineSizeSideBar = () => {
  const widthScreen = window.innerWidth

  // mobile
  if (widthScreen < 768) {
    sideBar.atualSize = sideBar.mobileSize
  }

  // teblet
  if (widthScreen >= 768) {
    sideBar.atualSize = sideBar.tableSize
  }

  // desktop
  if (widthScreen >= 1024) {
    sideBar.atualSize = sideBar.desktopSize
  }
}

const minimizeSideBar = () => {
  if (!miniSideBar.value) {
    sideBar.atualSize = '30px'
    miniSideBar.value = true
  } else {
    defineSizeSideBar()
    miniSideBar.value = false
  }
}

const focusInSideBar = () => {
  if (miniSideBar.value) {
    defineSizeSideBar()
  }
}

const focusOutSideBar = () => {
  if (miniSideBar.value) {
    sideBar.atualSize = '30px'
  }
}

onMounted(() => {
  addEventListener('resize', defineSizeSideBar)
  defineSizeSideBar()
})

onUnmounted(() => {
  removeEventListener('resize', defineSizeSideBar)
})
</script>

<template>
  <div class="home-page">
    <aside @mouseenter="focusInSideBar" @mouseleave="focusOutSideBar">
      <button class="minimize-sideBar-button" @click="minimizeSideBar"><p>⏪</p></button>
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
  // estilo
  background-color: red;

  $widhSidebar: 18;

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
