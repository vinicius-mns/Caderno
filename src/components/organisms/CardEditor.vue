<script setup lang="ts">
import { reactive } from 'vue'
import type { ICard } from '@/api/local'
import ThemeTextArea from '@/components/atoms/ThemeTextArea.vue'
import CheckIco from '@/components/atoms/icons/CheckIco.vue'
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import ButtonOption from '@/components/molecules/ButtonOption.vue'
import TagSelectable from '@/components/molecules/TagSelectable.vue'
import ThemeP from '../atoms/ThemeP.vue'

const props = defineProps<{ card: ICard; allTags: ITag[] }>()

const emit = defineEmits<{ (e: 'emitCard', v: ICard): void }>()

const card = reactive({
  content: props.card.content,
  tags: props.card.tags
})

const isChecked = (id: string) => card.tags.includes(id)

const setContent = (v: string) => (card.content = v)

const addCheckTagId = (tag: ITag) => {
  card.tags = [...card.tags, tag.id]
}

const removeCheckTagId = (tag: ITag) => {
  const atualCheckedTagIds = card.tags
  card.tags = atualCheckedTagIds.filter((id) => id !== tag.id)
}

const handleCheckTags = (tagCheck: { tag: ITag; check: boolean }) => {
  tagCheck.check ? addCheckTagId(tagCheck.tag) : removeCheckTagId(tagCheck.tag)
}

const clearAll = () => {
  card.content = ''
  card.tags = []
}

const sendCard = () => {
  emit('emitCard', {
    content: card.content,
    date: props.card.date,
    id: props.card.id,
    tags: card.tags
  })
  clearAll()
}
</script>

<template>
  <div class="card-form">
    <div class="tag-section">
      <ThemeP content="Clique nas tags para adiciona-las ao card" />
      <TagSelectable
        v-for="(tag, i) in allTags"
        :key="i"
        :tag="tag"
        @emit-tag="handleCheckTags"
        :checked="isChecked(tag.id)"
        class="tag"
      />
    </div>
    <div class="content-section">
      <ThemeTextArea
        ref="textArea"
        :content="card.content"
        class="textarea"
        @emit-content="setContent"
      />
    </div>
    <ButtonOption content="Confirmar" @click="sendCard" class="confim-button">
      <CheckIco />
    </ButtonOption>
  </div>
</template>

<style scoped lang="scss">
.card-form {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  & .tag-section {
    width: 100%;
    max-height: 70%;
    box-sizing: border-box;
    overflow: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    & .tag {
      width: 45%;
    }
  }
  & .content-section {
    height: 30%;
    & .textarea {
      font-size: 15px;
      margin: 10px 0;
      height: calc(100% - 20px);
    }
  }
}
</style>