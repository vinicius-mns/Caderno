<script setup lang="ts">
import { reactive } from 'vue'
import CenterModal from '../../atoms/CenterModal.vue'
import TagEditor from '../../molecules/TagEditor.vue'
import ThemeButton from '@/components/atoms/ThemeButton.vue'
import { useTags } from '@/stores/local/tags'

const tag = useTags()

const initTag = {
  emoji: '',
  content: '',
  id: ''
}

const emit = defineEmits<{ (e: 'close', v: null): void }>()

const modal = reactive({
  show: false,
  open: () => (modal.show = true),
  close: () => {
    modal.show = false
    emit('close', null)
  }
})

const createTag = (e: typeof initTag) => {
  tag.createOne(e)
  modal.close()
}
</script>

<template>
  <div class="tag-create">
    <!-- <ThemeIco ico="🏷️" @click="modal.open" content="Criar tag" size="24px" /> -->
    <ThemeButton @click="modal.open" class="button">Criar tag 🏷️</ThemeButton>
    <CenterModal title-modal="Criar tag" v-if="modal.show" @close="modal.close">
      <TagEditor :tag="initTag" @emit-tag="createTag" />
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
