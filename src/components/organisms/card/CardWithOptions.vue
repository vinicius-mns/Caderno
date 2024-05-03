<script setup lang="ts">
import { useStyle } from '@/stores/style'
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

const { style } = useStyle()

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
  <!-- <div class="card" @mouseenter="openOptionsModal" @mouseleave="closeOptionsModal">
    <FloatModal button-content="+" v-if="options.show" class="float-button-card-options">
    </FloatModal>
  </div> -->
</template>

<style scoped lang="scss">
$buttonSize: v-bind('style.button.size');
$margin: 20px;
.card {
  // position: relative;
  // width: 100%;
  // min-width: 380px;
  // max-width: 860px;
  // flex-shrink: 0;
  // margin-bottom: $margin;
  // position: relative;
  // box-sizing: border-box;
}
.options-container {
  width: 280px;
  height: 48dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  & .option-button {
    flex-shrink: 0;
    width: 95%;
    margin-top: 8px;
  }
  & .tags-switch {
    margin-top: 0;
    width: 96%;
  }
}

.confirm-changes {
  background-color: rgb(116, 116, 255);
}
</style>
