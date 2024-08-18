<script setup lang="ts">
import ButtonOption from '@/components/molecules/ButtonOption.vue'
import { reactive } from 'vue'
import CheckIco from '@/components/atoms/icons/CheckIco.vue'
import EmojiSelector from '@/components/molecules/EmojiSelector.vue'
import ThemeImputText from '@/components/atoms/ThemeImputText.vue'
import type { Itag } from '@/stores/tags/Interfaces'

const props = defineProps<{
  tag: Itag
  emojis: string[]
}>()

const emit = defineEmits<{
  (e: 'emitTagUpdated', v: { emoji: string; name: string; atualName: string }): void
}>()

const tagReative = reactive({
  emoji: props.tag[0],
  name: props.tag[1],
  atualName: props.tag[1]
})

const nameSet = (name: string) => (tagReative.name = name)

const emojiSet = (emoji: string) => (tagReative.emoji = emoji)

const sendContent = () => {
  emit('emitTagUpdated', tagReative)
}
</script>

<template>
  <div class="card-editor-container">
    <div class="tag-area">
      <EmojiSelector
        :seleted-emoji="tagReative.emoji"
        @change-emoji="emojiSet"
        :emojis="props.emojis"
      />
      <ThemeImputText
        @emit-content="nameSet"
        :init-content="tagReative.name"
        key-id="tag-editor"
        placeholder="Nome da tag"
        class="imput-text"
      />
    </div>
    <ButtonOption content="Confirmar" @click="sendContent" class="imput">
      <CheckIco />
    </ButtonOption>
  </div>
</template>

<style scoped lang="scss">
.card-editor-container {
  width: 340px;
  max-width: 95dvw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  box-sizing: border-box;
  & .tag-area {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;
    & .imput-text {
      width: calc(100% - 55px);
      height: 42px;
    }
  }
}
</style>
