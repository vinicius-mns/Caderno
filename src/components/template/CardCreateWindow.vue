<script setup lang="ts">
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import { useCards } from '@/stores/local/cards'
import CardEditor from '@/components/organisms/CardEditor.vue'
import type { ICard } from '@/api/api_local/entites/cards/CardsTypes'
import WindowModal from '../atoms/WindowModal.vue'
import { useWindows } from '@/stores/windows'
import ModalCard from '../atoms/ModalCard.vue'
const cards = useCards()

const window = useWindows()

const props = defineProps<{
  allTags: ITag[]
}>()

const close = () => window.CardCreateWindow.close()

const initCard: ICard = { id: '', date: new Date(), tags: [], content: '' }

const createCard = (card: ICard) => {
  cards.createOne(card)
  close()
}
</script>

<template>
  <WindowModal title="Criar novo card" v-if="window.CardCreateWindow.value" @emit-close="close">
    <ModalCard class="moda-card">
      <CardEditor :all-tags="props.allTags" :card="initCard" @emit-card="createCard" />
    </ModalCard>
  </WindowModal>
</template>

<style scoped lang="scss">
.moda-card {
  width: 320px;
  height: 48dvh;
  @media screen and (max-width: 768px) {
    width: 100dvw;
  }
}
</style>
