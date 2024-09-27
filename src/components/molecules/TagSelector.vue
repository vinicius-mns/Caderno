<script setup lang="ts">
import { ref } from 'vue'
import type { Itag } from '@/stores/tags/Interfaces'
import ModalCard from '../atoms/ModalCard.vue'
import FlexContainer from '../atoms/FlexContainer.vue'
import CheckBoxBase from '../atoms/CheckBoxBase.vue'
import TagView from '../molecules/TagView.vue'

const props = defineProps<{ tagsSelected: Itag[]; allTags: Itag[] }>()

const emit = defineEmits<{
  (e: 'emitSelected', v: Itag[]): void
}>()

const tagsList = ref(props.allTags)

const tagsSelected = ref(props.tagsSelected)

const tagsSelectedAdd = (tag: Itag) => (tagsSelected.value = [...tagsSelected.value, tag])

const tagsSelectedRemove = (tag: Itag) => {
  const tags = tagsSelected.value
  tagsSelected.value = tags.filter((t) => t[1] !== tag[1])
}

const tagIsChecked = (name: string) => tagsSelected.value.map((tag) => tag[1]).includes(name)

const addOrRemoveTag = (name: string) => {
  const tag = tagsList.value.find((tag) => tag[1] === name)

  if (tag) {
    if (tagIsChecked(tag[1])) tagsSelectedRemove(tag)
    else tagsSelectedAdd(tag)
  }

  emit('emitSelected', tagsSelected.value)
}
</script>

<template>
  <FlexContainer flex-direction="column">
    <ModalCard class="modal-card">
      <FlexContainer flex-wrap="wrap" :style="{ 'overflow-x': 'auto' }">
        <CheckBoxBase
          v-for="(tag, i) in tagsList"
          :key="i"
          :id="tag[1]"
          :is-checked="tagIsChecked(tag[1])"
          checkbox-name="select-tag-in-card"
          @select="addOrRemoveTag"
          :style="{ width: 'calc(50% - 4px)', margin: '2px' }"
        >
          <TagView :tag="tag" />
        </CheckBoxBase>
      </FlexContainer>
    </ModalCard>
  </FlexContainer>
</template>

<style scoped lang="scss">
.modal-card {
  box-sizing: border-box;
  width: 350px;
  max-width: 95dvw;
  max-height: 50dvh;
  display: flex;
  flex-direction: column;
}
</style>
