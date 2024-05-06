<script setup lang="ts">
// import CenterModal from '../../atoms/CenterModal.vue'
import TagEditor from '../../molecules/TagEditor.vue'
import ThemeButton from '../../atoms/ThemeButton.vue'
import type { ITag } from '@/api/local'
import { useTags } from '@/stores/local/tags'
import { useCards } from '@/stores/local/cards'
import FloatModalSlot from '@/components/molecules/FloatModalSlot.vue'

const tags = useTags()

const cards = useCards()

const props = defineProps<{ tag: ITag }>()

const emit = defineEmits<{ (e: 'close', v: void): void }>()

const updateTag = (e: typeof props.tag) => {
  tags.updateOne(e)
  cards.tagsUseUpdateCards()
  emit('close')
}
</script>

<template>
  <FloatModalSlot>
    <template #button-slot>
      <ThemeButton>Editar tag</ThemeButton>
    </template>
    <template #container-slot>
      <TagEditor :tag="tag" @emit-tag="updateTag" />
    </template>
  </FloatModalSlot>
</template>

<style scoped lang="scss"></style>
