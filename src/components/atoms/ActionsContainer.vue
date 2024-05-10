<script setup lang="ts"></script>

<template>
  <div class="actions-container">
    <slot></slot>
  </div>
</template>

<style scoped lang="scss">
.actions-container {
  position: fixed;
  bottom: 50px;
  left: 20%;
  display: flex;
  align-items: center;
}
</style>
