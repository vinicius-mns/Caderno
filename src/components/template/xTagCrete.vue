<!-- <script setup lang="ts">
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import TagEditor from '../organisms/TagEditor.vue'
import { useTags } from '@/stores/local/tags'
import { nextTick } from 'vue'
import { usePanelControll } from '@/stores/panelControll'

const tags = useTags()

const panelControll = usePanelControll()

const props = defineProps<{ allEmoji: string[] }>()

const tagInit: ITag = { id: '', content: '', emoji: '' }

const createTag = (tag: ITag) => {
  tags.createOne(tag)
  nextTick(() => {
    panelControll.route.tags.pushRoute()
  })
}
</script>

<template>
  <div class="modal-card">
    <TagEditor :emojis="props.allEmoji" :tag="tagInit" @emit-tag="createTag" />
  </div>
</template>

<style scoped lang="scss">
.modal-card {
  width: 100%;
  max-height: 100%;
  padding: 15px;
  box-sizing: border-box;
}
</style> -->
