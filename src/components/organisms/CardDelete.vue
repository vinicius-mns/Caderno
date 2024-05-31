<script setup lang="ts">
import type { ICard } from '@/api/api_local/entites/cards/CardsTypes'
import FloatModalSlot from '@/components/atoms/FloatModalSlot.vue'
import ThemeP from '@/components/atoms/ThemeP.vue'
import TrashIco from '@/components/atoms/icons/TrashIco.vue'
import ButtonOption from '@/components/molecules/ButtonOption.vue'
import CardView from '@/components/molecules/CardView.vue'
import ModalCard from '../atoms/ModalCard.vue'

const props = defineProps<{
  card: ICard
}>()

const emit = defineEmits<{
  (e: 'emitDeleteId', v: string): void
}>()

const cardDelete = () => emit('emitDeleteId', props.card.id)
</script>

<template>
  <FloatModalSlot>
    <template #button-slot>
      <ButtonOption content="Deletar">
        <TrashIco />
      </ButtonOption>
    </template>
    <template #container-slot>
      <ModalCard class="container">
        <ThemeP class="text" content="Deseja deletar esse card?" />
        <CardView :card="props.card" />
        <ButtonOption content="Deletar" @click="cardDelete">
          <TrashIco />
        </ButtonOption>
      </ModalCard>
    </template>
  </FloatModalSlot>
</template>

<style scoped lang="scss">
.container {
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & .text {
    padding: 10px;
  }
}
</style>
