<script setup lang="ts">
import FlexContainer from '../atoms/FlexContainer.vue'
import ThemeButton from '../atoms/ThemeButton.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import TagView2 from '../molecules/TagView2.vue'

const props = defineProps<{
  includeTags: Itag[]
  excludeTags: Itag[]
}>()

const emit = defineEmits<{
  (e: 'includeTagRemove', v: string): void
  (e: 'excludeTagRemove', v: string): void
}>()

const includeTagRemove = (id: string) => emit('includeTagRemove', id)

const excludeTagRemove = (id: string) => emit('excludeTagRemove', id)
// :style="{ 'background-color': 'rgba(0, 255, 0, 0.1)' }"
</script>

<template>
  <FlexContainer :style="{ width: '100%', margin: '0 20px' }">
    <FlexContainer>
      <ThemeButton
        v-for="(tag, i) in props.includeTags"
        :key="i"
        class="tag include"
        @click="() => includeTagRemove(tag[1])"
      >
        <TagView2 :tag="tag" tag-emoji-size="12px" />
      </ThemeButton>
    </FlexContainer>

    <FlexContainer>
      <ThemeButton
        v-for="(tag, i) in props.excludeTags"
        :key="i"
        class="tag exclude"
        @click="() => excludeTagRemove(tag[1])"
      >
        <TagView2 :tag="tag" tag-emoji-size="12px" />
      </ThemeButton>
    </FlexContainer>
  </FlexContainer>
</template>

<style scoped lang="scss">
.tag {
  height: 32px;
  width: 120px;
  position: relative;
  display: flex;
  background-color: transparent;
  border-radius: 0;
  margin-bottom: 4px;
  &:hover {
    &::after {
      content: 'remover';
      position: absolute;
      right: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 32px;
      width: 100%;
      aspect-ratio: 1;
      font-size: 14px;
      color: white;
      background-color: rgb(255, 107, 107);
    }
  }
}
.include {
  border-bottom: solid 2px rgb(72, 134, 67);
}
.exclude {
  border-bottom: solid 2px rgb(161, 60, 60);
}
</style>
