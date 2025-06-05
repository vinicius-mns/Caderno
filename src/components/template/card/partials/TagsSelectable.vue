<script setup lang="ts">
import { computed, ref } from 'vue'
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import TagView2 from '@/components/molecules/TagView2.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import CheckIco from '@/components/atoms/icons/CheckIco.vue'
import FloatModalSlot from '@/components/atoms/FloatModalSlot.vue'
import ModalCard from '@/components/atoms/ModalCard.vue'
import TagsHeader from '@/components/molecules/TagsHeader.vue'

const props = defineProps<{
  textFilterTags: string
  allTags: Itag[]
  tagsChecked: Itag[]
}>()

const emit = defineEmits<{
  (e: 'tagsUpdated', v: Itag[]): void
  (e: 'searchTag', v: string): void
  (e: 'openCreateTag', v: null): void
  (e: 'clear', v: null): void
}>()

const modal = ref<InstanceType<typeof FloatModalSlot>>()

const useTags = () => {
  const tagsSelected = ref<Itag[]>(props.tagsChecked)

  const tagsSelectedSet = (tags: Itag[]) => (tagsSelected.value = tags)

  const isSelectedTag = (tag: Itag) => tagsSelected.value.map((t) => t[1]).includes(tag[1])

  const addTag = (tag: Itag) => {
    tagsSelectedSet([...tagsSelected.value, tag])
  }

  const removeTag = (tag: Itag) => {
    tagsSelectedSet(tagsSelected.value.filter((t) => t[1] !== tag[1]))
  }

  const addOrRemoveTag = (name: string) => {
    const findTag = props.allTags.find((tag) => tag[1] === name)

    if (findTag) {
      if (isSelectedTag(findTag)) removeTag(findTag)
      else addTag(findTag)
    }
  }

  return {
    tagsSelected,
    tagsSelectedSet,
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

const clearTagsSelectable = () => tags.tagsSelectedSet([])

// emicoes

const emitFilter = () => {
  const selected = tags.tagsSelected.value

  emit('tagsUpdated', selected)

  modal.value.close()
}

const searchTag = (tag: string) => emit('searchTag', tag)

const openCreateTag = (v: null) => emit('openCreateTag', v)
</script>

<template>
  <FloatModalSlot ref="modal" :click-stop="true">
    <template #button-slot>
      <slot />
    </template>

    <template #container-slot>
      <ModalCard class="tags-selectable-container" background-color="front" flex-direction="column">
        <TagsHeader
          :text-filter="props.textFilterTags"
          @search-tag="searchTag"
          @open-create-tag="openCreateTag"
          @clear="clearTagsSelectable"
        />

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
      </ModalCard>
    </template>
  </FloatModalSlot>
</template>

<style scoped lang="scss">
.tags-selectable-container {
  width: 408px;
  max-width: 95dvw;
  max-height: 50dvh;

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
}
</style>
