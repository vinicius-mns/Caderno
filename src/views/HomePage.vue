<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'

const sideBarWidth = ref(18)

const minimize = () => {
  if (sideBarWidth.value === 18) {
    sideBarWidth.value = 0
  } else if (sideBarWidth.value >= 0) {
    sideBarWidth.value = 18
  }
}
</script>

<template>
  <div class="home-page">
    <aside :style="{ width: `${sideBarWidth}%` }">
      <button class="minimize-sideBar" @click="minimize"><p>⏪</p></button>
      <p>sideBar</p>
    </aside>
    <main :style="{ width: `${100 - sideBarWidth}%` }">
      <header>
        <p>topbar</p>
      </header>
      <article>
        <p>pages</p>
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

  & aside {
    // medidas
    height: 100%;
    min-width: 30px;
    //posicionamento
    position: relative;
    // estilo
    background-color: blue;

    & .minimize-sideBar {
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
    overflow: auto;
    //display
    display: flex;
    flex-direction: column;
    // estilo
    background-color: aqua;

    $headerHeight: 6;

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
      // estilo
      background-color: purple;
    }

    transition: all 0.3s;
  }
}
</style>
