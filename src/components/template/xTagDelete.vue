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
</script>

<template>
  <div class="container">
    <TagDelete :tag="tag" @click="tagDelete" />
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
}
</style> -->
