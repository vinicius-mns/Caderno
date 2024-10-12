<script setup lang="ts">
import { reactive } from 'vue'
import EmojiSelector from '@/components/molecules/EmojiSelector.vue'
import ThemeImputText from '@/components/atoms/ThemeImputText.vue'
import type { Itag } from '@/stores/tags/Interfaces'

const props = defineProps<{
  tag: Itag
  emojis: string[]
}>()

const emit = defineEmits<{
  (e: 'sendtag', v: Itag): void
}>()

const tagReative = reactive({
  emoji: props.tag[0],
  name: props.tag[1],
  atualName: props.tag[1]
})

const sendtag = () => {
  emit('sendtag', [tagReative.emoji, tagReative.name])
}

const nameSetAndSend = (name: string) => {
  tagReative.name = name

  sendtag()
}

const emojiSetAnsSend = (emoji: string) => {
  tagReative.emoji = emoji

  sendtag()
}
</script>

<template>
  <div class="tag-editor-container">
    <EmojiSelector
      :seleted-emoji="tagReative.emoji"
      @change-emoji="emojiSetAnsSend"
      :emojis="props.emojis"
      class="emoji"
    />

    <ThemeImputText
      @emit-content="nameSetAndSend"
      :init-content="tagReative.name"
      key-id="tag-editor"
      placeholder="Nome da tag"
      class="imput-text"
    />
  </div>
</template>

<style scoped lang="scss">
.tag-editor-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & .imput-text {
    width: calc(100% - 55px);
    height: 42px;
  }
}
</style>
