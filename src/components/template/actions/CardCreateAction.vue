<script setup lang="ts">
import FloatModalSlot from '@/components/atoms/FloatModalSlot.vue'
import CoinButton from '@/components/molecules/CoinButton.vue'
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import { ref } from 'vue'
import PencilIco from '@/components/atoms/icons/PencilIco.vue'
import { useCards } from '@/stores/local/cards'
import CardEditor from '@/components/organisms/card/CardEditor.vue'
import type { ICard } from '@/api/api_local/entites/cards/CardsTypes'

const cards = useCards()

const props = defineProps<{
  allTags: ITag[]
  allEmojis: string[]
}>()

const floatModal = ref<InstanceType<typeof FloatModalSlot>>()
const floatModalClose = () => floatModal.value?.close()

const initCard: ICard = { id: '', date: new Date(), tags: [], content: '' }

const createCard = (card: ICard) => {
  cards.createOne(card)
  floatModalClose()
}
</script>

<template>
  <FloatModalSlot ref="floatModal">
    <template #button-slot>
      <CoinButton description="Criar card">
        <PencilIco />
      </CoinButton>
    </template>
    <template #container-slot>
      <div class="container">
        <CardEditor :all-tags="props.allTags" :card="initCard" @emit-card="createCard" />
      </div>
    </template>
  </FloatModalSlot>
</template>

<style scoped lang="scss">
.container {
  height: 45dvh;
}
</style>
