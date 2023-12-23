<script setup lang="ts"></script>

<template>
  <div class="search">
    <input type="text" placeholder="Pesquisar" />
  </div>
</template>

<style scoped lang="scss">
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
    width: 68%;
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
</style>
