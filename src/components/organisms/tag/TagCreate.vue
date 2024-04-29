<script setup lang="ts">
import { reactive, ref } from 'vue'
// import CenterModal from '../../atoms/CenterModal.vue'
import TagEditor from '../../molecules/TagEditor.vue'
import ThemeButton from '@/components/atoms/ThemeButton.vue'
import { useTags } from '@/stores/local/tags'
import CenterModal from '@/components/molecules/CenterModal.vue'

const tag = useTags()

const initTag = {
  emoji: '',
  content: '',
  id: ''
}

const centerModal = ref<InstanceType<typeof CenterModal>>()

const createTag = (e: typeof initTag) => {
  tag.createOne(e)
  centerModal.value?.toggleVisible()
}
</script>

<template>
  <CenterModal
    button-content="Criar nova tag 🏷️"
    title-modal="Criar nova tag"
    ref="centerModal"
    class="button-tag-create"
  >
    <TagEditor :tag="initTag" @emit-tag="createTag" />
  </CenterModal>
</template>

<style scoped lang="scss">
.button-tag-create {
  width: 100%;
}
</style>
