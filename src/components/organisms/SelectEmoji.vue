<script setup lang="ts">
import EmojiSelector from '../molecules/EmojiSelector.vue'
import { ref } from 'vue'
import { useStyle } from '@/stores/style'
import { useEmoji } from '@/stores/emojis'
import CenterModal from '../molecules/CenterModal.vue'

const { style } = useStyle()

const emojis = useEmoji()

const props = defineProps<{
  seletedEmoji: string
}>()

const emit = defineEmits<{
  (e: 'changeEmoji', v: string): void
}>()

const centerModal = ref<InstanceType<typeof CenterModal>>()

const allEmojis = ref(emojis.getAll())

const sendSelected = (e: string) => {
  emit('changeEmoji', e)
  centerModal.value?.toggleVisible()
}
</script>

<template>
  <CenterModal
    :button-content="props.seletedEmoji ? props.seletedEmoji : '+'"
    title-modal="Selecione um emoji"
    ref="centerModal"
    class="container-selectemoji"
  >
    <div class="modal-selec-emoji">
      <div class="emoji-selector-container">
        <EmojiSelector
          :emojis="allEmojis"
          :emoji-selected="props.seletedEmoji"
          @change-emoji="sendSelected"
        />
      </div>
    </div>
  </CenterModal>
</template>

<style scoped lang="scss">
$buttonSize: v-bind('style.button.size');
.container-selectemoji {
  width: $buttonSize;
  flex-shrink: 0;
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
}
</style>
