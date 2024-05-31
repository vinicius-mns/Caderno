<script setup lang="ts">
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import { useTags } from '@/stores/local/tags'
import ButtonOption from '../molecules/ButtonOption.vue'
import TrashIco from '../atoms/icons/TrashIco.vue'
import TagView from '../molecules/TagView.vue'
import WindowModal from '../atoms/WindowModal.vue'
import { useWindows } from '@/stores/windows'
import ModalCard from '../atoms/ModalCard.vue'

const tags = useTags()

const window = useWindows()

const props = defineProps<{
  tag: ITag
}>()

const close = () => window.tagDeleteWindow.close()

const deleteTags = () => {
  tags.deleteOne(props.tag.id)
  close()
}
</script>

<template>
  <WindowModal title="Deseja deletar tag?" v-if="window.tagDeleteWindow.value" @emit-close="close">
    <ModalCard class="modal-card">
      <div class="tags-list-container">
        <TagView :tag="props.tag" />
      </div>
      <ButtonOption content="Confirmar" @click="deleteTags">
        <TrashIco />
      </ButtonOption>
    </ModalCard>
  </WindowModal>
</template>

<style scoped lang="scss">
.modal-card {
  width: 300px;
  max-height: 48dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
  & .tags-list-container {
    width: 100%;
  }
}
</style>
