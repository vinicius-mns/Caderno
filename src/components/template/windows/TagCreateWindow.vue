<script setup lang="ts">
import { computed } from 'vue'
import TagEditor from '@/components/organisms/TagEditor.vue'
import { useTags } from '@/stores/tags/tags'
import { useEmoji } from '@/stores/emojis'
import WindowsSlot from '@/components/molecules/WindowsSlot.vue'
import { useWindows } from '@/stores/windows'

const window = useWindows()

const tags = useTags()

const emojis = useEmoji()

const allEmojis = computed(() => emojis.getAll())

const tagCreate = async (param: { emoji: string; name: string; atualName: string }) => {
  const { emoji, name } = param

  try {
    await tags.createTag({ emoji, name })

    window.tagCreate.close()
  } catch (e) {
    e instanceof Error
      ? window.errorMessage.open(e.message)
      : window.errorMessage.open('erro inesperado')
  }
}
</script>

<template>
  <WindowsSlot
    v-if="window.tagCreate.show"
    :title="window.tagCreate.title"
    @close="window.tagCreate.close"
  >
    <TagEditor :tag="window.tagCreate.props" :emojis="allEmojis" @emit-tag-updated="tagCreate" />
  </WindowsSlot>
</template>

<style scoped lang="scss"></style>
