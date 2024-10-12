<script setup lang="ts">
import { computed, ref } from 'vue'
import TagEditor from '@/components/organisms/TagEditor.vue'
import { useTags } from '@/stores/tags/tags'
import { useCards } from '@/stores/cards/cards'
import { useEmoji } from '@/stores/emojis'
import WindowsSlot from '@/components/molecules/WindowsSlot.vue'
import { useWindows } from '@/stores/windows'
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import CheckIco from '@/components/atoms/icons/CheckIco.vue'
import type { Itag } from '@/stores/tags/Interfaces'

const window = useWindows()

const cards = useCards()

const tags = useTags()

const emojis = useEmoji()

const allEmojis = computed(() => emojis.getAll())

const useTag = () => {
  const tagRef = ref<Itag>(window.tagEditor.props)

  const setTag = (tag: Itag) => (tagRef.value = tag)

  const updateTag = async () => {
    try {
      const atualName = window.tagEditor.props[1]

      await tags.updateTag({ emoji: tagRef.value[0], name: tagRef.value[1], atualName })

      await cards.updateAllTags({ tag: tagRef.value, name: atualName })

      await cards.atualizeReactiveCards({
        includeTags: tags.includeTags,
        excludeTags: tags.excludeTags
      })

      window.tagEditor.close()
    } catch (e) {
      e instanceof Error
        ? window.errorMessage.open(e.message)
        : window.errorMessage.open('erro inesperado')
    }
  }

  return {
    tagRef,
    setTag,
    updateTag
  }
}

const tag = useTag()
</script>

<template>
  <WindowsSlot
    v-if="window.tagEditor.show"
    :title="window.tagEditor.title"
    @close="window.tagEditor.close"
  >
    <FlexContainer flex-direction="column" class="tag-update">
      <TagEditor :tag="window.tagEditor.props" :emojis="allEmojis" @sendtag="tag.setTag" />

      <ButtonSlot content="Confirmar alteração" class="check-button" @click="tag.updateTag()">
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
