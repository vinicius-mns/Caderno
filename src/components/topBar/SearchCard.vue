<script setup lang="ts"></script>

<template>
  <div class="search">
    <input type="text" placeholder="Pesquisar" />
  </div>
</template>

<style scoped lang="scss">
@media screen and (min-width: 769px) {
  .search {
    // medidas
    width: 100%;
    height: 100%;
    // display
    display: flex;
    align-items: center;
    justify-content: center;

    & input {
      // medidas
      width: 60%;
      height: 32px;
      // estilo
      border: none;
      outline: none;
      background-color: white;
      border-radius: 40px;
      box-sizing: border-box;
      padding-left: 12px;
      padding-right: 12px;
    }
  }
}
@media screen and (max-width: 768px) {
  .search {
    & input {
      height: 38px;
      width: 90%;
      border: none;
      border-radius: 50px;
      box-sizing: border-box;
      padding-left: 38px;
    }
  }
}
</style>
