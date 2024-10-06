<script setup lang="ts">
import type { Icard } from '@/stores/cards/Interfaces'
import type { Itag } from '@/stores/tags/Interfaces'

import { ref, watch } from 'vue'

import ModalCard from '../atoms/ModalCard.vue'
import FloatModalSlot from '../atoms/FloatModalSlot.vue'

import CardView from '../molecules/CardView.vue'
import TagSelector from '../molecules/TagSelector.vue'
import ButtonSlot from '../molecules/ButtonSlot.vue'
import SearchIco from '../atoms/icons/SearchIco.vue'
import TagIco from '../atoms/icons/TagIco.vue'
import PencilIco from '../atoms/icons/PencilIco.vue'
import ShareIco from '../atoms/icons/ShareIco.vue'
import ButtonCoinSlot from '../molecules/ButtonCoinSlot.vue'
import TrashIco from '../atoms/icons/TrashIco.vue'

const props = defineProps<{ card: Icard; allTags: Itag[]; width: string }>()

const emit = defineEmits<{
  (e: 'update', v: Icard): void
  (e: 'delete', v: Icard): void
  (e: 'view', v: Icard): void
  (e: 'share', v: Icard): void
  (e: 'tagUpdated', v: Icard): void
}>()

const modal = ref<InstanceType<typeof FloatModalSlot>>()

const modal2 = ref<InstanceType<typeof FloatModalSlot>>()

const executeAndCloseModal = (callBack: () => void) => {
  callBack()

  modal.value?.close()

  modal2.value?.close()
}

const emitTagsUpdated = (tags: Itag[]) => {
  executeAndCloseModal(() => emit('tagUpdated', { ...props.card, tags }))
}

const useMouse = () => {
  const mouseIn = ref(false)

  const showTagSelector = ref(false)

  const mouseInSet = (v: boolean) => (mouseIn.value = v)

  const updateStatus = () => {
    showTagSelector.value = mouseIn.value
  }

  watch(mouseIn, updateStatus, { deep: true })

  return { showTagSelector, mouseInSet }
}

const { mouseInSet, showTagSelector } = useMouse()
</script>

<template>
  <div
    class="card-with-options-container"
    @mouseenter="() => mouseInSet(true)"
    @mouseleave="() => mouseInSet(false)"
  >
    <FloatModalSlot ref="modal">
      <template #button-slot>
        <CardView :card="props.card" class="card" />
      </template>

      <template #container-slot>
        <ModalCard class="modal-card" background-color="front">
          <ButtonSlot
            content="Visualizar"
            @click="executeAndCloseModal(() => emit('view', props.card))"
          >
            <SearchIco />
          </ButtonSlot>

          <ButtonSlot
            content="Editar"
            @click="executeAndCloseModal(() => emit('update', props.card))"
          >
            <PencilIco />
          </ButtonSlot>

          <ButtonSlot
            content="Compartilhar"
            @click="executeAndCloseModal(() => emit('share', props.card))"
          >
            <ShareIco />
          </ButtonSlot>

          <FloatModalSlot>
            <template #button-slot>
              <ButtonSlot content="Tags">
                <TagIco />
              </ButtonSlot>
            </template>

            <template #container-slot>
              <TagSelector
                :all-tags="props.allTags"
                :tags-selected="props.card.tags"
                @emit-selected="emitTagsUpdated"
              />
            </template>
          </FloatModalSlot>

          <ButtonSlot
            content="Deletar"
            @click="executeAndCloseModal(() => emit('delete', props.card))"
          >
            <TrashIco />
          </ButtonSlot>
        </ModalCard>
      </template>
    </FloatModalSlot>

    <FloatModalSlot class="tag-editor" v-show="showTagSelector" ref="modal2">
      <template #button-slot>
        <ButtonCoinSlot content="Tags">
          <TagIco />
        </ButtonCoinSlot>
      </template>

      <template #container-slot>
        <TagSelector
          :all-tags="props.allTags"
          :tags-selected="props.card.tags"
          @emit-selected="emitTagsUpdated"
        />
      </template>
    </FloatModalSlot>
  </div>
</template>

<style scoped lang="scss">
.card-with-options-container {
  transition: all 0.3s;
  position: relative;
  width: v-bind('props.width');
  max-width: 95dvw;
  margin: 5px;

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
