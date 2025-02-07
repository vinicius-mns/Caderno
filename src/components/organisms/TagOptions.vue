<script setup lang="ts">
import type { Itag } from '@/stores/tags/Interfaces'
import ModalCard from '@/components/atoms/ModalCard.vue'
import ButtonSlot from '../molecules/ButtonSlot.vue'
import PencilIco from '../atoms/icons/PencilIco.vue'
import EraserIco from '../atoms/icons/EraserIco.vue'
import CardCrossIco from '../atoms/icons/CardCrossIco.vue'
import TrashIco from '../atoms/icons/TrashIco.vue'
import FloatModalSlot from '../atoms/FloatModalSlot.vue'
import TagView2 from '../molecules/TagView2.vue'

const props = defineProps<{ tag: Itag }>()

const emit = defineEmits<{
  (e: 'openUpdateTag', v: Itag): void
  (e: 'openDeleteTag', v: Itag): void
}>()

const openUpdateTag = (tag: Itag) => emit('openUpdateTag', tag)

const openDeleteTag = (tag: Itag) => emit('openDeleteTag', tag)

// const emitDeleteCardsWithTag = (tag: Itag) => emit('deleteCardsWithtag', tag)
</script>

<template>
  <FloatModalSlot :closeOnClick="true">
    <template #button-slot>
      <TagView2 :tag="props.tag" />
    </template>

    <template #container-slot>
      <ModalCard class="options-container" background-color="front">
        <TagView2 :tag="props.tag" class="tag-preview" />

        <ButtonSlot
          content="Editar Tag"
          border-color="transparent"
          class="button-option"
          @click="openUpdateTag(props.tag)"
        >
          <PencilIco />
        </ButtonSlot>

        <ButtonSlot content="Remover tag de cards" border-color="transparent" class="button-option">
          <EraserIco />
        </ButtonSlot>

        <ButtonSlot
          content="Remover cards com tag"
          border-color="transparent"
          class="button-option"
        >
          <CardCrossIco />
        </ButtonSlot>

        <ButtonSlot
          content="Deletar tag"
          border-color="transparent"
          class="button-option"
          @click="openDeleteTag(props.tag)"
        >
          <TrashIco />
        </ButtonSlot>
      </ModalCard>
    </template>
  </FloatModalSlot>
</template>

<style scoped lang="scss">
.options-container {
  width: 260px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & .tag-preview {
    margin: 10px 0;
  }

  & .button-option {
    width: 100%;
  }
}
</style>
