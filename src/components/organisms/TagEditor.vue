<script setup lang="ts">
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import ButtonOption from '@/components/molecules/ButtonOption.vue'
import { reactive } from 'vue'
import CheckIco from '@/components/atoms/icons/CheckIco.vue'
import EmojiSelector from '@/components/molecules/EmojiSelector.vue'
import ThemeImputText from '@/components/atoms/ThemeImputText.vue'
import ModalCard from '../atoms/ModalCard.vue'

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
    <EmojiSelector
      :seleted-emoji="tagReative.emoji"
      @change-emoji="setEmoji"
      :emojis="props.emojis"
      class="imput"
    />
    <ThemeImputText
      :content="tagReative.content"
      @emit-content="setContent"
      key-id="tag-editor"
      placeholder="Nome da tag"
      class="imput"
    />
    <ButtonOption content="Confirmar" @click="sendContent" class="imput">
      <CheckIco />
    </ButtonOption>
  </div>
</template>

<style scoped lang="scss">
.card-editor-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  & .imput {
    margin: 3px;
  }
}
</style>
