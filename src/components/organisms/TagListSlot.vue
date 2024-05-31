<script setup lang="ts">
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import FloatModalSlot from '@/components/atoms/FloatModalSlot.vue'
import TagView from '@/components/molecules/TagView.vue'
import { ref } from 'vue'

const props = defineProps<{ allTags: ITag[] }>()

const emit = defineEmits<{ (e: 'emitTag', v: ITag): void }>()

const emitTag = (tag: ITag) => emit('emitTag', tag)

const modal = ref<InstanceType<typeof FloatModalSlot>>()
const modalClose = () => modal.value?.close()
</script>

<template>
  <FloatModalSlot ref="modal">
    <template #button-slot>
      <div class="container-tags">
        <TagView v-for="(tag, i) in props.allTags" :key="i" :tag="tag" @emit-tag="emitTag" />
      </div>
    </template>
    <template #container-slot>
      <div @click="modalClose">
        <slot></slot>
      </div>
    </template>
  </FloatModalSlot>
</template>

<style scoped lang="scss">
.container-tags {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
