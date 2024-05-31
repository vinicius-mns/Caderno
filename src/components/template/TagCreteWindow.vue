<script setup lang="ts">
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import TagEditor from '../organisms/TagEditor.vue'
import { useTags } from '@/stores/local/tags'
import WindowModal from '../atoms/WindowModal.vue'
import { useWindows } from '@/stores/windows'

const tags = useTags()

const window = useWindows()

const props = defineProps<{
  allEmoji: string[]
}>()

const close = () => window.tagCreateWindow.close()

const tagInit: ITag = { id: '', content: '', emoji: '' }

const createTag = (tag: ITag) => {
  tags.createOne(tag)
  close()
}
</script>

<template>
  <WindowModal title="Criar tag" v-if="window.tagCreateWindow.value" @emit-close="close">
    <div class="modal-card" title="Criar tag">
      <TagEditor :emojis="props.allEmoji" :tag="tagInit" @emit-tag="createTag" />
    </div>
  </WindowModal>
</template>

<style scoped lang="scss">
.modal-card {
  width: 300px;
  max-height: 48dvh;
}
</style>
