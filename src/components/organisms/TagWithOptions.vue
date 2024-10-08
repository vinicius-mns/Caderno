<script setup lang="ts">
import { ref } from 'vue'
import type { Itag } from '@/stores/tags/Interfaces'
import FloatModalSlot from '@/components/atoms/FloatModalSlot.vue'
import ModalCard from '@/components/atoms/ModalCard.vue'
import ThemeButton from '../atoms/ThemeButton.vue'
import TagView from '../molecules/TagView.vue'
import FlexContainer from '../atoms/FlexContainer.vue'
import ButtonSlot from '../molecules/ButtonSlot.vue'
import PencilIco from '../atoms/icons/PencilIco.vue'
import EraserIco from '../atoms/icons/EraserIco.vue'
import CardCrossIco from '../atoms/icons/CardCrossIco.vue'
import TrashIco from '../atoms/icons/TrashIco.vue'

const props = defineProps<{ tag: Itag }>()

const emit = defineEmits<{
  (e: 'updateTag', v: Itag): void
  (e: 'removeTagOnCards', v: Itag): void
  (e: 'deleteCardsWithtag', v: Itag): void
  (e: 'deleteTag', v: Itag): void
}>()

const modal = ref<InstanceType<typeof FloatModalSlot>>()

const modalClose = () => modal.value?.close()

const emitUpdate = () => emit('updateTag', props.tag)

const emitDelete = () => emit('deleteTag', props.tag)

const emitDeleteCardsWithTag = () => emit('deleteCardsWithtag', props.tag)
</script>

<template>
  <FloatModalSlot ref="modal" class="tag-with-options-container">
    <template #button-slot>
      <FlexContainer flex-wrap="wrap">
        <ThemeButton background-color="front" class="tag">
          <TagView :tag="props.tag" />
        </ThemeButton>
      </FlexContainer>
    </template>

    <template #container-slot>
      <ModalCard class="options-container" @click="modalClose" background-color="front">
        <TagView :tag="props.tag" class="tag-preview" />

        <ButtonSlot content="Editar Tag" @click="emitUpdate">
          <PencilIco />
        </ButtonSlot>

        <ButtonSlot content="Remover tag de cards">
          <EraserIco />
        </ButtonSlot>

        <ButtonSlot content="Remover cards com tag" @click="emitDeleteCardsWithTag">
          <CardCrossIco />
        </ButtonSlot>

        <ButtonSlot content="Deletar tag" @click="emitDelete">
          <TrashIco />
        </ButtonSlot>
      </ModalCard>
    </template>
  </FloatModalSlot>
</template>

<style scoped lang="scss">
.tag-with-options-container {
  width: calc(50% - 6px);
  margin: 3px;
  & .tag {
    width: 100%;
  }
  .options-container {
    width: 260px;
    display: flex;
    flex-direction: column;
    align-items: center;
    & .tag-preview {
      margin: 10px 0;
    }
    & span {
      font-size: 40px;
      text-shadow: 5px 2px 2px;
    }
  }
}
</style>
