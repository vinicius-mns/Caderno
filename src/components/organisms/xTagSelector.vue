<!-- <script setup lang="ts">
import { computed, ref } from 'vue'
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import FloatModalSlot from '@/components/atoms/FloatModalSlot.vue'
import ButtonCoinSlot from '@/components/molecules/ButtonCoinSlot.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import ModalCard from '../atoms/ModalCard.vue'
import CheckIco from '../atoms/icons/CheckIco.vue'
import ThemeP from '../atoms/ThemeP.vue'
import PencilIco from '../atoms/icons/PencilIco.vue'
import SearchImput from '../molecules/SearchImput.vue'
import TagIco from '../atoms/icons/TagIco.vue'
import TagView2 from '../molecules/TagView2.vue'

const props = defineProps<{
  allTags: Itag[]
  tagsChecked: Itag[]
  textFilter: string
}>()

const emit = defineEmits<{
  (e: 'emitSelected', v: Itag[]): void
  (e: 'searchTag', v: string): void
  (e: 'openCreateTag', v: null): void
}>()

const modal = ref<InstanceType<typeof FloatModalSlot>>()

const closeModal = () => modal.value?.close()

const isEmptyTags = computed(() => props.allTags.length <= 0)

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

const searchTag = (v: string) => {
  emit('searchTag', v)
}

const openCreateTag = () => {
  emit('openCreateTag', null)
}
</script>

<template>
  <FloatModalSlot ref="modal">
    <template #button-slot>
      <ButtonSlot content="Selecionar tags" :style="{ width: 'auto' }" border-radius="50px">
        <TagIco />
      </ButtonSlot>
    </template>

    <template #container-slot>
      <ModalCard class="modal-card-tags" background-color="front">
        <FlexContainer class="header-container" align-items="center">
          <SearchImput
            key-id="search-tag"
            placeholder="Pesquisar tag"
            @emit-content="searchTag"
            :init-content="textFilter"
            class="search-tag"
          />

          <ButtonCoinSlot content="Criar tag" @click="openCreateTag" :invert-color="true">
            <PencilIco />
          </ButtonCoinSlot>
        </FlexContainer>

        <FlexContainer flex-wrap="wrap" class="tags-container">
          <TagView2
            v-for="(tag, i) in props.allTags"
            :key="i"
            :tag="tag"
            class="tag"
            :type="tags.isSelectedTag(tag) ? 'selected' : 'none'"
            @click="tags.addOrRemoveTag(tag[1])"
          />
        </FlexContainer>

        <ThemeP
          content="Nenhuma tag encontrada 😢"
          size="20px"
          class="no-tag-tittle"
          v-if="isEmptyTags"
        />

        <ButtonSlot
          v-if="isEmptyTags"
          border-radius="50px"
          content="Criar tag"
          :invert-color="true"
          @click="() => emitTagsAndCloseModal()"
        >
          <PencilIco />
        </ButtonSlot>

        <ButtonSlot
          border-radius="50px"
          content="Confirmar alteração"
          :class="tags.butttonStatusClass.value"
          @click="() => emitTagsAndCloseModal()"
        >
          <CheckIco />
        </ButtonSlot>
      </ModalCard>
    </template>
  </FloatModalSlot>
</template>

<style scoped lang="scss">
.modal-card-tags {
  display: flex;
  flex-direction: column;
  width: 408px;
  max-width: 95dvw;
  max-height: 50dvh;

  & .header-container {
    width: 100%;

    & .search-tag {
      width: 100%;
      flex-shrink: 1;
      margin-right: 10px;
    }
  }

  & .tags-container {
    height: 100%;
    overflow: auto;
    overflow-x: auto;
    margin-top: 8px;

    & .tag {
      width: calc(33% - 4px - 2px);
      margin: 2px;
    }
  }

  & .no-tag-tittle {
    margin: 10px;
  }

  & .locked {
    cursor: not-allowed;
    height: 0;
    border: none;
    width: fit-content;
  }

  & .unlocked {
    margin-top: 8px;
    width: fit-content;
  }
}
</style> -->
