<script setup lang="ts">
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import FloatModalSlot from '@/components/atoms/FloatModalSlot.vue'
import TagView from '@/components/molecules/TagView.vue'

const props = defineProps<{ allTags: ITag[] }>()

const emit = defineEmits<{ (e: 'emitTag', v: ITag): void }>()

const emitTag = (tag: ITag) => emit('emitTag', tag)
</script>

<template>
  <FloatModalSlot>
    <template #button-slot>
      <div class="container-tags">
        <TagView v-for="(tag, i) in props.allTags" :key="i" :tag="tag" @emit-tag="emitTag" />
      </div>
    </template>
    <template #container-slot>
      <slot></slot>
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
