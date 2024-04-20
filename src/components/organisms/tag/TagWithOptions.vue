<script setup lang="ts">
import TagDelete from './TagDelete.vue'
import TagUpdate from './TagUpdate.vue'
import MoreOptions from '../../molecules/MoreOptions.vue'
import { onMounted, reactive } from 'vue'
// import { useHandleCardsTags } from '@/stores/local/handleCardsTags'
import TagView from '../../molecules/TagView.vue'

// const cardsTags = useHandleCardsTags()

const mobileRules = {
  isMobile: () => window.innerWidth < 780
}

const buttonOptions = reactive({
  show: false,
  visible: () => (buttonOptions.show = true),
  hidden: () => {
    buttonOptions.show = false
    setInterval(() => {
      mobileRules.isMobile() && (buttonOptions.show = true)
    }, 100)
  }
})

const props = defineProps<{
  tag: {
    emoji: string
    content: string
    id: string
  }
}>()

const goTo = () => {
  // cardsTags.cardsFiltredByTags.setFilter([props.tag.id], 'some')
}

onMounted(() => {
  mobileRules.isMobile() ? (buttonOptions.show = true) : (buttonOptions.show = false)
})
</script>

<template>
  <div class="tag-container" @mouseenter="buttonOptions.visible" @mouseleave="buttonOptions.hidden">
    <TagView :tag="props.tag" @click="goTo" class="tag" />
    <MoreOptions class="button-more-options" v-if="buttonOptions.show" :visible="true">
      <div class="options-container">
        <TagUpdate :tag="tag" class="button-option" @close="buttonOptions.hidden" />
        <TagDelete :tag="props.tag" class="button-option" @close="buttonOptions.hidden" />
      </div>
    </MoreOptions>
  </div>
</template>

<style scoped lang="scss">
.tag-container {
  position: relative;
  width: 95%;
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  flex-grow: 0;
  margin: 4px;
  & .button-option {
    width: 100%;
    margin: 4px;
  }
  & .button-more-options {
    position: absolute;
    height: 80%;
    top: 10%;
    right: 5%;
    aspect-ratio: 1;
    // width: 100%;
    // height: 100%;
    & .options-container {
      width: 160px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
