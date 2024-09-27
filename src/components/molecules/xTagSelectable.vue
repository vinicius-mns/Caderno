<!-- <script setup lang="ts">
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import ThemeButton from '@/components/atoms/ThemeButton.vue'
import ThemeP from '@/components/atoms/ThemeP.vue'
import CheckIco from '@/components/atoms/icons/CheckIco.vue'
import { ref } from 'vue'

const props = defineProps<{
  tag: ITag
  checked: boolean
}>()

const emit = defineEmits<{
  (e: 'emitTag', v: { tag: ITag; check: boolean }): void
}>()

const check = ref(props.checked)
const setCheck = () => (check.value = !check.value)

const emitTag = () => {
  setCheck()
  emit('emitTag', { tag: { ...props.tag }, check: check.value })
}
</script>

<template>
  <ThemeButton
    :class="[check && 'check', 'tag-Selectable']"
    :title="props.tag.content"
    @click="emitTag"
  >
    <CheckIco class="check-ico" v-show="check" />
    <p class="emoji">{{ props.tag.emoji }}</p>
    <ThemeP class="content" :content="props.tag.content" />
  </ThemeButton>
</template>

<style scoped lang="scss">
$height: 36px;
$margin: 4px;
.tag-Selectable {
  width: 100%;
  height: $height;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-top: 5px;
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
  & .check-ico {
    position: absolute;
    right: 10px;
    padding: 4px;
    border-radius: 50%;
    background-color: rgb(113, 141, 101);
  }
}
.check {
  background-color: rgb(90, 122, 77);
  &:hover {
    background-color: rgb(103, 141, 88);
  }
}
</style> -->
