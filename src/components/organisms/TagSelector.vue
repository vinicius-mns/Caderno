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
import PencilIco from '../atoms/icons/PencilIco.vue'
import SearchImput from '../molecules/SearchImput.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'

const stylesPage = useStylesPage()

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
  <FloatModalSlot ref="modal" class="max-width">
    <template #button-slot>
      <ButtonCoinSlot content="Selecionar tags xx" :border="false" :circle="true">
        <AddTagIco />
      </ButtonCoinSlot>
    </template>

    <template #container-slot>
      <ModalCard class="modal-card-tags" background-color="front">
        <FlexContainer class="header-container">
          <SearchImput
            key-id="search-tag"
            placeholder="Pesquisar tag"
            @emit-content="searchTag"
            :init-content="textFilter"
            class="search-tag"
          />

          <ButtonCoinSlot
            content="Criar tag"
            @click="openCreateTag"
            :border="true"
            class="create-tag"
          >
            <PencilIco />
          </ButtonCoinSlot>
        </FlexContainer>

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

        <ThemeP
          content="Nenhuma tag encontrada 😢"
          size="20px"
          class="no-tag-tittle"
          v-show="isEmptyTags"
        />

        <ButtonSlot
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
.max-width {
  width: 100%;
  overflow: hidden;
}

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

  & .tags {
    height: 100%;
    overflow: auto;
    overflow-x: auto;
    margin: 10px 0;
  }

  & .tag-selectable {
    width: calc(33% - 4px);
    margin: 2px;
    height: 40px;
  }

  & .no-tag-tittle {
    margin: 10px;
  }

  & .locked {
    cursor: not-allowed;
    height: 0;
  }

  & .unlocked {
    background-color: v-bind('stylesPage.atualColor.hover');
  }
}
</style>
