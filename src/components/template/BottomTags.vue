<script setup lang="ts">
import { useTags } from '@/stores/tags/tags'

const tags = useTags()
</script>

<template>
  <div class="bottom-container">
    <div class="bottom">
      <p v-for="(tag, i) in tags.includeTags" :key="i">{{ tag[0] }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bottom-container {
  position: fixed;
  bottom: calc(15px + 63px);
  transition: all 0.3s;
  left: 0;

  width: 100dvw;
  height: auto;
  min-height: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  & .bottom {
    // height: 20px;
    // width: 500px;
    // width: 200px;
    // min-height: 40px;
    // min-width: 200px;
    padding: 8px;
    display: flex;
    gap: 5px;
    border-radius: 100px;

    & p {
      margin: 0;
      padding: 0;
    }
  }
}
</style>
