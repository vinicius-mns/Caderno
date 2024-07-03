<!-- <script setup lang="ts">
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import TagEditor from '../organisms/TagEditor.vue'
import { useTags } from '@/stores/local/tags'
import { nextTick, onMounted, ref } from 'vue'
import { usePanelControll } from '@/stores/panelControll'

const tags = useTags()

const panelControll = usePanelControll()

const props = defineProps<{ allEmoji: string[] }>()

const tag = ref<ITag>({ id: '', content: 'um teste', emoji: '' })

const tagUpdate = (tag: ITag) => {
  tags.updateOne(tag)
  nextTick(() => {
    panelControll.route.tags.pushRoute()
  })
}

onMounted(() => {
  tag.value = panelControll.route.tagsOptions.props
})
</script>

<template>
  <div class="modal-card">
    <TagEditor
      :emojis="props.allEmoji"
      :tag="panelControll.route.tagsOptions.props"
      @emit-tag="tagUpdate"
    />
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
