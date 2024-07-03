<!-- <script setup lang="ts">
import { useTags } from '@/stores/local/tags'
import TagDelete from '../organisms/TagDelete.vue'
import { usePanelControll } from '@/stores/panelControll'
import { computed, nextTick } from 'vue'

const tags = useTags()

const panelControll = usePanelControll()

const tag = computed(() => panelControll.route.tagsOptions.props)

const tagDelete = () => {
  tags.deleteOne(tag.value.id)
  nextTick(() => {
    panelControll.route.tags.pushRoute()
  })
}
// <WindowModal class="modal" v-if="panelControll.route.tagDelete.show()">
</script>

<template>
  <TagDelete :tag="tag" @emit-delete="tagDelete" />
</template>

<style scoped lang="scss">
.modal {
  width: 300px;
}
</style> -->
