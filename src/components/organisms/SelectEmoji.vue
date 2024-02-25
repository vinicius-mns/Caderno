<script setup lang="ts">
import EmojiSelector from '../molecules/EmojiSelector.vue'

import { ref } from 'vue'
import { useStyle } from '@/stores/style'
import CenterModal from '../atoms/CenterModal.vue'
import ThemeButton from '../atoms/ThemeButton.vue'
import { useEmoji } from '@/stores/emojis'
import SearchByText from '../molecules/SearchByText.vue'

const { style } = useStyle()

const emojis = useEmoji()

const props = defineProps<{
  seletedEmoji: string
}>()

const emit = defineEmits<{
  (e: 'changeEmoji', v: string): void
}>()

const allEmojis = ref(emojis.getAll())
const showModal = ref(false)
const openModal = () => (showModal.value = true)
const closeModal = () => (showModal.value = false)

const search = (e: string) => {
  allEmojis.value = emojis.getAll(e)
}

const sendSelected = (e: string) => {
  emit('changeEmoji', e)
  closeModal()
}
</script>

<template>
  <div>
    <ThemeButton class="button" @click="openModal">{{ props.seletedEmoji }}</ThemeButton>
    <CenterModal title-modal="Selecione um emoji" v-if="showModal" @close="closeModal">
      <div class="modal-selec-emoji">
        <SearchByText
          content=""
          placeholder="pesquisar emoji"
          key-id="search-emoji"
          @emit-content="search"
          class="search"
        />
        <div class="emoji-selector-container">
          <EmojiSelector
            :emojis="allEmojis"
            :emoji-selected="props.seletedEmoji"
            @change-emoji="sendSelected"
          />
        </div>
      </div>
    </CenterModal>
  </div>
</template>

<style scoped lang="scss">
$buttonSize: v-bind('style.button.size');
.button {
  width: $buttonSize;
  height: $buttonSize;
  border-radius: 50%;
  font-size: calc($buttonSize + 2px);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
}
.modal-selec-emoji {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 450px;
  max-width: 90dvw;
  & .search {
    width: 90%;
    margin: 5px;
  }
  & .emoji-selector-container {
    width: 95%;
    margin-bottom: 5px;
  }
}
</style>
