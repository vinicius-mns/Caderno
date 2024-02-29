<script setup lang="ts">
import { useStyle } from '@/stores/style'
import InputTextAtom from '../atoms/InputTextAtom.vue'
import type { ITag } from '@/api/local'

const { style } = useStyle()

const props = defineProps<{
  searchTag: string
  tags: ITag[]
  keyId: string
}>()

const emit = defineEmits<{
  (e: 'filtredTags', v: ITag[]): void
}>()

const filter = (text: string) => {
  const lower = (str: string) => str.toLocaleLowerCase()
  const tagFiltred = props.tags.filter((tag) => lower(tag.content).includes(lower(text)))
  return tagFiltred
}

const emitFiltredTags = () => {
  const text = props.searchTag
  const filtredTags = filter(text)
  emit('filtredTags', filtredTags)
}
</script>

<template>
  <div class="search-by-text">
    <span>🔎</span>
    <InputTextAtom
      placeholder="Pesquisar tag"
      :content="props.searchTag"
      :key-id="props.keyId"
      @emit-content="emitFiltredTags"
      class="text-input"
    />
  </div>
</template>

<style scoped lang="scss">
$buttonSize: v-bind('style.button.size');
$margin: 5px;
.search-by-text {
  position: relative;
  height: $buttonSize;
  width: 100%;
  display: flex;
  align-items: center;
  // margin: $margin 0 $margin;
  & span {
    position: absolute;
    left: $margin;
  }
  & .text-input {
    width: 100%;
    padding-left: calc($margin * 6);
  }
}
</style>
