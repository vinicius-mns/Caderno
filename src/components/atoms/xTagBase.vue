<!-- <script setup lang="ts">
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import ThemeButton from '@/components/atoms/ThemeButton.vue'
import ThemeP from '@/components/atoms/ThemeP.vue'
import { useStyleGlobal } from '@/stores/style/style'

const style = useStyleGlobal()

const props = defineProps<{ tag: ITag }>()

const emit = defineEmits<{ (e: 'emitTag', v: ITag): void }>()

const emitTag = () => emit('emitTag', props.tag)
</script>

<template>
  <div :title="props.tag.content" @click="emitTag" class="tag-container">
    <span class="emoji">{{ props.tag.emoji }}</span>
    <ThemeP class="content" :content="props.tag.content" />
  </div>
</template>

<style scoped lang="scss">
$height: 40px;
.tag-container {
  height: $height;
  width: 100%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  position: relative;
  & .emoji {
    margin-left: 10px;
    font-size: 19px;
  }
  & .content {
    margin-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-wrap: nowrap;
  }
}
</style> -->
