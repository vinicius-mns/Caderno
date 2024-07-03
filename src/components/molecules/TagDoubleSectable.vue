<script setup lang="ts">
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import ThemeButton from '@/components/atoms/ThemeButton.vue'
import ThemeP from '@/components/atoms/ThemeP.vue'
import CheckIco from '@/components/atoms/icons/CheckIco.vue'
import CrossIco from '@/components/atoms/icons/CrossIco.vue'
import { ref } from 'vue'

const props = defineProps<{
  tag: ITag
}>()

const emit = defineEmits<{
  (e: 'emitTag', v: { tag: ITag; status: 'r' | 'g' | 'n' }): void
}>()

const check = ref('n' as 'r' | 'g' | 'n')
const setCheck = (v: 'r' | 'g' | 'n') => {
  check.value === v ? (check.value = 'n') : (check.value = v)
}

const emitTag = (v: 'r' | 'g' | 'n') => {
  setCheck(v)
  emit('emitTag', { tag: { ...props.tag }, status: check.value })
}
</script>

<template>
  <ThemeButton :class="[check, 'tag-Selectable']" :title="props.tag.content">
    <div class="container-actions">
      <CrossIco class="cross ico" @click="() => emitTag('r')" />
      <CheckIco class="check ico" @click="() => emitTag('g')" />
    </div>
    <p class="emoji">{{ props.tag.emoji }}</p>
    <ThemeP class="content" :content="props.tag.content" />
  </ThemeButton>
</template>

<style scoped lang="scss">
$height: 42px;
$margin: 4px;
.tag-Selectable {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: 100%;
  height: $height;
  margin: $margin 0;
  position: relative;
  & .emoji {
    font-size: calc($height / 1.8);
  }
  & .content {
    margin-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-wrap: nowrap;
  }
  & .container-actions {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    & .ico {
      width: 50%;
      height: 100%;
      opacity: 0;
      padding: 10px;
      box-sizing: border-box;
    }
    & .cross:hover {
      opacity: 100%;
      background-color: rgba(160, 26, 26, 0.8);
    }
    & .check:hover {
      opacity: 100%;
      background-color: rgba(90, 122, 77, 0.8);
    }
  }
}
.g {
  background-color: rgb(90, 122, 77);
  &:hover {
    background-color: rgb(103, 141, 88);
  }
}
.r {
  background-color: rgb(160, 26, 26);
  &:hover {
    background-color: rgb(180, 37, 37);
  }
}
</style>
