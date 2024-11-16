<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import TagEditor from '@/components/organisms/TagEditor.vue'
import { useTags } from '@/stores/tags/tags'
import { useEmoji } from '@/stores/emojis'
import WindowsSlot from '@/components/molecules/WindowsSlot.vue'
import { useWindows } from '@/stores/windows'
import type { Itag } from '@/stores/tags/Interfaces'
import ThemeButton from '@/components/atoms/ThemeButton.vue'
import PlusIco from '@/components/atoms/icons/PlusIco.vue'
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import SendIco from '@/components/atoms/icons/SendIco.vue'
import RemoveItemHover from '@/components/molecules/RemoveItemHover.vue'
import FloatDescription from '@/components/atoms/FloatDescription.vue'

const window = useWindows()

const tags = useTags()

const emojis = useEmoji()

const filterEmojiName = (name: string) => {
  emojis.filterEmojiByName(name)
}

const useTagsHandle = () => {
  const tagsList = ref<Itag[]>([['', '']])

  const _setTagsList = (tags: Itag[]) => (tagsList.value = tags)

  const pushTag = () => _setTagsList([...tagsList.value, ['', '']])

  const removeTag = (index: number) => {
    if (index >= 0 && index < tagsList.value.length) {
      const newList = tagsList.value.filter((_, i) => i !== index)

      _setTagsList([])

      nextTick(() => _setTagsList(newList))
    }
  }

  const setTag = (index: number, tag: Itag) => {
    const newList = tagsList.value.map((t, i) => {
      if (i === index) return tag
      else return t
    })

    _setTagsList(newList)
  }

  const createTags = async () => {
    try {
      const tagsObject = tagsList.value.map((t) => ({ emoji: t[0], name: t[1] }))

      await tags.createManyTags(tagsObject)

      window.tagCreate.close()

      _setTagsList([['', '']])
    } catch (e) {
      e instanceof Error
        ? window.errorMessage.open(e.message)
        : window.errorMessage.open('erro inesperado')
    }
  }

  return {
    tagsList,
    pushTag,
    removeTag,
    setTag,
    createTags
  }
}

const tagsHandle = useTagsHandle()

const textButton = computed(() => {
  switch (tagsHandle.tagsList.value.length) {
    case 0:
      return 'Nenhuma tag'
    case 1:
      return 'Criar tag'
    default:
      return 'Criar tags'
  }
})
</script>

<template>
  <WindowsSlot
    v-if="window.tagCreate.show"
    :title="window.tagCreate.title"
    @close="window.tagCreate.close"
  >
    <FlexContainer flex-direction="column" class="windows-container">
      <FlexContainer class="tags-area" flex-direction="column" align-items="center">
        <RemoveItemHover
          v-for="(tag, i) in tagsHandle.tagsList.value"
          :key="i"
          :id="String(i)"
          @emit-delete="(index) => tagsHandle.removeTag(Number(index))"
          class="tag-container"
        >
          <TagEditor
            :tag="tag"
            :emojis="emojis.allEmojis"
            @search-emoji="filterEmojiName"
            @sendtag="(tag: Itag) => tagsHandle.setTag(i, tag)"
          />
        </RemoveItemHover>
      </FlexContainer>

      <FlexContainer flex-direction="row" class="buttons-area">
        <ButtonSlot :content="textButton" class="button-tag" @click="tagsHandle.createTags()">
          <SendIco />
        </ButtonSlot>

        <ThemeButton
          @click="tagsHandle.pushTag()"
          class="add-tag button-tag"
          background-color="front"
        >
          <FloatDescription content="Adiocionar tag" class="description">
            <PlusIco />
          </FloatDescription>
        </ThemeButton>
      </FlexContainer>
    </FlexContainer>
  </WindowsSlot>
</template>

<style scoped lang="scss">
.windows-container {
  box-sizing: border-box;
  width: 300px;
  max-width: 95%;
  max-height: 45dvh;
  overflow: hidden;

  & .tags-area {
    padding: 0 10px;
    overflow: auto;

    & .tag-container {
      margin-bottom: 8px;
    }
  }

  & .buttons-area {
    padding: 10px;
    padding-bottom: 16px;

    & .button-tag {
      flex-shrink: 1;
      flex-grow: 0;
      width: 100%;
    }

    & .add-tag {
      height: 40px;
      width: 80px;
      margin-left: 10px;

      & .description {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
