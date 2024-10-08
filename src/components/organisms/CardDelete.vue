<script setup lang="ts">
import type { Icard } from '@/stores/cards/Interfaces'
import ThemeP from '@/components/atoms/ThemeP.vue'
import CardView from '@/components/molecules/CardView.vue'
import ButtonSlot from '../molecules/ButtonSlot.vue'
import TrashIco from '../atoms/icons/TrashIco.vue'

const props = defineProps<{
  card: Icard
}>()

const emit = defineEmits<{
  (e: 'emitDeleteId', v: string): void
}>()

const cardDelete = () => emit('emitDeleteId', props.card.id)
</script>

<template>
  <div class="container">
    <ThemeP class="text" content="Deseja deletar esse card?" />

    <div class="card-section">
      <CardView :card="props.card" class="card" />
    </div>

    <ButtonSlot content="Deletar card" class="delete-button" @click="cardDelete">
      <TrashIco />
    </ButtonSlot>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 500px;
  max-width: 95dvw;
  height: 100%;
  max-height: 80dvh;
  display: flex;
  flex-direction: column;
  padding: 15px;
  box-sizing: border-box;
  & .text {
    margin-bottom: 10px;
  }
  & .card-section {
    height: 100%;
    overflow-y: auto;
    & .card {
      margin: 0;
    }
  }
  & .delete-button {
    margin-top: 10px;
  }
}
</style>
