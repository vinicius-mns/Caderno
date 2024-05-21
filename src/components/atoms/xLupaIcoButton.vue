<script setup lang="ts"></script>

<template>
  <button class="lupa-ico-button">🔎</button>
</template>

<style scoped lang="scss">
.lupa-ico-button {
  width: 40px;
  font-size: 20px;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: transparent;
  border: none;
  cursor: pointer;
  filter: grayscale(100%);
  &:hover {
    filter: grayscale(0);
  }
}
</style>
