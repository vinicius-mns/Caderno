<script setup lang="ts">
import FlexContainer from '../atoms/FlexContainer.vue'
import ButtonSlot from './ButtonSlot.vue'
import ButtonCoinSlot from './ButtonCoinSlot.vue'
import CrossIco from '../atoms/icons/CrossIco.vue'
import TrashIco from '../atoms/icons/TrashIco.vue'

const props = defineProps<{ id: string }>()

const emit = defineEmits<{
  (e: 'confirm', v: string): void
  (e: 'cancel', v: null): void
}>()

const confirm = () => emit('confirm', props.id)

const cancel = () => emit('cancel', null)
</script>

<template>
  <FlexContainer flex-direction="column">
    <slot />

    <FlexContainer class="footer">
      <ButtonSlot
        :border-radius="'50px'"
        content="Confirmar exclusão"
        class="confirm-delete-button"
        @click="confirm"
      >
        <TrashIco />
      </ButtonSlot>

      <ButtonCoinSlot content="Cancelar" @click="cancel">
        <CrossIco />
      </ButtonCoinSlot>
    </FlexContainer>
  </FlexContainer>
</template>

<style scoped lang="scss">
.footer {
  margin-top: 6px;

  & .confirm-delete-button {
    background-color: red;
    margin-right: 8px;
  }
}
</style>
