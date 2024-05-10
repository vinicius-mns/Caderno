<script setup lang="ts">
import { reactive } from 'vue'
import InputTextAtom from '../atoms/InputTextAtom.vue'
import SelectEmoji from '../organisms/SelectEmoji.vue'
import ThemeButton from '../atoms/ThemeButton.vue'
import type { ITag } from '@/api/local'

const props = defineProps<{ tag: ITag }>()

const emit = defineEmits<{
  (e: 'emitTag', v: typeof props.tag): void
}>()

const tag = reactive({
  emoji: {
    value: props.tag.emoji,
    setValue: (e: string) => (tag.emoji.value = e)
  },
  content: {
    value: props.tag.content,
    setValue: (e: string) => (tag.content.value = e)
  },
  get: (): ITag => {
    return {
      id: props.tag.id,
      emoji: tag.emoji.value,
      content: tag.content.value
    }
  }
})

const emitTag = () => {
  emit('emitTag', tag.get())
}
</script>

<template>
  <div class="container" @keyup.enter="emitTag">
    <div class="tag-editor">
      <SelectEmoji
        :seleted-emoji="tag.emoji.value"
        @change-emoji="tag.emoji.setValue"
        class="emoji-button"
      />
      <InputTextAtom
        placeholder="Nome da tag"
        key-id="tag-content"
        :content="tag.content.value"
        class="content-input"
        @emit-content="tag.content.setValue"
      />
    </div>
    <ThemeButton class="send-button" @click="emitTag">Confirmar</ThemeButton>
  </div>
</template>

<style scoped lang="scss">
$buttonSize: 36px;
$margin: 10px;
.container {
  padding: 10px;
  box-sizing: border-box;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & .tag-editor {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    & .emoji-button {
      margin-bottom: 10px;
    }
    & .content-input {
      width: 100%;
    }
  }
  & .send-button {
    margin-top: $margin;
    width: 100%;
    height: $buttonSize;
  }
}
</style>
