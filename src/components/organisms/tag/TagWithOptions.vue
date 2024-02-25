<script setup lang="ts">
import TagDelete from './TagDelete.vue'
import TagUpdate from './TagUpdate.vue'
import MoreOptions from '../../molecules/MoreOptions.vue'
import { onMounted, reactive } from 'vue'
// import { useHandleCardsTags } from '@/stores/local/handleCardsTags'
import TagView from '../../molecules/TagView.vue'

// const cardsTags = useHandleCardsTags()

const buttonOptions = reactive({
  show: false,
  visible: () => (buttonOptions.show = true),
  hiden: () => (buttonOptions.show = false)
})

const props = defineProps<{
  tag: {
    emoji: string
    content: string
    id: string
  }
}>()

// const printTag = () => {
//   cardsTags.cardsFiltredByTags.setFilter([props.tag.id], 'some')
// }

onMounted(() => {
  const scren = window.innerWidth
  if (scren < 768) buttonOptions.visible()
})
</script>

<template>
  <div class="tag-container" @mouseenter="buttonOptions.visible" @mouseleave="buttonOptions.hiden">
    <TagView class="button" :tag="props.tag" />
    <MoreOptions class="button-more-options" v-if="buttonOptions.show">
      <div class="options-container">
        <TagUpdate :tag="tag" class="button" @close="buttonOptions.hiden" />
        <TagDelete :tag="props.tag" class="button ent-button" @close="buttonOptions.hiden" />
      </div>
    </MoreOptions>
  </div>
</template>

<style scoped lang="scss">
.tag-container {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  & .button {
    width: 100%;
    flex-shrink: 0;
    margin-bottom: 6px;
  }
  & .ent-button {
    margin-bottom: 0;
  }
  & .button-more-options {
    position: absolute;
    height: calc(100% - 10px);
    aspect-ratio: 1;
    top: 2px;
    right: calc(2.5% + 4px);
    & .options-container {
      width: 160px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
