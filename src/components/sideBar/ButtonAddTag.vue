<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import TagEditor from '../modal/TagEditor.vue'
import { useSize } from '@/stores/style'

const size = useSize()
const button = computed(() => `${size.device.button + 7}px`)
const createTagText = ref('')

const showModal = ref(false)
const toggleModal = () => (showModal.value = !showModal.value)

watchEffect(() => {
  const device = size.store.deviceName
  if (device === 'mobile') createTagText.value = '+'
  if (device !== 'mobile') createTagText.value = 'Criar uma nova tag'
})
</script>

<template>
  <div class="button-add-tag">
    <button @click="toggleModal">
      <p>{{ createTagText }}</p>
    </button>
    <TagEditor :toggle-show="toggleModal" v-show="showModal" />
  </div>
</template>

<style scoped lang="scss">
.button-add-tag {
  // medidas
  width: 100%;
  // display
  display: flex;
  justify-content: center;

  & button {
    // medidas
    margin-top: 10px;
    width: 94%;
    height: v-bind('button');
    // estilo
    background-color: rgb(96, 218, 229);
    text-overflow: ellipsis;
    overflow: hidden;
    border: none;
    cursor: pointer;
    border-radius: 60px;
    box-sizing: border-box;
  }
}
</style>
