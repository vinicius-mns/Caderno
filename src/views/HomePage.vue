<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="home-page">
    <aside>
      <p>sideBar</p>
    </aside>
    <main>
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

  $asideWidth: 18;

  & aside {
    // medidas
    height: 100%;
    width: $asideWidth * 1%;
    // estilo
    background-color: blue;
  }

  & main {
    // medidas
    height: 100%;
    width: (100 - $asideWidth) * 1%;
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
  }
}
</style>
