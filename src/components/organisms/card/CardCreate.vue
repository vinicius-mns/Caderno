<script setup lang="ts">
import { reactive } from 'vue'
import CenterModal from '../../atoms/CenterModal.vue'
import type { ICard } from '@/api/local'
import CardEditor from '../../molecules/CardEditor.vue'
import ThemeButton from '@/components/atoms/ThemeButton.vue'

import { useCards } from '@/stores/local/cards'
import { useStyle } from '@/stores/style'

const cards = useCards()

const props = withDefaults(
  defineProps<{
    big?: boolean
  }>(),
  {
    big: false
  }
)

const emit = defineEmits<{ (e: 'close', v: null): void }>()

const { style } = useStyle()

const modal = reactive({
  show: false,
  open: () => (modal.show = true),
  close: () => {
    modal.show = false
    emit('close', null)
  }
})

const initialCard: ICard = {
  content: '',
  date: new Date(),
  id: '',
  tags: []
}

const createCard = (e: ICard) => {
  cards.createOne(e)
  modal.close()
}
</script>

<template>
  <div class="card-create">
    <ThemeButton @click="modal.open" v-if="props.big" class="big">✍️</ThemeButton>
    <ThemeButton @click="modal.open" v-else>Criar card ✍️</ThemeButton>
    <CenterModal title-modal="Criar novo Card" v-if="modal.show" @close="modal.close">
      <CardEditor :card="initialCard" @emit-card="createCard" />
    </CenterModal>
  </div>
</template>

<style scoped lang="scss">
.card-create {
  width: 100%;
  .big {
    height: 60px;
    width: 60px;
    font-size: 20px;
    border: solid 1px v-bind('style.color.background');
    background-color: rgb(125, 125, 173);
    background-color: v-bind('style.color.base');
    border-radius: 50%;
  }
  // & .button {
  //   width: 100%;
  // }
}
</style>
