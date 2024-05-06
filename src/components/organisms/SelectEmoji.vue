<script setup lang="ts">
import EmojiSelector from '../molecules/EmojiSelector.vue'
import { ref } from 'vue'
import { useEmoji } from '@/stores/emojis'
import FloatModalSlot from '../molecules/FloatModalSlot.vue'
import ThemeButton from '../atoms/ThemeButton.vue'

const emojis = useEmoji()

const props = defineProps<{
  seletedEmoji: string
}>()

const emit = defineEmits<{
  (e: 'changeEmoji', v: string): void
}>()

const modal = ref<InstanceType<typeof FloatModalSlot>>()

const allEmojis = ref(emojis.getAll())

const sendSelected = (e: string) => {
  emit('changeEmoji', e)
  modal.value?.close()
}
</script>

<template>
  <FloatModalSlot ref="modal">
    <template #button-slot>
      <ThemeButton>{{ props.seletedEmoji ? props.seletedEmoji : '+' }}</ThemeButton>
    </template>
    <template #container-slot>
      <div class="modal-selec-emoji">
        <div class="emoji-selector-container">
          <EmojiSelector
            :emojis="allEmojis"
            :emoji-selected="props.seletedEmoji"
            @change-emoji="sendSelected"
          />
        </div>
      </div>
    </template>
  </FloatModalSlot>
</template>

<style scoped lang="scss">
$buttonSize: 36px;
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
