<!-- <script setup lang="ts">
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import ControlPanel from '../organisms/ControlPanel.vue'
import { onMounted, ref } from 'vue'
import { usePanelControll } from '@/stores/panelControll'
import CardEditor from '../organisms/CardEditor.vue'
import { useCards } from '@/stores/local/cards'
import { useTags } from '@/stores/local/tags'

const panelControll = usePanelControll()

const card = useCards()

const tags = useTags()
</script>

<template>
  <ControlPanel title="Minhas tags">
    <CardEditor
      class="container"
      :all-tags="tags.tags"
      :card="{ content: '', date: new Date(), id: '', tags: [] }"
      @emit-card="card.createOne"
    />
  </ControlPanel>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  max-height: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
</style> -->
