<script setup lang="ts">
import { computed, ref } from 'vue'
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import FloatModalSlot from '@/components/atoms/FloatModalSlot.vue'
import AddTagIco from '@/components/atoms/icons/AddTagIco.vue'
import ButtonCoinSlot from '@/components/molecules/ButtonCoinSlot.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import ModalCard from '../atoms/ModalCard.vue'
import CheckBoxBase from '../atoms/CheckBoxBase.vue'
import TagView from '../molecules/TagView.vue'
import CheckIco from '../atoms/icons/CheckIco.vue'
import ThemeP from '../atoms/ThemeP.vue'

const props = withDefaults(
  defineProps<{
    allTags: Itag[]
    tagsChecked: Itag[]
    showList: boolean
  }>(),
  {
    showList: true
  }
)

const emit = defineEmits<{
  (e: 'emitSelected', v: Itag[]): void
}>()

const modal = ref<InstanceType<typeof FloatModalSlot>>()

const closeModal = () => modal.value?.close()

const useTags = () => {
  const tagsSelected = ref<Itag[]>(props.tagsChecked)

  const visibleTags = ref<Itag[]>(props.tagsChecked)

  const butttonStatusClass = computed(() => {
    const status = {
      unlocked: 'unlocked',
      locked: 'locked'
    }

    if (tagsSelected.value.length !== props.tagsChecked.length) return status.unlocked

    const tagsAtualSort = [...props.tagsChecked].sort()

    const tagsRefSort = [...tagsSelected.value].sort()

    for (let i = 0; i < tagsAtualSort.length; i += 1) {
      const tagsAtualSortName = tagsAtualSort[i][1]

      const tagsRefSortName = tagsRefSort[i][1]

      if (tagsAtualSortName !== tagsRefSortName) return status.unlocked
    }

    return status.locked
  })

  const setVisibleTags = (tags: Itag[]) => (visibleTags.value = tags)

  const _tagsSelectedUpdate = (tags: Itag[]) => (tagsSelected.value = tags)

  const isSelectedTag = (tag: Itag) => tagsSelected.value.map((t) => t[1]).includes(tag[1])

  const addOrRemoveTag = (name: string) => {
    const findTag = props.allTags.find((tag) => tag[1] === name)

    const atualTags = tagsSelected.value

    const addTag = (tag: Itag) => _tagsSelectedUpdate([...atualTags, tag])

    const removeTag = (tag: Itag) => _tagsSelectedUpdate(atualTags.filter((t) => t[1] !== tag[1]))

    if (findTag) {
      if (isSelectedTag(findTag)) removeTag(findTag)
      else addTag(findTag)
    }
  }

  return {
    tagsSelected,
    visibleTags,
    butttonStatusClass,
    setVisibleTags,
    isSelectedTag,
    addOrRemoveTag
  }
}

const tags = useTags()

const emitTagsAndCloseModal = () => {
  if (tags.butttonStatusClass.value === 'unlocked') {
    tags.setVisibleTags(tags.tagsSelected.value)

    emit('emitSelected', tags.tagsSelected.value)

    closeModal()
  }
}
</script>

<template>
  <FloatModalSlot ref="modal" class="max-width">
    <template #button-slot>
      <FlexContainer class="button-tags-container max-width">
        <ButtonCoinSlot content="Selecionar tags" :border="false" background-color="transparent">
          <AddTagIco />
        </ButtonCoinSlot>

        <FlexContainer class="tags-selected-container max-width" v-if="props.showList">
          <ButtonCoinSlot
            v-for="(tag, i) in tags.visibleTags.value"
            :key="i"
            :content="tag[1]"
            :border="false"
            class="tag"
            background-color="transparent"
          >
            <ThemeP :content="tag[0]" class="tag-emoji" />
          </ButtonCoinSlot>
        </FlexContainer>
      </FlexContainer>
    </template>

    <template #container-slot>
      <ModalCard class="modal-card-tags">
        <FlexContainer flex-wrap="wrap" class="tags">
          <CheckBoxBase
            v-for="(tag, i) in props.allTags"
            :key="i"
            :id="tag[1]"
            :is-checked="tags.isSelectedTag(tag)"
            checkbox-name="select-tag-in-card"
            @select="tags.addOrRemoveTag"
            class="tag-selectable"
          >
            <TagView :tag="tag" />
          </CheckBoxBase>
        </FlexContainer>

        <ButtonSlot
          content="Confirmar alteração"
          :class="[tags.butttonStatusClass.value, 'confirm-button']"
          @click="emitTagsAndCloseModal()"
        >
          <CheckIco />
        </ButtonSlot>
      </ModalCard>
    </template>
  </FloatModalSlot>
</template>

<style scoped lang="scss">
.max-width {
  width: 100%;
  overflow: hidden;
}

.modal-card-tags {
  display: flex;
  flex-direction: column;
  width: 350px;
  max-width: 95dvw;
  max-height: 50dvh;

  & .tags {
    height: 100%;
    overflow: auto;
    overflow-x: auto;
  }

  & .tag-selectable {
    width: calc(50% - 4px);
    margin: 2px;
    height: 40px;
  }

  & .confirm-button {
    margin-top: 10px;
  }

  & .locked {
    background-color: rgba(255, 0, 0, 0.5);
    cursor: not-allowed;
    opacity: 30%;
  }

  & .unlocked {
    background-color: rgba(0, 128, 0, 0.5);
  }
}
</style>
