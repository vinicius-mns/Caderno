<script setup lang="ts">
import { ref } from 'vue'
import TagEditor from '@/components/organisms/TagEditor.vue'
import { useEmoji } from '@/stores/emojis'
import WindowsSlot from '@/components/molecules/WindowsSlot.vue'
import { useWindows } from '@/stores/windows'
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import CheckIco from '@/components/atoms/icons/CheckIco.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import { useCardsTags } from '@/stores/cardsTags'

const window = useWindows()
const emojis = useEmoji()

const cardsTags = useCardsTags()

const filterEmojiName = (name: string) => {
  emojis.filterEmojiByName(name)
}

const tagUpdated = ref(window.tagEditor.props)

const tagUpdateSet = (newTag: Itag) => {
  tagUpdated.value = newTag
}

const tagUpdatedSend = async () => {
  const values = { tag: tagUpdated.value, currName: window.tagEditor.props[1] }

  console.log('enviando valores', values)

  await cardsTags.tag.update(values)

  window.tagEditor.close()
}
</script>

<template>
  <WindowsSlot
    v-if="window.tagEditor.show"
    :title="window.tagEditor.title"
    @close="window.tagEditor.close"
  >
    <FlexContainer flex-direction="column" class="tag-update">
      <TagEditor
        :tag="window.tagEditor.props"
        :emojis="emojis.allEmojis"
        @sendtag="tagUpdateSet"
        @search-emoji="filterEmojiName"
      />

      <ButtonSlot
        content="Confirmar alteração"
        class="check-button"
        @click="tagUpdatedSend"
        border-radius="50px"
      >
        <CheckIco />
      </ButtonSlot>
    </FlexContainer>
  </WindowsSlot>
</template>

<style scoped lang="scss">
.tag-update {
  padding: 15px;

  & .check-button {
    margin-top: 10px;
  }
}
</style>
