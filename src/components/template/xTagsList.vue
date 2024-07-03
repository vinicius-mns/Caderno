<!-- <script setup lang="ts">
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import ButtonOption from '../molecules/ButtonOption.vue'
import PencilIco from '../atoms/icons/PencilIco.vue'
import { usePanelControll } from '@/stores/panelControll'
import TagsWithOptions from '../organisms/TagsWithOptions.vue'

const panelControll = usePanelControll()

const props = defineProps<{
  allTags: ITag[]
}>()

const tagDelete = (t: ITag) => {
  panelControll.route.tagsOptions.updateProps(t)
  panelControll.route.tagDelete.pushRoute()
}

const tagUpdate = (t: ITag) => {
  panelControll.route.tagsOptions.updateProps(t)
  panelControll.route.tagUpdate.pushRoute()
}

const tagDeleteCards = (t: ITag) => {
  panelControll.route.tagsOptions.updateProps(t)
  panelControll.route.tagDeleteCards.pushRoute()
}
</script>

<template>
  <div class="modal-card" v-if="panelControll.route.tags.show()">
    <div class="tags-container">
      <TagsWithOptions
        :all-tags="props.allTags"
        @delete="tagDelete"
        @update="tagUpdate"
        @delete-cards-with-tag="tagDeleteCards"
      />
    </div>
    <ButtonOption
      content="Criar nova tag"
      class="tag-create-button"
      @click="panelControll.route.tagCreate.pushRoute"
    >
      <PencilIco />
    </ButtonOption>
  </div>
</template>

<style scoped lang="scss">
.modal-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px;
  box-sizing: border-box;
  & .tags-container {
    height: 100%;
    overflow: auto;
    margin-bottom: 10px;
  }
}
</style> -->
