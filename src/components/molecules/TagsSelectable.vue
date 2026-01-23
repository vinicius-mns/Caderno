<script setup lang="ts">
import { computed, ref } from 'vue'
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import TagView2 from '../molecules/TagView2.vue'
import ButtonSlot from './ButtonSlot.vue'
import CheckIco from '../atoms/icons/CheckIco.vue'

const props = defineProps<{
  allTags: Itag[]
  tagsChecked: Itag[]
}>()
const emit = defineEmits<{
  (e: 'emitSelected', v: Itag[]): void
}>()

const useTags = () => {
  const tagsSelected = ref<Itag[]>(props.tagsChecked)

  const visibleTags = ref<Itag[]>(props.tagsChecked)

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
    setVisibleTags,
    isSelectedTag,
    addOrRemoveTag
  }
}

const tags = useTags()

const showButtonClass = computed<'unlocked' | 'locked'>(() => {
  const size = tags.tagsSelected.value.length !== props.tagsChecked.length

  if (size) return 'unlocked'

  const currTagsSort = [...props.tagsChecked].sort()
  const newTagsSort = [...tags.tagsSelected.value].sort()

  if (JSON.stringify(currTagsSort) !== JSON.stringify(newTagsSort)) return 'unlocked'

  return 'locked'
})

const emitFilter = () => {
  const selected = tags.tagsSelected.value

  emit('emitSelected', selected)
}
</script>

<template>
  <FlexContainer flex-wrap="wrap" class="tags-container">
    <TagView2
      v-for="(tag, i) in props.allTags"
      :key="i"
      :tag="tag"
      class="tag"
      :type="tags.isSelectedTag(tag) ? 'selected' : 'none'"
      @click="tags.addOrRemoveTag(tag[1])"
    />

    <ButtonSlot
      content="Confirmar alterações"
      :class="[showButtonClass, 'button-confim']"
      :invert-color="true"
      :blink="true"
      border-radius="50px"
      @click="emitFilter"
    >
      <CheckIco />
    </ButtonSlot>
  </FlexContainer>
</template>

<style scoped lang="scss">
.tags-container {
  height: 100%;
  overflow: auto;
  overflow-x: auto;
  margin-top: 8px;
  padding-bottom: 40px;

  & .tag {
    width: calc(33% - 4px - 2px);
    margin: 2px;
  }

  & .button-confim {
    position: absolute;
    width: fit-content;
    bottom: 18px;
    right: 30px;
  }

  & .locked {
    cursor: not-allowed;
    height: 0;
    border: none;
  }

  & .unlocked {
    margin-top: 8px;
  }
}
</style>
