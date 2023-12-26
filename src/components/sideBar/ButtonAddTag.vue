<script setup lang="ts">
import { ref } from 'vue'
import TagEditor from '../modal/TagEditor.vue'

const showModal = ref(false)
const toggleModal = () => (showModal.value = !showModal.value)
</script>

<template>
  <div class="button-add-tag">
    <button @click="toggleModal">
      <p>Criar uma nova tag</p>
    </button>
    <TagEditor :toggle-show="toggleModal" v-show="showModal" />
  </div>
</template>

<style scoped lang="scss">
.button-add-tag {
  // medidas
  height: 30px;
  width: 90%;

  & button {
    // medidas
    width: 100%;
    height: 100%;
    // estilo
    background-color: red;
    text-overflow: ellipsis;
    overflow: hidden;
    border: none;
    cursor: pointer;
  }
}
</style>
