<script setup lang="ts"></script>

<template>
  <div class="sidebar-container">
    <div class="user-area-container">
      <p>user-area-container</p>
    </div>
    <div class="tags-list-container">
      <p>tags-list-container</p>
    </div>
    <div class="create-tag-container">
      <p>tags-list-create-button</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidebar-container {
  // medidas
  width: 100%;
  height: 100%;
  overflow: hidden;
  // display
  display: flex;
  flex-direction: column;
  // estilo
  background-color: red;

  & .user-area-container {
    // medidas
    width: 100%;
    height: 120px;
    min-height: 120px;
    //estilo
    background-color: blue;
  }

  & .tags-list-container {
    // medidas
    width: 100%;
    max-height: 60%;
    overflow: auto;
    // estilo
    background-color: palegreen;
  }

  & .create-tag-container {
    // medidas
    width: 100%;
    height: 32px;
    min-height: 32px;
    // estilo
    background-color: burlywood;
  }
}
</style>
