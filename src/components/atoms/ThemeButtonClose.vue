<script setup lang="ts"></script>

<template>
  <button class="close-modal-button">x</button>
</template>

<style scoped lang="scss">
$size: 32px;
.close-modal-button {
  width: $size;
  height: $size;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  background-color: rgba(255, 0, 0, 0.096);
  color: white;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 3, 3, 0.788);
    overflow: hidden;
  }
}
</style>
