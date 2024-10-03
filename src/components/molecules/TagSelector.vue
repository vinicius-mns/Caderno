<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Itag } from '@/stores/tags/Interfaces'
import FlexContainer from '../atoms/FlexContainer.vue'
import CheckBoxBase from '../atoms/CheckBoxBase.vue'
import TagView from '../molecules/TagView.vue'
import BaseButtonSlot from './buttons/BaseButtonSlot.vue'
import CheckIco from '../atoms/icons/CheckIco.vue'
import ModalCard from '../atoms/ModalCard.vue'

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
}

const isModify = computed(() => {
  if (tagsSelected.value.length !== props.tagsSelected.length) return true

  const tagsAtualSort = [...props.tagsSelected].sort()

  const tagsRefSort = [...tagsSelected.value].sort()

  for (let i = 0; i < tagsAtualSort.length; i += 1) {
    const tagsAtualSortName = tagsAtualSort[i][1]

    const tagsRefSortName = tagsRefSort[i][1]

    if (tagsAtualSortName !== tagsRefSortName) return true
  }

  return false
})

const emitSelected = () => emit('emitSelected', tagsSelected.value)
</script>

<template>
  <ModalCard class="modal-card-tags">
    <FlexContainer flex-wrap="wrap" :style="{ 'overflow-x': 'auto' }" class="tags">
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

    <BaseButtonSlot
      content="Confirmar alteração"
      :class="[isModify ? '' : 'block', 'confirm-button']"
      :visible="true"
      @click="emitSelected()"
    >
      <CheckIco />
    </BaseButtonSlot>
  </ModalCard>
</template>

<style scoped lang="scss">
.modal-card-tags {
  display: flex;
  flex-direction: column;
  width: 350px;
  max-width: 95dvw;
  height: 50dvh;

  & .tags {
    height: 100%;
    overflow: auto;
  }

  & .confirm-button {
    margin-top: 10px;
  }

  & .block {
    cursor: not-allowed;
    opacity: 30%;
  }
}
</style>
