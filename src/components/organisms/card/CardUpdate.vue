<script setup lang="ts">
import { computed, reactive } from 'vue'
import ThemeButton from '../../atoms/ThemeButton.vue'
import CenterModal from '../../atoms/CenterModal.vue'
import type { ICard } from '@/api/local'
import CardEditor from '../../molecules/CardEditor.vue'
import { useHandleCardsTags } from '@/stores/local/handleCardsTags'

const cardsTags = useHandleCardsTags()

const props = defineProps<{ card: ICard }>()

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

const createCard = (e: ICard) => {
  cardsTags.cardsReactive.update(e)
  modal.close()
}
</script>

<template>
  <div class="tag-create">
    <ThemeButton @click="modal.open" class="button">Editar Card</ThemeButton>
    <CenterModal title-modal="Editar Card" v-if="modal.show" @close="modal.close">
      <CardEditor :card="props.card" @emit-card="createCard" :tags="tags" />
    </CenterModal>
  </div>
</template>

<style scoped lang="scss">
.tag-create {
  width: 100%;
  & .button {
    width: 100%;
  }
}
</style>
