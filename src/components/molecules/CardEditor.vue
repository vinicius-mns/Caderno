<script setup lang="ts">
import { ref } from 'vue'
import type { ICard } from '@/api/local'
import ThemeTextArea from '../atoms/ThemeTextArea.vue'
import TagsWithSwitch from '../organisms/tag/TagWithSwitchList.vue'
import OptionButton from './OptionButton.vue'
import CheckIco from '@/components/atoms/icons/CheckIco.vue'
import TagCreate from '../organisms/tag/TagCreate.vue'

const props = defineProps<{ card: ICard }>()

const emit = defineEmits<{ (e: 'emitCard', v: typeof props.card): void }>()

const textArea = ref<InstanceType<typeof ThemeTextArea>>()
const clearTextArea = () => textArea.value?.clear()

const content = ref(props.card.content)
const setContent = (v: string) => (content.value = v)

const checkedTags = ref([] as string[])
const setCheckedTags = (v: string[]) => (checkedTags.value = v)

const closeAndClear = () => {
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
    <div class="tag-section">
      <TagsWithSwitch
        :checkeds="props.card.tags"
        @emit-tags="setCheckedTags"
        unic-name="tags-switch-card-editor"
        :emit-tags="true"
        direction="column"
        class="tags-list"
      />
      <TagCreate class="tag-create" />
    </div>
    <div class="content-section">
      <ThemeTextArea
        ref="textArea"
        :content="content"
        class="text-area"
        @emit-content="setContent"
      />
      <OptionButton content="Confirmar" @click="sendCard" class="send-button">
        <CheckIco />
      </OptionButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-form {
  width: 380px;
  max-width: 95%dvw;
  height: 48dvh;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  & .tag-section {
    width: 100%;
    height: 100%;
    transition: all 0.3s;
    overflow: auto;
    display: flex;
    flex-direction: column;
    .tag-create {
      padding: 10px 0 10px;
      box-sizing: border-box;
    }
  }
  & .content-section {
    width: 100%;
    & .text-area {
      width: 100%;
      height: 90px;
      transition: all 0.3s;
    }
    & .send-button {
      width: 100%;
    }
  }
  // & .handle-buttons {
  //   width: 100%;
  //   display: flex;
  //   justify-content: space-between;
  //   & .close-button {
  //     background-color: rgba(255, 122, 122, 0.5);
  //     width: 8%;
  //     &:hover {
  //       background-color: red;
  //     }
  //   }
  //   & .send-button {
  //     width: 100%;
  //   }
  // }
}
</style>
