<script setup lang="ts">
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import FloatModalSlot from '@/components/atoms/FloatModalSlot.vue'
import ThemeP from '@/components/atoms/ThemeP.vue'
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
  <FloatModalSlot>
    <template #button-slot>
      <ButtonOption content="Deletar">
        <TrashIco />
      </ButtonOption>
    </template>
    <template #container-slot>
      <div class="container">
        <ThemeP content="Deseja deletar essa tag?" class="item" />
        <TagView :tag="props.tag" class="item" />
        <ButtonOption content="Deletar" @click="deletar" class="item">
          <TrashIco />
        </ButtonOption>
      </div>
    </template>
  </FloatModalSlot>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & .item {
    margin: 3px;
  }
}
</style>
