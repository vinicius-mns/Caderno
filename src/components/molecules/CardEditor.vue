<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useStyle } from '@/stores/style'
import ThemeButton from '../atoms/ThemeButton.vue'
import type { ICard } from '@/api/local'

import ThemeTextArea from '../atoms/ThemeTextArea.vue'
import TagsWithSwitch from '../organisms/tag/TagWithSwitchList.vue'

const { style } = useStyle()

const props = defineProps<{ card: ICard }>()

const emit = defineEmits<{ (e: 'emitCard', v: typeof props.card): void }>()

const content = reactive({
  value: props.card.content,
  set: (e: string) => (content.value = e)
})

const textArea = ref<InstanceType<typeof ThemeTextArea>>()

const checkedTags = reactive({
  value: props.card.tags as string[],
  set: (e: string[]) => (checkedTags.value = e)
})

const send = () => {
  emit('emitCard', {
    content: content.value,
    date: props.card.date,
    id: props.card.id,
    tags: checkedTags.value
  })
}

const showEditor = ref(false)

const open = () => (showEditor.value = true)

const close = () => {
  textArea.value?.clear()
  showEditor.value = false
}
</script>

<template>
  <div class="card-form">
    <div class="tag-section" v-show="showEditor">
      <TagsWithSwitch
        :checkeds="props.card.tags"
        @emit-tags="checkedTags.set"
        unic-name="tags-switch-card-editor"
        :emit-tags="true"
        direction="row"
        class="tags-list"
      />
    </div>
    <div class="content-section">
      <ThemeTextArea
        ref="textArea"
        :content="props.card.content"
        :class="[showEditor ? 'focus' : 'nofocus', 'text-area']"
        @emit-content="content.set"
        @focus="open"
      />
    </div>
    <div class="handle-buttons" v-show="showEditor">
      <ThemeButton class="close-button" @mousedown="close">x</ThemeButton>
      <ThemeButton class="send-button" @mousedown="send">Confirmar</ThemeButton>
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
      height: 160px;
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
      width: 90%;
      background-color: rgb(140, 140, 189);
    }
  }
}
</style>
