<script setup lang="ts">
import { reactive } from 'vue'
import CenterModal from '../../atoms/CenterModal.vue'
import TagEditor from '../../molecules/TagEditor.vue'
import { useHandleCardsTags } from '@/stores/local/handleCardsTags'
import ThemeIco from '@/components/atoms/ThemeIco.vue'

const handleCardsTags = useHandleCardsTags()

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
  handleCardsTags.tagsReactive.create(e)
  modal.close()
}
</script>

<template>
  <div class="tag-create">
    <!-- <ThemeButton @click="modal.open" class="button">Criar nova tag 🏷️</ThemeButton> -->
    <ThemeIco ico="🏷️" @click="modal.open" content="Criar tag" size="24px" />
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
    height: 100%;
  }
}
</style>
