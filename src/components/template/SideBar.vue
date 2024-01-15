<script setup lang="ts">
import { useStyle } from '@/stores/style'
import CreateTagButton from '../organism/CreateTagButton.vue'

const { style } = useStyle()
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
.side-bar {
  width: 100%;
  height: 100%;
  & .container-tags-list {
    width: 100%;
    height: 80%;
  }

  & .container-button-create-tag {
    margin-top: 5px;
    width: 100%;
    height: v-bind('style.button.size.m');
    display: flex;
    justify-content: center;
  }
}
</style>
