<script setup lang="ts">
import type { Itag } from '@/stores/tags/Interfaces'
import ButtonCoinSlot from '@/components/molecules/ButtonCoinSlot.vue'
import CrossIco from '@/components/atoms/icons/CrossIco.vue'
import ThemeH1 from '@/components/atoms/ThemeH1.vue'
import TagView2 from '@/components/molecules/TagView2.vue'
import TrashIco from '@/components/atoms/icons/TrashIco.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'

const props = defineProps<{
  tag: Itag
}>()

const emit = defineEmits<{
  (e: 'tagDelete', v: Itag): void
  (e: 'close', v: null): void
}>()
</script>

<template>
  <div class="tag-delete-container">
    <header>
      <ThemeH1 content="Deletar tag" />

      <ButtonCoinSlot content="Fechar" @click="emit('close', null)">
        <CrossIco />
      </ButtonCoinSlot>
    </header>

    <TagView2 :tag="props.tag" />

    <div class="actions">
      <ButtonSlot
        content="Confirmar exclusão"
        border-radius="50px"
        :invert-color="true"
        @click="emit('tagDelete', props.tag)"
      >
        <TrashIco />
      </ButtonSlot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tag-delete-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px;
  box-sizing: border-box;

  & header {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  & .actions {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
