<script setup lang="ts">
import { reactive } from 'vue'
import { useStyle } from '@/stores/style'
import ThemeButton from '../atoms/ThemeButton.vue'
import type { ICard } from '@/api/local'

import ThemeTextArea from '../atoms/ThemeTextArea.vue'
import CreateTag from '../organisms/tag/TagCreate.vue'
import TagsWithSwitch from '../organisms/tag/TagWithSwitchList.vue'

const { style } = useStyle()

const props = defineProps<{ card: ICard }>()

const emit = defineEmits<{ (e: 'emitCard', v: typeof props.card): void }>()

const content = reactive({
  value: props.card.content,
  set: (e: string) => (content.value = e)
})

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
</script>

<template>
  <div class="card-editor">
    <div class="card-form">
      <div class="content-section">
        <ThemeTextArea
          :content="props.card.content"
          @emit-content="content.set"
          class="text-area"
        />
        <ThemeButton class="send-button" @click="send">Confirmar</ThemeButton>
      </div>
      <div class="tag-section">
        <TagsWithSwitch
          :checkeds="props.card.tags"
          @emit-tags="checkedTags.set"
          unic-name="tags-switch-card-editor"
          :emit-tags="true"
          direction="column"
          class="tags-list"
        />
        <CreateTag class="create-tag" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$butonsize: v-bind('style.button.size');
$margin: 10px;
.card-editor {
  width: 900px;
  max-width: 100%;
  height: 60dvh;
  box-sizing: border-box;
  padding: $margin;
  & .card-form {
    width: 100%;
    height: 100%;
    display: flex;
    & .content-section {
      width: 60%;
      height: calc(100% - $butonsize - $margin);
      box-sizing: border-box;
      padding: $margin;
      & .send-button {
        width: 100%;
        margin-top: calc($margin / 2);
      }
    }
    & .tag-section {
      width: 40%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      & .tags-list {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        height: calc(100% - $butonsize - $margin);
        overflow: auto;
      }
      & .create-tag {
        height: $butonsize;
      }
    }

    @media screen and (max-width: 768px) {
      flex-direction: column;
      & .content-section {
        width: 100%;
        height: 50%;
        padding: 0;
        & .text-area {
          height: calc(100% - $butonsize - $margin);
        }
        & .send-button {
          flex-shrink: 0;
          margin-top: 0;
        }
      }
      & .tag-section {
        width: 100%;
        height: 50%;
      }
    }
  }
}
</style>
