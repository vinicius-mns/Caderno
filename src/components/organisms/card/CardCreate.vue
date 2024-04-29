<script setup lang="ts">
import { reactive, ref } from 'vue'
// import CenterModal from '../../atoms/CenterModal.vue'
import type { ICard } from '@/api/local'
import CardEditor from '../../molecules/CardEditor.vue'
import ThemeButton from '@/components/atoms/ThemeButton.vue'

import { useCards } from '@/stores/local/cards'
import { useStyle } from '@/stores/style'
import CenterModal from '@/components/molecules/CenterModal.vue'
import CenterModalSlot from '@/components/molecules/CenterModalSlot.vue'
import FloatDescription from '@/components/molecules/FloatDescription.vue'

const cards = useCards()

const { style } = useStyle()

const props = defineProps<{
  type: 'mini' | 'full'
}>()

const centerModal = ref<InstanceType<typeof CenterModalSlot>>()

const initialCard: ICard = {
  content: '',
  date: new Date(),
  id: '',
  tags: []
}

const createCard = (e: ICard) => {
  cards.createOne(e)
  centerModal.value?.close()
}
</script>

<template>
  <CenterModalSlot title-modal="Criar novo card" class="container-create-card" ref="centerModal">
    <template #button-modal>
      <FloatDescription content="Criar um novo card">
        <ThemeButton class="mini" v-if="props.type === 'mini'">✍️</ThemeButton>
      </FloatDescription>
      <ThemeButton class="full" v-if="props.type === 'full'">Criar card ✍️</ThemeButton>
    </template>
    <template #center-modal>
      <CardEditor :card="initialCard" @emit-card="createCard" />
    </template>
  </CenterModalSlot>
</template>

<style scoped lang="scss">
$button-size: v-bind('style.button.size');
.container-create-card {
  & .mini {
    width: $button-size;
    height: $button-size;
    font-size: calc(($button-size / 1.8));
  }
  & .full {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
