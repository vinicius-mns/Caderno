<script setup lang="ts">
import TagsList from './TagsList.vue'
</script>

<template>
  <div class="sidebar-container">
    <div class="tags-container">
      <TagsList />
    </div>
  </div>
</template>

<style scoped lang="scss">
@media screen and (min-width: 768px) {
  .sidebar-container {
    // medidas
    width: 100%;
    height: 100%;

    & .tags-container {
      // medidas
      width: 100%;
      height: 90%;
      max-height: 90%;
      margin-top: 30px;
    }
  }
}

@media screen and (max-width: 768px) {
  .sidebar-container {
    // medidas
    width: 100%;
    height: 100%;

    & .tags-container {
      // medidas
      width: 100%;
      height: 100%;
    }
  }
}
</style>
