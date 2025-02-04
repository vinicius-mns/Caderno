<script setup lang="ts">
import { computed, ref } from 'vue'
import CheckBoxBase from '../atoms/CheckBoxBase.vue'
import TagView from '../molecules/TagView.vue'
import type { Itag } from '@/stores/tags/Interfaces'

const props = defineProps<{
  tag: Itag
  type: 'include' | 'exclude' | 'none'
}>()

const emit = defineEmits<{
  (e: 'emitTagType', v: { tag: Itag; type: 'include' | 'exclude' | 'none' }): void
}>()

const isChecked = computed(() => props.type !== 'none')

const emitTagType = () => {
  if (props.type === 'none') emit('emitTagType', { tag: props.tag, type: 'include' })
  if (props.type === 'include') emit('emitTagType', { tag: props.tag, type: 'exclude' })
  if (props.type === 'exclude') emit('emitTagType', { tag: props.tag, type: 'none' })
}

const useSlot = () => {
  const show = ref(false)

  const open = () => (show.value = true)

  const close = () => (show.value = false)

  return { show, open, close }
}

const slot = useSlot()
</script>

<template>
  <CheckBoxBase
    checkbox-name="include-tags"
    :is-checked="isChecked"
    :id="tag[1]"
    :class="[props.type === 'include' && 'include', props.type === 'exclude' && 'exclude', 'tag']"
    @mouseenter="slot.open()"
    @mouseleave="slot.close()"
  >
    <TagView :tag="tag" @click="emitTagType" />
    <div v-if="slot.show.value" class="slot-options">
      <slot></slot>
    </div>
  </CheckBoxBase>
</template>

<style scoped lang="scss">
$border-radius: 100px;

.tag {
  border-radius: $border-radius;
  width: 100%;
  // border: solid 1px v-bind('stylesPage.atualColor.border');
  position: relative;
  overflow: hidden;
}

.include {
  border: solid 1px rgb(86, 110, 86);
  // border-color: rgb(86, 110, 86);
  background-color: rgba(86, 140, 86, 0.2);
}

.exclude {
  border: solid 1px rgb(110, 86, 86);
  // border-color: rgb(110, 86, 86);
  background-color: rgb(140, 86, 86, 0.2);
}

.slot-options {
  position: absolute;
  right: 2px;
}
</style>
