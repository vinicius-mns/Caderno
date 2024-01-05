<script setup lang="ts">
import SideBarContainer from '@/components/sideBar/SideBarContainer.vue'
import TopBarContainer from '@/components/topBar/TopBarContainer.vue'

import { ref } from 'vue'

const sideBarWidth = ref('250px')
const showSidebar = ref(true)

const toggleSidebar = () => {
  if (sideBarWidth.value === '28px') {
    sideBarWidth.value = '250px'
    showSidebar.value = true
  } else {
    sideBarWidth.value = '28px'
    showSidebar.value = false
  }
}
</script>

<template>
  <div class="home-page-container">
    <header>
      <TopBarContainer />
    </header>
    <aside>
      <button class="toggleSidebar" @click="toggleSidebar">x</button>
      <SideBarContainer v-show="showSidebar" />
    </aside>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped lang="scss">
@media screen and (min-width: 769px) {
  .home-page-container {
    //medidas
    height: 100dvh;
    width: 100%;
    // estilo
    background-color: white;

    $sideBarWidth: v-bind(sideBarWidth);
    $headerHeigth: 40px;
    $transition: all 0.3s;

    & header {
      // posicionamento
      position: fixed;
      right: 0%;
      // medidas
      width: calc(100% - $sideBarWidth - 10px);
      height: $headerHeigth;
      // estilo
      background-color: red;

      transition: $transition;
    }

    & aside {
      // posicionamento
      position: fixed;
      left: 0;
      // medidas
      height: 100dvh;
      width: $sideBarWidth;
      // estilo
      background-color: blue;

      & .toggleSidebar {
        // posicionamento
        position: absolute;
        right: 0;
        // medidas
        height: 28px;
        width: 28px;
        border: none;
      }

      transition: $transition;
    }

    & main {
      // posicionamento
      position: fixed;
      right: 0;
      bottom: 0;
      // medidas
      height: calc(100dvh - $headerHeigth - 10px);
      width: calc(100% - $sideBarWidth - 10px);
      overflow: auto;
      // estilo
      background-color: green;

      transition: $transition;
    }
  }
}

@media screen and (max-width: 768px) {
  .home-page-container {
    // medidas
    width: 100%;
    height: 100dvh;
    // estilo
    background-color: white;

    $sideBarWidth: v-bind(sideBarWidth);
    $heigth: 60px;
    $transition: all 0.3s;

    & .toggleSidebar {
      display: none;
    }

    & header {
      // posicionamnto
      position: fixed;
      bottom: 0;
      // medidas
      width: 100%;
      height: $heigth;
      // estilo
      background-color: red;

      transition: $transition;
    }

    & aside {
      //posicionamento
      position: fixed;
      bottom: $heigth;
      // medidas
      width: 100%;
      height: $heigth;
      overflow: auto;
      // estilo
      background-color: blue;

      transition: $transition;
    }

    & main {
      // medidas
      width: 100%;
      height: calc(100dvh - ($heigth * 2) - 10px);
      overflow: auto;
      // estilo
      background-color: green;

      transition: $transition;
    }
  }
}
</style>
