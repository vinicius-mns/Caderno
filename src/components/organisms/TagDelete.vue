<script setup lang="ts">
import TrashIco from '../atoms/icons/TrashIco.vue'
import ButtonSlot from '../molecules/ButtonSlot.vue'
import TagView from '../molecules/TagView.vue'
import type { Itag } from '@/stores/tags/Interfaces'

const props = defineProps<{ tag: Itag }>()

const emit = defineEmits<{
  (emit: 'delete', v: Itag): void
}>()

const deletar = () => emit('delete', props.tag)
</script>

<template>
  <div class="container">
    <TagView :tag="props.tag" class="item" />

    <ButtonSlot content="Deletar" @click="deletar" class="item">
      <TrashIco />
    </ButtonSlot>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 300px;
  max-width: 92dvw;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  box-sizing: border-box;
  & .item {
    margin: 3px;
  }
}
</style>
