<script setup lang="ts">
import ThemeP from '@/components/atoms/ThemeP.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import FlexContainer from '../atoms/FlexContainer.vue'
import FloatDescription from '../atoms/FloatDescription.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'
import { computed } from 'vue'

const stylesPage = useStylesPage()

const props = withDefaults(
  defineProps<{
    emojiSize?: string
    tag: Itag
    mini?: boolean
    type?: 'include' | 'exclude' | 'selected' | 'none'
    height?: string
    animation?: boolean
    borderRadius?: string
  }>(),
  {
    emojiSize: '32px',
    mini: false,
    type: 'none',
    height: '32px',
    borderRadius: '50px',
    animation: true
  }
)

const animationClass = computed(() => props.animation && 'animation')
</script>

<template>
  <div class="tag-view-container">
    <FlexContainer
      :title="props.tag[1]"
      :class="[animationClass, props.type, 'tag-container']"
      align-items="center"
      v-if="!props.mini"
    >
      <FlexContainer align-items="center" :style="{ height: '100%' }" class="emoji">
        <span>{{ props.tag[0] }}</span>
      </FlexContainer>

      <ThemeP class="content" :content="props.tag[1]" />
    </FlexContainer>

    <FloatDescription
      :content="`${props.tag[0]} ${props.tag[1]}`"
      :class="[props.type, 'tag-mini']"
      v-if="props.mini"
    >
      <span>{{ props.tag[0] }}</span>
    </FloatDescription>
  </div>
</template>

<style scoped lang="scss">
$height: v-bind('props.height');

@mixin animation($border-color, $background-color) {
  border-color: rgba($border-color, 0.5);
  background-color: rgba($background-color, 0.2);

  &:active {
    filter: invert(1);
  }

  &:hover {
    background-color: rgba($background-color, 0.4);
    border-color: $border-color;
  }
}

.tag-container {
  transition: all 0.16s;
  height: $height;
  flex-shrink: 0;
  border: solid 1px v-bind('stylesPage.atualColor.border');
  background-color: v-bind('stylesPage.atualColor.front');
  border-radius: v-bind('props.borderRadius');
  cursor: pointer;
  user-select: none;

  & .emoji {
    margin-left: 10px;
    text-shadow: 1px 1px 0px black;
  }

  & .content {
    margin-left: 5px;
    padding-right: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-wrap: nowrap;
  }
}

.animation {
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
}

.tag-mini {
  height: $height;
  width: $height;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  // border: solid 1px v-bind('stylesPage.atualColor.border');
  // background-color: v-bind('stylesPage.atualColor.front');
  border-radius: 50px;
  cursor: pointer;
  user-select: none;

  & span {
    font-size: calc($height / 1.8);
    text-shadow: 1px 1px 0px black;
  }
}

.include {
  @include animation(rgb(86, 110, 86, 0.9), rgb(86, 140, 86, 0.4));
}

.exclude {
  @include animation(rgb(110, 86, 86, 0.9), rgb(140, 86, 86, 0.4));
}

.selected {
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
