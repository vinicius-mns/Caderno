<script setup lang="ts">
import { useStyle } from '@/stores/style'
import CardCreate from '../organisms/card/CardCreate.vue'
import TagWithOptionsList from '../organisms/tag/TagWithOptionsList.vue'
import TagCreate from '../organisms/tag/TagCreate.vue'
import ConfigGlobal from '../organisms/ConfigGlobal.vue'
import ShowFilterCards from '../organisms/tag/ShowFilterTags.vue'

const { style } = useStyle()

const emit = defineEmits<{
  (e: 'closePanel', v: void): void
}>()

const close = () => emit('closePanel')
</script>

<template>
  <main class="control-panel">
    <button class="close-button" @click="close">X</button>
    <div class="container row">
      <ConfigGlobal class="config" />
      <CardCreate class="create-card" />
    </div>
    <div class="container row">
      <TagCreate class="create-card" />
      <ShowFilterCards class="config" />
    </div>
    <div class="container tags">
      <TagWithOptionsList />
    </div>
  </main>
</template>

<style scoped lang="scss">
$buttonSize: v-bind('style.button.size');
$container-1-h: calc($buttonSize + 12px);
$container-2-h: calc($buttonSize + 8px);
$container-3-h: calc(100% - $container-1-h - $container-2-h);
.control-panel {
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 10px;
  width: 95%;
  height: 90%;
  border-radius: 10px;
  // box-shadow: v-bind('style.boxShadow');
  background-color: v-bind('style.component.bgColor');
  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
  }
  & .container {
    width: 100%;
  }
  & .tags {
    overflow: hidden;
  }
  & .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    & .config {
      width: 20%;
    }
    & .create-card {
      width: 75%;
    }
  }
  & .close-button {
    background-color: red;
    color: white;
    border: none;
    position: absolute;
    right: 0;
    top: -20px;
    opacity: 20%;
    cursor: pointer;
    &:hover {
      opacity: 100%;
    }
  }
}
</style>
