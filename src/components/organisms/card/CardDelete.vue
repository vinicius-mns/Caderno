<script setup lang="ts">
import type { Icard } from '@/stores/cards/Interfaces'
import CardView from './CardView.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import TrashIco from '@/components/atoms/icons/TrashIco.vue'
import ButtonCoinSlot from '@/components/molecules/ButtonCoinSlot.vue'
import CrossIco from '@/components/atoms/icons/CrossIco.vue'
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import ConfirmDelete from '@/components/molecules/ConfirmDelete.vue'

const props = defineProps<{ card: Icard; tags: Itag[] }>()

const emit = defineEmits<{
  (e: 'delete', v: null): void
  (e: 'cancel', v: null): void
}>()

const deleteConfirm = () => emit('delete', null)

const cancel = () => emit('cancel', null)
</script>

<template>
  <!-- <FlexContainer flex-direction="column">
    <CardView :card="props.card" :tags="props.tags" :hide-button-plush="true" text-filter-tags="" />

    <FlexContainer class="footer">
      <ButtonSlot
        class="button-confirm-delete"
        content="Confirmar exclusão"
        border-radius="50px"
        background-color="red"
        @click="deleteConfirm"
      >
        <TrashIco />
      </ButtonSlot>

      <ButtonCoinSlot content="Cancelar" @click="cancel">
        <CrossIco />
      </ButtonCoinSlot>
    </FlexContainer>
  </FlexContainer> -->
  <ConfirmDelete :id="props.card.id" @confirm="deleteConfirm" @cancel="cancel">
    <CardView :card="props.card" :tags="props.tags" :hide-button-plush="true" text-filter-tags="" />
  </ConfirmDelete>
</template>

<style scoped lang="scss">
.footer {
  margin-top: 6px;

  & .button-confirm-delete {
    margin-right: 8px;
  }
}
</style>
