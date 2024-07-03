<script setup lang="ts">
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import ButtonOption from '@/components/molecules/ButtonOption.vue'
import { reactive } from 'vue'
import CheckIco from '@/components/atoms/icons/CheckIco.vue'
import EmojiSelector from '@/components/molecules/EmojiSelector.vue'
import ThemeImputText from '@/components/atoms/ThemeImputText.vue'

const props = defineProps<{
  tag: ITag
  emojis: string[]
}>()

const emit = defineEmits<{
  (e: 'emitTag', v: ITag): void
}>()

const tagReative = reactive<ITag>({
  id: props.tag.id,
  content: props.tag.content,
  emoji: props.tag.emoji
})

const setContent = (content: string) => (tagReative.content = content)

const setEmoji = (emoji: string) => (tagReative.emoji = emoji)

const sendContent = () => {
  emit('emitTag', {
    id: props.tag.id,
    content: tagReative.content,
    emoji: tagReative.emoji
  })
}
</script>

<template>
  <div class="card-editor-container">
    <div class="tag-area">
      <EmojiSelector
        :seleted-emoji="tagReative.emoji"
        @change-emoji="setEmoji"
        :emojis="props.emojis"
      />
      <ThemeImputText
        @emit-content="setContent"
        :init-content="tagReative.content"
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
