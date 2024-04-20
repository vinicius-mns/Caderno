<script setup lang="ts">
import { ref } from 'vue'
import InputTextAtom from '../atoms/InputTextAtom.vue'
import LupaIcoButton from '../atoms/LupaIcoButton.vue'

const props = defineProps<{
  keyId: string
  content: string
  placeholder: string
}>()

const emit = defineEmits<{
  (e: 'emitContent', v: string): void
}>()

const searchText = ref('')

const setSearchText = (e: string) => (searchText.value = e)

const emitContent = () => emit('emitContent', searchText.value)
</script>

<template>
  <div class="search-container">
    <InputTextAtom
      :key-id="props.keyId"
      :content="props.content"
      :placeholder="props.placeholder"
      @emit-content="setSearchText"
      @keydown.enter="emitContent"
      class="search-text-input"
    />
    <LupaIcoButton @click="emitContent" class="lupa" />
  </div>
</template>

<style scoped lang="scss">
.search-container {
  position: relative;
  width: 100%;
  .search-text-input {
    width: 100%;
  }
  .lupa {
    position: absolute;
    right: 10px;
  }
}
</style>
