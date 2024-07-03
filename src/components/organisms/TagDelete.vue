<script setup lang="ts">
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import TrashIco from '@/components/atoms/icons/TrashIco.vue'
import ButtonOption from '@/components/molecules/ButtonOption.vue'
import TagView from '@/components/molecules/TagView.vue'

const props = defineProps<{ tag: ITag }>()

const emit = defineEmits<{
  (emit: 'emitDelete', v: ITag): void
}>()

const deletar = () => emit('emitDelete', props.tag)
</script>

<template>
  <div class="container">
    <TagView :tag="props.tag" class="item" />
    <ButtonOption content="Deletar" @click="deletar" class="item">
      <TrashIco />
    </ButtonOption>
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
