<script setup lang="ts">
import { reactive } from 'vue'
import CenterModal from '../../atoms/CenterModal.vue'
import TagEditor from '../../molecules/TagEditor.vue'
import ThemeButton from '../../atoms/ThemeButton.vue'
import type { ITag } from '@/api/local'
import { useHandleCardsTags } from '@/stores/local/handleCardsTags'

const cardsTags = useHandleCardsTags()

const props = defineProps<{ tag: ITag }>()

const emit = defineEmits<{ (e: 'close', v: null): void }>()

const modal = reactive({
  show: false,
  open: () => (modal.show = true),
  close: () => {
    modal.show = false
    emit('close', null)
  }
})

const updateTag = (e: typeof props.tag) => {
  cardsTags.tagsReactive.update(e)
  modal.close()
}
</script>

<template>
  <div class="tag-editor">
    <ThemeButton @click="modal.open" class="button">Editar tag</ThemeButton>
    <CenterModal title-modal="Editar tag" v-if="modal.show" @close="modal.close">
      <TagEditor :tag="tag" @emit-tag="updateTag" />
    </CenterModal>
  </div>
</template>

<style scoped lang="scss">
.tag-editor {
  width: 100%;
  height: 100%;
  & .button {
    width: 100%;
  }
}
</style>
