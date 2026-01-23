<script setup lang="ts">
import type { Itag } from '@/stores/tags/Interfaces'
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import FloatModalSlot from '@/components/atoms/FloatModalSlot.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import ModalCard from '../atoms/ModalCard.vue'
import PencilIco from '../atoms/icons/PencilIco.vue'
import TagView2 from '../molecules/TagView2.vue'
import EraserIco from '../atoms/icons/EraserIco.vue'
import CardCrossIco from '../atoms/icons/CardCrossIco.vue'
import TrashIco from '../atoms/icons/TrashIco.vue'

const props = defineProps<{
  tags: Itag[]
}>()

const emit = defineEmits<{
  (e: 'tagUpdated', v: Itag): void
  (e: 'tagToDelete', v: Itag): void
}>()
</script>

<template>
  <FlexContainer flex-wrap="wrap" class="tags-container">
    <FloatModalSlot :closeOnClick="true" v-for="(tag, i) in props.tags" :key="i" class="tag">
      <template #button-slot>
        <TagView2 :tag="tag" />
      </template>

      <template #container-slot>
        <ModalCard class="options-container" background-color="front">
          <TagView2 :tag="tag" class="tag-preview" :animation="false" />

          <ButtonSlot
            content="Editar Tag"
            border-color="transparent"
            class="button-option"
            @click="emit('tagUpdated', tag)"
          >
            <PencilIco />
          </ButtonSlot>

          <ButtonSlot
            content="Remover tag de cards"
            border-color="transparent"
            class="button-option"
          >
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
            @click="emit('tagToDelete', tag)"
          >
            <TrashIco />
          </ButtonSlot>
        </ModalCard>
      </template>
    </FloatModalSlot>
  </FlexContainer>
</template>

<style scoped lang="scss">
.tags-container {
  height: 100%;
  overflow: auto;
  overflow-x: auto;
  margin-top: 8px;

  & .tag {
    width: calc(33% - 4px - 2px);
    margin: 2px;
  }

  .tag-options-container {
    width: 260px;
    display: flex;
    flex-direction: column;
    align-items: center;

    & .tag-preview {
      margin: 10px 0;
      width: 100%;
    }

    & .button-option {
      width: 100%;
    }
  }
}
</style>
