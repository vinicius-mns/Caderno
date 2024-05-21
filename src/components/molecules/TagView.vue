<script setup lang="ts">
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import ThemeButton from '@/components/atoms/ThemeButton.vue'
import ThemeP from '@/components/atoms/ThemeP.vue'

const props = defineProps<{ tag: ITag }>()

const emit = defineEmits<{ (e: 'emitTag', v: ITag): void }>()

const emitTag = () => emit('emitTag', props.tag)
</script>

<template>
  <ThemeButton :title="props.tag.content" @click="emitTag" class="tag-container">
    <p class="emoji">{{ props.tag.emoji }}</p>
    <ThemeP class="content" :content="props.tag.content" />
  </ThemeButton>
</template>

<style scoped lang="scss">
$height: 36px;
$margin: 3px;
.tag-container {
  width: 100%;
  height: $height;
  flex-shrink: 0;
  margin: $margin 0 $margin 0;
  display: flex;
  align-items: center;
  background-color: transparent;
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
}
</style>
