<script setup lang="ts">
import { computed } from 'vue'
import TagEditor from '@/components/organisms/TagEditor.vue'
import { useTags } from '@/stores/tags/tags'
import { useCards } from '@/stores/cards/cards'
import { useEmoji } from '@/stores/emojis'
import WindowsSlot from '@/components/molecules/WindowsSlot.vue'
import { useWindows } from '@/stores/windows'

const window = useWindows()

const cards = useCards()

const tags = useTags()

const emojis = useEmoji()

const allEmojis = computed(() => emojis.getAll())

const tagUpdate = async (param: { emoji: string; name: string; atualName: string }) => {
  try {
    const { emoji, name, atualName } = param

    await tags.updateTag({ emoji, name, atualName })

    await cards.updateAllTags({ tag: [emoji, name], name: atualName })

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
</script>

<template>
  <WindowsSlot
    v-if="window.tagEditor.show"
    :title="window.tagEditor.title"
    @close="window.tagEditor.close"
  >
    <TagEditor :tag="window.tagEditor.props" :emojis="allEmojis" @emit-tag-updated="tagUpdate" />
  </WindowsSlot>
</template>

<style scoped lang="scss"></style>
