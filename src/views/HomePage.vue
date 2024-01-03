<script setup lang="ts">
</script>

<template>
  <div class="home-page-container">
    <header>
      <!-- <TopBarContainer /> -->
    </header>
    <aside>
      <!-- <SideBarContainer /> -->
    </aside>
    <main>
      <!-- <RouterView /> -->
    </main>
  </div>
</template>

<style scoped lang="scss">
@media screen and (min-width: 768px) {
  .home-page-container {
    //medidas
    height: 100dvh;
    width: 100%;
    // estilo
    background-color: white;

    $sideBarWidth: 250px;
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

    $heigth: 50px;
    $transition: all 0.3s;

    & .toggleSidebar {
      display: none;
    }

    & header {
      // posicionamnto
      position: fixed;
      bottom: calc($heigth + 5px);
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
      bottom: 0;
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
      min-height: calc(100dvh - ($heigth * 2) - 10px);
      overflow: auto;
      // estilo
      background-color: green;

      transition: $transition;
    }
  }
}
</style>
