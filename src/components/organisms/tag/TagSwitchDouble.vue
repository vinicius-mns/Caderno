<script setup lang="ts">
import type { ITag } from '@/api/local'
import TagView from '../../molecules/TagView.vue'
import { reactive } from 'vue'
import ThemeButton from '@/components/atoms/ThemeButton.vue'

const props = defineProps<{
  tag: ITag
}>()

const emit = defineEmits<{
  (e: 'emitTag', v: { tagId: string; checked: 'l' | 'r' | 'n' }): void
}>()

const checked = reactive({
  tagId: props.tag.id,
  checked: 'n' as 'l' | 'r' | 'n'
})

const handleChecked = (type: 'l' | 'r' | 'n') => {
  if (checked.checked === type) checked.checked = 'n'
  else checked.checked = type
}

const emitTagL = () => {
  handleChecked('l')
  emit('emitTag', checked)
}

const emitTagR = () => {
  handleChecked('r')
  emit('emitTag', checked)
}
</script>

<template>
  <div class="tag-container">
    <TagView :class="[checked.checked, 'tag-d-s']" :tag="props.tag" />
    <ThemeButton class="l-switch check-b" @click="emitTagL"></ThemeButton>
    <ThemeButton class="r-switch check-b" @click="emitTagR"></ThemeButton>
  </div>
</template>

<style scoped lang="scss">
.tag-container {
  position: relative;
  width: 95%;
  display: flex;
  justify-content: center;
  & .tag-d-s {
    width: 100%;
    flex-shrink: 0;
    // margin: 4px;
    border-radius: 0;
  }
  & .l {
    background-color: red;
  }
  & .r {
    background-color: rgb(128, 184, 128);
  }
  & .check-b {
    opacity: 0;
    width: 50%;
    height: 100%;
    border-radius: 0;
    position: absolute;
  }
  & .l-switch {
    right: 50%;
    &:hover {
      background-color: red;
      opacity: 30%;
    }
  }
  & .r-switch {
    right: 0;
    &:hover {
      background-color: green;
      opacity: 30%;
    }
  }
}
</style>
