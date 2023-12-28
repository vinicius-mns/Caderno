<script setup lang="ts">
import UserArea from './UserArea.vue'
import ButtonAddTag from './ButtonAddTag.vue'
import TagsList from './TagsList.vue'
</script>

<template>
  <div class="sidebar-container">
    <div class="user-area-container">
      <UserArea />
    </div>
    <div class="tags-list-container">
      <TagsList />
    </div>
    <div class="create-tag-container">
      <ButtonAddTag />
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidebar-container {
  // medidas
  width: 100%;
  height: 100%;
  overflow: hidden;
  // display
  display: flex;
  flex-direction: column;

  & .user-area-container {
    // medidas
    width: 100%;
    height: 120px;
    min-height: 120px;
    //estilo
    background-color: rgb(178, 39, 95);
  }

  & .tags-list-container {
    // medidas
    width: 100%;
    max-height: 60%;
  }

  & .create-tag-container {
    // medidas
    width: 100%;
    height: 32px;
    min-height: 32px;
    margin-top: 5px;
    // display
    display: flex;
    align-items: center;
    justify-content: center;
    // estilo
    background-color: burlywood;
  }
}
</style>
