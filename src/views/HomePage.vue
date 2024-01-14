<script setup lang="ts">
import { ref } from 'vue'
import SideBar from '@/components/template/SideBar.vue'

const sideBarWidth = ref('250px')
const showSidebar = ref(true)
const sideBarIsClosed = ref(false)

const openSidebar = () => {
  sideBarWidth.value = '250px'
  showSidebar.value = true
}

const closeSidebar = () => {
  if (sideBarIsClosed.value) {
    sideBarWidth.value = '8px'
    showSidebar.value = false
  }
}

const toggleSidebar = () => {
  const closed = sideBarIsClosed.value
  sideBarIsClosed.value = !closed
  closed ? openSidebar() : closeSidebar()
}
</script>

<template>
  <div class="home-page-container">
    <aside @mouseenter="openSidebar" @mouseleave="closeSidebar">
      <button class="toggleSidebar" @click="toggleSidebar" v-show="!sideBarIsClosed">x</button>
      <SideBar />
    </aside>
    <footer></footer>
    <main>
      <RouterView />
    </main>
    <header>
      <button class="toggleSidebar" @click="toggleSidebar" v-show="sideBarIsClosed">x</button>
    </header>
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
    $headerHeigth: 50px;
    $transition: all 0.3s;

    & footer {
      display: none;
    }

    & header {
      // posicionamento
      position: fixed;
      right: 0%;
      // medidas
      width: 100%;
      height: $headerHeigth;
      // estilo
      background-color: red;

      & .toggleSidebar {
        // posicionamento
        position: absolute;
        left: 0;
        // medidas
        height: 100%;
        aspect-ratio: 1;
        border: none;
      }

      transition: $transition;
    }

    & aside {
      // posicionamento
      position: fixed;
      left: 0;
      top: calc($headerHeigth + 10px);
      // medidas
      height: calc(100dvh - $headerHeigth - 10px);
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

    & footer {
      // posicionamnto
      position: fixed;
      bottom: 0;
      // medidas
      width: 100%;
      height: $heigth;
      // estilo
      background-color: rgb(20, 220, 203);

      transition: $transition;
    }

    & header {
      display: none;
    }

    & aside {
      display: none;
    }

    & main {
      // medidas
      width: 100%;
      height: calc(100dvh - $heigth - 10px);
      overflow: auto;
      // estilo
      background-color: green;

      transition: $transition;
    }
  }
}
</style>
