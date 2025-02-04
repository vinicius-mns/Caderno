<script setup lang="ts">
import { useTags } from '@/stores/tags/tags'
import { useCards } from '@/stores/cards/cards'
import WindowsSlot from '@/components/molecules/WindowsSlot.vue'
import { useWindows } from '@/stores/windows'
import TagView from '@/components/molecules/TagView.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import TrashIco from '@/components/atoms/icons/TrashIco.vue'

const window = useWindows()
const cards = useCards()
const tags = useTags()

const tagDelete = async () => {
  await tags.deletedTag(window.tagDelete.props[1])

  await cards.atualizeReactiveCards({
    includeTags: tags.includeTags,
    excludeTags: tags.excludeTags
  })

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
      <TagView :tag="window.tagDelete.props" class="item" />

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
    margin: 3px;
  }
}
</style>
