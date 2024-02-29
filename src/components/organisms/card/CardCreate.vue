<script setup lang="ts">
import { computed, reactive } from 'vue'
import ThemeButton from '../../atoms/ThemeButton.vue'
import CenterModal from '../../atoms/CenterModal.vue'
import type { ICard } from '@/api/local'
import CardEditor from '../../molecules/CardEditor.vue'
import { useHandleCardsTags } from '@/stores/local/handleCardsTags'
import ThemeIco from '@/components/atoms/ThemeIco.vue'

const cardsTags = useHandleCardsTags()

const emit = defineEmits<{ (e: 'close', v: null): void }>()

const tags = computed(() => cardsTags.tagsReactive.value)

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
  cardsTags.cardsReactive.create(e)
  modal.close()
}
</script>

<template>
  <div class="tag-create">
    <ThemeIco ico="✍️" size="24px" content="Criar card" @click="modal.open" />
    <CenterModal title-modal="Criar novo Card" v-if="modal.show" @close="modal.close">
      <CardEditor :card="initialCard" @emit-card="createCard" :tags="tags" />
    </CenterModal>
  </div>
</template>

<style scoped lang="scss"></style>
