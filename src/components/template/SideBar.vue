<script setup lang="ts">
import CreateTagButton from '../organism/CreateTagButton.vue'
</script>

<template>
  <div class="side-bar">
    <div class="container-tags-list">
      <p>tags list aqui</p>
    </div>
    <div class="container-button-create-tag">
      <CreateTagButton />
    </div>
  </div>
</template>

<style scoped lang="scss">
@media screen and (min-width: 769px) {
  .side-bar {
    width: 100%;
    height: 100%;
    background-color: grey;

    & .container-tags-list {
      width: 100%;
      height: 80%;
      background-color: blue;
    }

    & .container-button-create-tag {
      margin-top: 5px;
      width: 100%;
      height: 38px;
      background-color: blue;
    }
  }
}

@media screen and (max-width: 768px) {
}
</style>
