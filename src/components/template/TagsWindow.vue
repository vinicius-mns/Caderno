<script setup lang="ts">
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import TagView from '@/components/molecules/TagView.vue'
import TagListSlot from '../organisms/TagListSlot.vue'
import ModalCard from '../atoms/ModalCard.vue'
import ButtonOption from '../molecules/ButtonOption.vue'
import PencilIco from '../atoms/icons/PencilIco.vue'
import TrashIco from '../atoms/icons/TrashIco.vue'
import EraserIco from '../atoms/icons/EraserIco.vue'
import CardCrossIco from '../atoms/icons/CardCrossIco.vue'
import { useWindows } from '@/stores/windows'
import WindowModal from '../atoms/WindowModal.vue'

const window = useWindows()

const props = defineProps<{
  allTags: ITag[]
  tagTarget: ITag
}>()

const emit = defineEmits<{
  (e: 'emiTag', v: ITag): void
}>()

const close = () => window.tagsWindow.close()

const emitTag = (tag: ITag) => emit('emiTag', tag)
</script>

<template>
  <WindowModal title="Minhas tags" v-if="window.tagsWindow.value" @emit-close="close">
    <ModalCard class="modal-card">
      <ButtonOption
        content="Criar nova tag"
        class="tag-create-button"
        @click="window.tagCreateWindow.open"
      >
        <PencilIco />
      </ButtonOption>
      <TagListSlot :all-tags="props.allTags" @emit-tag="emitTag" class="tags">
        <ModalCard class="options-container">
          <TagView :tag="props.tagTarget" />
          <ButtonOption content="Editar tag" class="button" @click="window.tagUpdateWindow.open">
            <PencilIco />
          </ButtonOption>
          <ButtonOption content="Remover tag da cards" class="button">
            <EraserIco />
          </ButtonOption>
          <ButtonOption
            content="Deletar cards com tag"
            class="button"
            @click="window.tagDeleteCardsWindow.open"
          >
            <CardCrossIco />
          </ButtonOption>
          <ButtonOption content="Deletar tag" class="button" @click="window.tagDeleteWindow.open">
            <TrashIco />
          </ButtonOption>
        </ModalCard>
      </TagListSlot>
    </ModalCard>
  </WindowModal>
</template>

<style scoped lang="scss">
.modal-card {
  width: 300px;
  max-height: 48dvh;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    width: 100dvw;
  }
  & .tag-create-button {
    padding: 20px;
    margin: 4px 0;
    box-sizing: border-box;
  }
  & .tags {
    height: 100%;
    overflow-y: auto;
    & .options-container {
      width: 300px;
      max-height: 45dvh;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      & .button {
        margin: 3px 0;
      }
    }
  }
}
</style>
