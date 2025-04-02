<script setup lang="ts">
import WindowsSlot from '@/components/molecules/WindowsSlot.vue'
import { useWindows } from '@/stores/windows'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import TrashIco from '@/components/atoms/icons/TrashIco.vue'
import TagView2 from '@/components/molecules/TagView2.vue'
import { useCardsTags } from '@/stores/cardsTags'

const window = useWindows()

const cardsTags = useCardsTags()

const tagDelete = async () => {
  const tag = window.tagDelete.props

  await cardsTags.tag.delete(tag)

  window.tagDelete.close()
}
</script>

<template>
  <WindowsSlot
    v-if="window.tagDelete.show"
    :title="window.tagDelete.title"
    @close="window.tagDelete.close"
  >
    <div class="container">
      <TagView2 :tag="window.tagDelete.props" class="item tag" :animation="false" />

      <ButtonSlot
        content="Deletar"
        @click="tagDelete"
        class="item"
        border-radius="50px"
        background-color="red"
      >
        <TrashIco />
      </ButtonSlot>
    </div>
  </WindowsSlot>
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
    width: 100%;
    margin: 3px;
  }
}
</style>
