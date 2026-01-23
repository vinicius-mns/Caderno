<script setup lang="ts">
import CardCrossIco from '@/components/atoms/icons/CardCrossIco.vue'
import EraserIco from '@/components/atoms/icons/EraserIco.vue'
import PencilIco from '@/components/atoms/icons/PencilIco.vue'
import TrashIco from '@/components/atoms/icons/TrashIco.vue'
import ModalCard from '@/components/atoms/ModalCard.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import TagView2 from '@/components/molecules/TagView2.vue'
import type { Itag } from '@/stores/tags/Interfaces'

const props = defineProps<{ tag: Itag }>()
</script>

<template>
  <ModalCard class="tag-options-container" background-color="front">
    <TagView2 :tag="props.tag" class="tag-preview" />

    <ButtonSlot content="Editar Tag" border-color="transparent" class="button-option">
      <PencilIco />
    </ButtonSlot>

    <ButtonSlot content="Remover tag de cards" border-color="transparent" class="button-option">
      <EraserIco />
    </ButtonSlot>

    <ButtonSlot content="Remover cards com tag" border-color="transparent" class="button-option">
      <CardCrossIco />
    </ButtonSlot>

    <ButtonSlot content="Deletar tag" border-color="transparent" class="button-option">
      <TrashIco />
    </ButtonSlot>
  </ModalCard>
</template>

<style scoped lang="scss">
.tag-options-container {
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
