<script setup lang="ts">
import CardView from '../molecules/CardView.vue'
import type { Icard } from '@/stores/cards/Interfaces'
import FloatModalSlot from '../atoms/FloatModalSlot.vue'
import CoinButton from '../molecules/CoinButton.vue'
import PencilIco from '../atoms/icons/PencilIco.vue'
import ModalCard from '../atoms/ModalCard.vue'
import ButtonOption from '../molecules/ButtonOption.vue'
import TrashIco from '../atoms/icons/TrashIco.vue'
import { ref, watch } from 'vue'
import SearchIco from '../atoms/icons/SearchIco.vue'
import ShareIco from '../atoms/icons/ShareIco.vue'
import TagIco from '../atoms/icons/TagIco.vue'
import TagSelector from '../molecules/TagSelector.vue'
import type { Itag } from '@/stores/tags/Interfaces'

const props = defineProps<{ card: Icard; allTags: Itag[] }>()

const emit = defineEmits<{
  (e: 'update', v: Icard): void
  (e: 'delete', v: Icard): void
  (e: 'view', v: Icard): void
  (e: 'share', v: Icard): void
  (e: 'tagUpdated', v: Icard): void
}>()

const modal = ref<InstanceType<typeof FloatModalSlot>>()

const modalClose = () => modal.value?.close()

const modalCloseAfter = (f: () => void) => {
  f()
  modalClose()
}

const useFastTagEditor = () => {
  const tagsRef = ref<Itag[]>(props.card.tags)

  const _isModify = () => {
    if (tagsRef.value.length !== props.card.tags.length) return true

    const tagsAtualSort = [...props.card.tags].sort()
    const tagsRefSort = [...tagsRef.value].sort()

    for (let i = 0; i < tagsAtualSort.length; i += 1) {
      const tagsAtualSortName = tagsAtualSort[i][1]

      const tagsRefSortName = tagsRefSort[i][1]

      if (tagsAtualSortName !== tagsRefSortName) return true
    }

    return false
  }

  const tagsRefSet = (tags: Itag[]) => (tagsRef.value = tags)

  const emitTagsUpdated = () => {
    if (_isModify()) {
      emit('tagUpdated', { ...props.card, tags: tagsRef.value })
    }
  }

  return {
    tagsRef,
    tagsRefSet,
    emitTagsUpdated
  }
}

const useMouse = () => {
  const mouseIn = ref(false)

  const viewTagSelector = ref(false)

  const mouseInSet = (v: boolean) => (mouseIn.value = v)

  const updateStatus = () => {
    viewTagSelector.value = mouseIn.value
  }

  watch(mouseIn, updateStatus, { deep: true })

  return {
    viewTagSelector,
    mouseInSet
  }
}

const fastTagEditor = useFastTagEditor()

const mouse = useMouse()

const resetTags = () => fastTagEditor.tagsRefSet(props.card.tags)
</script>

<template>
  <div
    class="card-with-options-container"
    @mouseenter="() => mouse.mouseInSet(true)"
    @mouseleave="() => mouse.mouseInSet(false)"
    @click="() => resetTags()"
  >
    <FloatModalSlot ref="modal">
      <template #button-slot>
        <CardView :card="props.card" />
      </template>
      <template #container-slot>
        <ModalCard class="modal-card" background-color="front">
          <ButtonOption
            content="Visualizar"
            @click="modalCloseAfter(() => emit('view', props.card))"
          >
            <SearchIco />
          </ButtonOption>
          <ButtonOption content="Editar" @click="modalCloseAfter(() => emit('update', props.card))">
            <PencilIco />
          </ButtonOption>
          <ButtonOption
            content="Compartilhar"
            @click="modalCloseAfter(() => emit('share', props.card))"
          >
            <ShareIco />
          </ButtonOption>
          <FloatModalSlot
            v-show="mouse.viewTagSelector.value"
            @close="modalCloseAfter(() => fastTagEditor.emitTagsUpdated())"
          >
            <template #button-slot>
              <ButtonOption content="Tags" indicator="arrow-right">
                <TagIco />
              </ButtonOption>
            </template>
            <template #container-slot>
              <TagSelector
                :all-tags="props.allTags"
                :tags-selected="props.card.tags"
                @emit-selected="fastTagEditor.tagsRefSet"
              />
            </template>
          </FloatModalSlot>
          <ButtonOption
            content="Deletar card"
            @click="modalCloseAfter(() => emit('delete', props.card))"
          >
            <TrashIco />
          </ButtonOption>
        </ModalCard>
      </template>
    </FloatModalSlot>
    <FloatModalSlot
      class="tag-editor"
      v-show="mouse.viewTagSelector.value"
      @close="() => fastTagEditor.emitTagsUpdated()"
    >
      <template #button-slot>
        <CoinButton description="Tags" :border="false">
          <TagIco />
        </CoinButton>
      </template>
      <template #container-slot>
        <TagSelector
          :all-tags="props.allTags"
          :tags-selected="fastTagEditor.tagsRef.value"
          @emit-selected="fastTagEditor.tagsRefSet"
        />
      </template>
    </FloatModalSlot>
  </div>
</template>

<style scoped lang="scss">
.card-with-options-container {
  position: relative;
  & .modal-card {
    width: 200px;
  }
  & .tag-editor {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
