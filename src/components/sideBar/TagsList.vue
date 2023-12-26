<script setup lang="ts">
import { useTags } from '@/stores/local/tags'
import { computed, onMounted } from 'vue'

const tags = useTags()

const all = computed(() => tags.getAll)

const myTags = () => {
  console.log(all)
}

onMounted(myTags)
</script>

<template>
  <ul class="tags-list">
    <li class="tag" v-for="(tag, i) in all" :key="i" :title="tag.content">
      <p class="ico">{{ tag.img }}</p>
      <p class="text">{{ tag.content }}</p>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.tags-list {
  // medidas
  width: 100%;
  height: 100%;
  overflow: hidden;
  // display
  display: flex;
  flex-direction: column;
  align-items: center;
  // estilo
  scrollbar-gutter: stable;
  background-color: rgb(30, 184, 255);

  &:hover {
    overflow: auto;
  }

  & .tag {
    // medidas
    margin-top: 10px;
    width: 94%;
    height: 30px;
    min-height: 30px;
    // display
    display: flex;
    align-items: center;
    justify-content: flex-start;
    // estilo
    cursor: pointer;
    border-radius: 22px;
    box-sizing: border-box;

    &:hover {
      background-color: white;
      border: brown solid 1px;
    }

    & .ico {
      // medidas
      height: 28px;
      aspect-ratio: 1;
      margin-left: 4px;
      font-size: 22px;
      //display
      display: flex;
      align-items: center;
      justify-content: center;
      //estilo
      border-radius: 50%;
    }

    & .text {
      // meiddas
      width: 100%;
      height: 17px;
      margin-left: 4px;
      text-overflow: ellipsis;
      overflow: hidden;
      // estilo
      white-space: nowrap;
    }

    transition: all 0.2s;
  }
}
</style>
