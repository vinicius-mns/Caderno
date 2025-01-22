<script setup lang="ts">
import ThemeP from '@/components/atoms/ThemeP.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import FlexContainer from '../atoms/FlexContainer.vue'
import FloatDescription from '../atoms/FloatDescription.vue'

const props = withDefaults(
  defineProps<{
    tag: Itag
    tagEmojiSize?: string
    miniTag?: boolean
  }>(),
  {
    tagEmojiSize: '16px',
    miniTag: false
  }
)
</script>

<template>
  <FlexContainer :title="props.tag[1]" class="tag-container" align-items="center">
    <FlexContainer
      align-items="center"
      :style="{ height: '100%' }"
      class="emoji"
      v-if="!props.miniTag"
    >
      <span>{{ props.tag[0] }}</span>
    </FlexContainer>

    <ThemeP class="content" :content="props.tag[1]" v-if="!props.miniTag" />

    <FloatDescription :content="`${tag[0]} ${tag[1]}`" class="tag-mini" v-if="props.miniTag">
      <ThemeP :content="tag[0]" class="tag" />
    </FloatDescription>
  </FlexContainer>
</template>

<style scoped lang="scss">
$height: 33px;
.tag-container {
  height: $height;
  width: 100%;
  flex-shrink: 0;

  & .emoji {
    margin-left: 10px;
    font-size: v-bind('props.tagEmojiSize');
  }

  & .content {
    margin-left: 5px;
    padding-right: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-wrap: nowrap;
  }

  & .tag-mini {
    margin: 0 6px;
    cursor: pointer;
  }
}
</style>
