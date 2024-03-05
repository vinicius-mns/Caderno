<script setup lang="ts">
import CardCreate from '../organisms/card/CardCreate.vue'
import ConfigGlobal from '../organisms/ConfigGlobal.vue'
</script>

<template>
  <div class="top-bar">
    <div class="blanc"></div>
    <div class="create-card">
      <CardCreate />
    </div>
    <div class="config">
      <ConfigGlobal />
    </div>
  </div>
</template>

<style scoped lang="scss">
.top-bar {
  height: 100%;
  width: 100%;
  display: flex;
  .blanc {
    width: 20%;
  }
  & .create-card {
    height: 100%;
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & .config {
    height: 100%;
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
