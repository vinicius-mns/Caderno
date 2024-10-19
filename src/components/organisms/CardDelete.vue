<script setup lang="ts">
import type { Icard } from '@/stores/cards/Interfaces'
import CardView from '@/components/molecules/CardView.vue'
import ButtonSlot from '../molecules/ButtonSlot.vue'
import TrashIco from '../atoms/icons/TrashIco.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'
import FlexContainer from '../atoms/FlexContainer.vue'
import ButtonCoinSlot from '../molecules/ButtonCoinSlot.vue'
import CrossIco from '../atoms/icons/CrossIco.vue'

const stylePage = useStylesPage()

const props = defineProps<{
  card: Icard
}>()

const emit = defineEmits<{
  (e: 'emitCard', v: Icard): void
  (e: 'emitCancel', v: Icard): void
}>()

const emitCard = () => emit('emitCard', props.card)

const emitCancel = () => emit('emitCancel', props.card)
</script>

<template>
  <div class="container">
    <div class="card-section">
      <CardView :card="props.card" class="card" />
    </div>

    <FlexContainer align-items="center" class="buttons-container">
      <ButtonSlot
        content="Confirmar exclusão"
        class="delete-button"
        @click="emitCard"
        background-color="rgba(255, 0, 0, 0.5)"
      >
        <TrashIco />
      </ButtonSlot>

      <ButtonCoinSlot content="Cancelar" @click="emitCancel">
        <CrossIco />
      </ButtonCoinSlot>
    </FlexContainer>
  </div>
</template>

<style scoped lang="scss">
.container {
  border-radius: 8px;
  border: solid 1px v-bind('stylePage.atualColor.border');
  height: 100%;
  max-height: 80dvh;
  display: flex;
  flex-direction: column;
  padding: 5px;
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

  & .buttons-container {
    margin-top: 10px;
  }
  & .delete-button {
    margin-right: 10px;
    flex-shrink: 1;
  }
}
</style>
