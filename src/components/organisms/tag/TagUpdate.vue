<script setup lang="ts">
import TagEditor from '../../molecules/TagEditor.vue'
import type { ITag } from '@/api/local'
import { useTags } from '@/stores/local/tags'
import { useCards } from '@/stores/local/cards'
import FloatModalSlot from '@/components/molecules/FloatModalSlot.vue'
import EditIco from '@/components/atoms/icons/EditIco.vue'
import OptionButton from '@/components/molecules/OptionButton.vue'

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
      <OptionButton content="Editar" class="edit-button">
        <EditIco />
      </OptionButton>
    </template>
    <template #container-slot>
      <TagEditor :tag="tag" @emit-tag="updateTag" />
    </template>
  </FloatModalSlot>
</template>

<style scoped lang="scss">
.edit-button {
  width: 100%;
}
</style>
