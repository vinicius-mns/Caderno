<!-- <script setup lang="ts">
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import TagView from '@/components/molecules/TagView.vue'
import ButtonOption from '../molecules/ButtonOption.vue'
import PencilIco from '../atoms/icons/PencilIco.vue'
import TrashIco from '../atoms/icons/TrashIco.vue'
import EraserIco from '../atoms/icons/EraserIco.vue'
import CardCrossIco from '../atoms/icons/CardCrossIco.vue'
import { onMounted, ref } from 'vue'
import { usePanelControll } from '@/stores/panelControll'

const panelControll = usePanelControll()

const tag = ref<ITag>({ content: '', id: '', emoji: '' })

onMounted(() => {
  tag.value = panelControll.route.tagsOptions.props
})
</script>

<template>
  <div class="options-container">
    <TagView :tag="tag" />
    <ButtonOption
      content="Editar tag"
      class="button"
      @click="panelControll.route.tagUpdate.pushRoute"
    >
      <PencilIco />
    </ButtonOption>
    <ButtonOption content="Remover tag da cards" class="button">
      <EraserIco />
    </ButtonOption>
    <ButtonOption
      content="Deletar cards com tag"
      class="button"
      @click="panelControll.route.tagDeleteCards.pushRoute"
    >
      <CardCrossIco />
    </ButtonOption>
    <ButtonOption
      content="Deletar tag"
      class="button"
      @click="panelControll.route.tagDelete.pushRoute"
    >
      <TrashIco />
    </ButtonOption>
  </div>
</template>

<style scoped lang="scss">
.options-container {
  width: 100%;
  max-height: 100%;
  padding: 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  & .button {
    margin: 3px 0;
  }
}
</style> -->
