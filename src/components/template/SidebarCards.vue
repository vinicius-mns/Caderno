<script setup lang="ts">
import TagWithOptionsList from '../organisms/tag/TagWithOptionsList.vue'
import TagCreate from '../organisms/tag/TagCreate.vue'
// import TagCreate from '../organisms/tag/TagCreate.vue'
// import ConfigGlobal from '../organisms/ConfigGlobal.vue'
// import ShowFilterCards from '../organisms/tag/ShowFilterTags.vue'
// import CardsFilter from '../organisms/card/CardsFilter.vue'
// import { reactive } from 'vue'
</script>

<template>
  <div class="sibebar-cards-container">
    <TagCreate class="button-margin" />
    <TagWithOptionsList />
  </div>
</template>

<style scoped lang="scss">
.sibebar-cards-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  & .button-margin {
    padding: 10px;
    box-sizing: border-box;
  }
}
</style>
