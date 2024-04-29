<script setup lang="ts">
import { reactive, ref } from 'vue'
// import CenterModal from '../../atoms/CenterModal.vue'
import TagEditor from '../../molecules/TagEditor.vue'
import ThemeButton from '../../atoms/ThemeButton.vue'
import type { ITag } from '@/api/local'
import { useTags } from '@/stores/local/tags'
import { useCards } from '@/stores/local/cards'
import FloatModal from '@/components/molecules/FloatModal.vue'
import { useStyle } from '@/stores/style'

const tags = useTags()

const cards = useCards()

const { style } = useStyle()

const props = defineProps<{ tag: ITag }>()

const emit = defineEmits<{ (e: 'close', v: void): void }>()

const updateTag = (e: typeof props.tag) => {
  tags.updateOne(e)
  cards.tagsUseUpdateCards()
  emit('close')
}
</script>

<template>
  <FloatModal button-content="Editar tag" class="tag-editor">
    <TagEditor :tag="tag" @emit-tag="updateTag" />
  </FloatModal>
</template>

<style scoped lang="scss">
$buttonSize: v-bind('style.button.size');
.tag-editor {
  height: $buttonSize;
  width: 100%;
}
</style>
