<script setup lang="ts">
import TagDelete from './TagDelete.vue'
import TagUpdate from './TagUpdate.vue'
import { ref } from 'vue'
import TagView from '../../molecules/TagView.vue'
import FloatModalSlot from '@/components/molecules/FloatModalSlot.vue'

const props = defineProps<{
  tag: {
    emoji: string
    content: string
    id: string
  }
}>()

const floatModal = ref<InstanceType<typeof FloatModalSlot>>()

const closeModal = () => floatModal.value?.close()
</script>

<template>
  <FloatModalSlot class="tag-with-options-container" ref="floatModal">
    <template #button-slot>
      <TagView :tag="props.tag" class="tag-option" />
    </template>
    <template #container-slot>
      <div class="float-modal-tag-options-container">
        <TagUpdate :tag="tag" class="button-option" @close="closeModal" />
        <TagDelete :tag="props.tag" class="button-option" @close="closeModal" />
      </div>
    </template>
  </FloatModalSlot>
</template>

<style scoped lang="scss">
.tag-with-options-container {
  height: 36px;
  width: 100%;
  & .tag-option {
    width: 100%;
    flex-shrink: 0;
    flex-grow: 0;
  }
  & .float-modal-tag-options-container {
    width: 150px;
    padding: 10px;
    & .button-option {
      width: 100%;
      padding: 0;
      margin: 4px 0 4px;
    }
  }
}
</style>
