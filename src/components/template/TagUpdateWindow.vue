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
  tag: ITag
}>()

const close = () => window.tagUpdateWindow.close()

const updateTag = (tag: ITag) => {
  tags.updateOne(tag)
  close()
}
</script>

<template>
  <WindowModal title="Atualizar tag" v-if="window.tagUpdateWindow.value" @emit-close="close">
    <div class="modal-card">
      <TagEditor :emojis="props.allEmoji" :tag="props.tag" @emit-tag="updateTag" />
    </div>
  </WindowModal>
</template>

<style scoped lang="scss">
.modal-card {
  width: 300px;
  max-height: 48dvh;
}
</style>
