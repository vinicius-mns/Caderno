<script setup lang="ts"></script>

<template>
  <div class="user-area">
    <div class="avatar"></div>
  </div>
</template>

<style scoped lang="scss">
.user-area {
  // medidas
  width: 100%;
  height: 100%;
  // display
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background-color: goldenrod;

  & .avatar {
    // medidas
    width: 50px;
    aspect-ratio: 1;
    // estilo
    border-radius: 50%;
    background-color: red;
  }
}
</style>
