<script setup lang="ts">
import { ref } from 'vue'
import ThemeButton from '../atoms/ThemeButton.vue'
import type { ICard } from '@/api/local'
import ThemeTextArea from '../atoms/ThemeTextArea.vue'
import TagsWithSwitch from '../organisms/tag/TagWithSwitchList.vue'
import ThemeButtonClose from '../atoms/ThemeButtonClose.vue'

const props = defineProps<{ card: ICard }>()

const emit = defineEmits<{ (e: 'emitCard', v: typeof props.card): void }>()

const textArea = ref<InstanceType<typeof ThemeTextArea>>()
const clearTextArea = () => textArea.value?.clear()

const content = ref(props.card.content)
const setContent = (v: string) => (content.value = v)

const checkedTags = ref([] as string[])
const setCheckedTags = (v: string[]) => (checkedTags.value = v)

const showEditor = ref(false)
const openEditor = () => (showEditor.value = true)
const closeEditor = () => (showEditor.value = false)

const closeAndClear = () => {
  closeEditor()
  clearTextArea()
}

const sendCard = () => {
  emit('emitCard', {
    content: content.value,
    date: props.card.date,
    id: props.card.id,
    tags: checkedTags.value
  })
  closeAndClear()
}
</script>

<template>
  <div class="card-form">
    <ThemeButtonClose class="close-button" v-show="showEditor" @click="closeAndClear" />
    <div class="tag-section" v-show="showEditor">
      <TagsWithSwitch
        :checkeds="props.card.tags"
        @emit-tags="setCheckedTags"
        unic-name="tags-switch-card-editor"
        :emit-tags="true"
        direction="row"
        class="tags-list"
      />
    </div>
    <div class="content-section">
      <ThemeTextArea
        ref="textArea"
        :content="content"
        :class="[showEditor ? 'focus' : 'nofocus', 'text-area']"
        @emit-content="setContent"
        @click="openEditor"
      />
    </div>
    <div class="handle-buttons" v-show="showEditor">
      <ThemeButton class="send-button" @mousedown="sendCard">Confirmar</ThemeButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-form {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  & .close-button {
    position: absolute;
    top: -32px;
    right: 0;
    height: 32px;
    width: 32px;
  }

  & .tag-section {
    transition: all 0.3s;
    width: 100%;
    height: 60px;
    margin: 5px 0 5px;
    & .tags-list {
      width: 100%;
      height: 100%;
      overflow: auto;
    }
    & .create-tag {
      height: 30px;
      width: 100%;
    }
  }

  & .content-section {
    width: 100%;
    & .text-area {
      width: 100%;
      transition: all 0.3s;
      height: 60px;
    }
    & .focus {
      height: 120px;
    }
  }
  & .handle-buttons {
    width: 100%;
    display: flex;
    justify-content: space-between;
    & .close-button {
      background-color: rgba(255, 122, 122, 0.5);
      width: 8%;
      &:hover {
        background-color: red;
      }
    }
    & .send-button {
      width: 100%;
    }
  }
}
</style>
