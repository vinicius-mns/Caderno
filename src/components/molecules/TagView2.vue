<script setup lang="ts">
import ThemeP from '@/components/atoms/ThemeP.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import FlexContainer from '../atoms/FlexContainer.vue'
import FloatDescription from '../atoms/FloatDescription.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'

const stylesPage = useStylesPage()

const props = withDefaults(
  defineProps<{
    tag: Itag
    mini?: boolean
    type?: 'include' | 'exclude' | 'selected' | 'none'
    height?: string
  }>(),
  {
    tagEmojiSize: '16px',
    mini: false,
    type: 'none',
    height: '32px'
  }
)
</script>

<template>
  <FlexContainer :title="props.tag[1]" :class="[type, 'tag-container']" align-items="center">
    <FlexContainer
      align-items="center"
      :style="{ height: '100%' }"
      class="emoji"
      v-if="!props.mini"
    >
      <span>{{ props.tag[0] }}</span>
    </FlexContainer>

    <ThemeP class="content" :content="props.tag[1]" v-if="!props.mini" />

    <FloatDescription
      :content="`${props.tag[0]} ${props.tag[1]}`"
      class="tag-mini"
      v-if="props.mini"
    >
      <span>{{ props.tag[0] }}</span>
    </FloatDescription>
  </FlexContainer>
</template>

<style scoped lang="scss">
$height: v-bind('props.height');

.tag-container {
  transition: all 0.16s;
  height: $height;
  // width: 100%;
  flex-shrink: 0;
  border: solid 1px v-bind('stylesPage.atualColor.border');
  background-color: v-bind('stylesPage.atualColor.front');
  border-radius: 50px;
  cursor: pointer;
  user-select: none;

  &:active {
    filter: invert(1);

    & span {
      filter: invert(1);
    }
  }

  &:hover {
    border-color: rgba(255, 255, 255, 0.3);
    background-color: v-bind('stylesPage.atualColor.hover');
    transform: scale(0.96);
  }

  & .emoji {
    margin-left: 10px;
  }

  & .content {
    margin-left: 5px;
    padding-right: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-wrap: nowrap;
  }

  & .tag-mini {
    // font-size: 19px;
    height: $height;
    width: $height;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.include {
  border-color: rgba(86, 110, 86, 0.5);
  background-color: rgba(86, 140, 86, 0.2);

  &:hover {
    background-color: rgba(86, 140, 86, 0.4);
    border-color: rgba(86, 110, 86);
  }
}

.exclude {
  border-color: rgb(110, 86, 86, 0.5);
  background-color: rgb(140, 86, 86, 0.2);

  &:hover {
    background-color: rgb(140, 86, 86, 0.4);
    border-color: rgb(110, 86, 86);
  }
}

.selected {
  // border-color: rgb(110, 86, 86, 0.5);
  background-color: rgba(255, 255, 255, 0.2);
  background-color: v-bind('stylesPage.atualColor.hover');

  &:active {
    filter: invert(1);
  }

  &:hover {
    border-color: red;
  }
}
</style>
