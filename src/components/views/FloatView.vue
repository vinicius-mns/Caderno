<script setup lang="ts">
import { useFloatModal } from '@/stores/floatModal'
import TagOptions from '../template/floatModal/TagOptions.vue'
import CardFloatModal from '../atoms/CardFloatModal.vue'
import TagsFilter from '../template/floatModal/TagsFilter.vue'
import { useTags } from '@/stores/tags/tags'

const floatModal = useFloatModal()
const tags = useTags()
</script>

<template>
  <div>
    <CardFloatModal
      v-if="floatModal.tagOptions.show"
      :position="floatModal.tagOptions.position"
      :close-on-click="true"
      @close="floatModal.tagOptions.close()"
    >
      <TagOptions :tag="floatModal.tagOptions.props" />
    </CardFloatModal>

    <CardFloatModal
      v-if="floatModal.tagsFilter.show"
      :position="floatModal.tagsFilter.position"
      @close="floatModal.tagsFilter.close()"
    >
      <TagsFilter
        tags-text-filter=""
        :tags="tags.tags"
        :include-tags="tags.includeTags"
        :exclude-tags="tags.excludeTags"
        class="float-card"
      />
    </CardFloatModal>
  </div>
</template>

<style scoped lang="scss">
// .float-view-container {
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100dvw;
//   height: 100dvh;
//   pointer-events: none;

//   & .float-card {
//     position: absolute;
//     top: v-bind('floatModal.cursorPosition.y');
//     left: v-bind('floatModal.cursorPosition.x');
//   }
// }

// .float-show {
//   pointer-events: all;
//   // background-color: rgba(0, 0, 0, 0.466);
// }
</style>
