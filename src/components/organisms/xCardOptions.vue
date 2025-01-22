<script setup lang="ts">
import type { Icard } from '@/stores/cards/Interfaces'
import type { Itag } from '@/stores/tags/Interfaces'
import ModalCard from '../atoms/ModalCard.vue'
import FloatModalSlot from '../atoms/FloatModalSlot.vue'
import ButtonSlot from '../molecules/ButtonSlot.vue'
import SearchIco from '../atoms/icons/SearchIco.vue'
import PencilIco from '../atoms/icons/PencilIco.vue'
import ShareIco from '../atoms/icons/ShareIco.vue'
import TrashIco from '../atoms/icons/TrashIco.vue'
import ButtonCoinSlot from '../molecules/ButtonCoinSlot.vue'
import PlusIco from '../atoms/icons/PlusIco.vue'

const props = defineProps<{ card: Icard; allTags: Itag[] }>()

const emit = defineEmits<{
  (e: 'update', v: Icard): void
  (e: 'delete', v: Icard): void
  (e: 'view', v: Icard): void
  (e: 'share', v: Icard): void
}>()
</script>

<template>
  <FloatModalSlot ref="modal" :closeOnClick="true">
    <template #button-slot>
      <ButtonCoinSlot content="Mais" :circle="true">
        <PlusIco />
      </ButtonCoinSlot>
    </template>

    <template #container-slot>
      <ModalCard class="modal-container" background-color="front">
        <ButtonSlot content="Visualizar" @click="() => emit('view', props.card)">
          <SearchIco />
        </ButtonSlot>

        <ButtonSlot content="Editar" @click="() => emit('update', props.card)">
          <PencilIco />
        </ButtonSlot>

        <ButtonSlot content="Compartilhar" @click="() => emit('share', props.card)">
          <ShareIco />
        </ButtonSlot>

        <ButtonSlot content="Deletar" @click="() => emit('delete', props.card)">
          <TrashIco />
        </ButtonSlot>
      </ModalCard>
    </template>
  </FloatModalSlot>
</template>

<style scoped lang="scss">
.modal-container {
  width: 200px;
}
</style>
