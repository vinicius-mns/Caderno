<script setup lang="ts">
// import CardView from '../../molecules/CardView.vue'
import { ref } from 'vue'
// import MoreOptions from '../../molecules/MoreOptions.vue'
import type { ICard } from '@/api/local'
import CardDelete from './CardDelete.vue'
import CardUpdate from './CardUpdate.vue'
// import { useHandleCardsTags } from '@/stores/local/handleCardsTags'
import TagWithSwitchList from '../tag/TagWithSwitchList.vue'
// import { useTags } from '@/stores/local/tags'
import { useCards } from '@/stores/local/cards'
import ThemeButton from '@/components/atoms/ThemeButton.vue'
import CardView from './CardView.vue'
// import FloatModal from '@/components/molecules/FloatModal.vue'
import FloatModalSlot from '@/components/molecules/FloatModalSlot.vue'

const cards = useCards()

const props = defineProps<{ card: ICard }>()

const tagIds = ref([''])

const showConfirmChanges = ref(false)

const floatModal = ref<InstanceType<typeof FloatModalSlot>>()

const emitTags = (tagIdsP: string[]) => {
  tagIds.value = tagIdsP
  showConfirmChanges.value = true
}

const handleClose = () => {
  tagIds.value = ['']
  showConfirmChanges.value = false
}

const close = () => {
  floatModal.value?.close()
  handleClose()
}

const confirmnChanges = () => {
  cards.updateOne({ ...props.card, tags: tagIds.value })
  close()
}
</script>

<template>
  <FloatModalSlot ref="floatModal" @close="handleClose">
    <template #button-slot>
      <CardView :card="props.card" class="card" />
    </template>
    <template #container-slot>
      <div class="options-container">
        <TagWithSwitchList
          :checkeds="props.card.tags"
          class="tags-switch"
          unic-name="tags-switch-card-options"
          @emit-tags="emitTags"
          direction="column"
        />
        <CardUpdate
          class="option-button"
          :card="props.card"
          @updated="close"
          v-if="!showConfirmChanges"
        />
        <ThemeButton @click="confirmnChanges" class="option-button confirm-changes" v-else>
          Confirmar Alterações
        </ThemeButton>
        <CardDelete class="option-button" :card="props.card" @close="close" />
      </div>
    </template>
  </FloatModalSlot>
</template>

<style scoped lang="scss">
$buttonSize: 36px;
.options-container {
  width: 100%;
  min-width: 280px;
  height: 48dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  & .option-button {
    width: 100%;
    flex-shrink: 0;
    margin-top: 8px;
  }
  & .tags-switch {
    height: 100%;
    width: 100%;
    margin-top: 0;
  }
}

.confirm-changes {
  background-color: rgb(116, 116, 255);
}
</style>
