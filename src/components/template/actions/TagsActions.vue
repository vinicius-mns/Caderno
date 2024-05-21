<script setup lang="ts">
import FloatModalSlot from '@/components/atoms/FloatModalSlot.vue'
import TagIco from '@/components/atoms/icons/TagIco.vue'
import CoinButton from '@/components/molecules/CoinButton.vue'
import type { ITag } from '@/api/local'
import TagEditor from '@/components/organisms/TagEditor.vue'
import { useTags } from '@/stores/local/tags'
import { ref } from 'vue'
import TagDelete from '@/components/organisms/TagDelete.vue'
import TagListSlot from '@/components/organisms/TagListSlot.vue'
import TagDeleteCards from '@/components/organisms/TadDeleteCards.vue'
import { useCards } from '@/stores/local/cards'

const tags = useTags()

const cards = useCards()

const props = defineProps<{
  emojis: string[]
  allTags: ITag[]
}>()

const floatModal = ref<InstanceType<typeof FloatModalSlot>>()
const floatModalClose = () => floatModal.value?.close()

const tagInit: ITag = { content: '', id: '', emoji: '' }

const tagTarget = ref({ content: '', id: '', emoji: '' })
const tagTargetSet = (t: ITag) => (tagTarget.value = t)

const tagCreate = (t: ITag) => {
  tags.createOne(t)
  floatModalClose()
}

const tagUpdate = (t: ITag) => {
  tags.updateOne(t)
  floatModalClose()
}

const tagDelete = (t: ITag) => {
  tags.deleteOne(t.id)
  floatModalClose()
}

const TagFindCards = (t: ITag) => {
  return cards.filterReturn.findByTags(cards.cardsReturn.allCards(), [t.id])
}
</script>

<template>
  <FloatModalSlot ref="floatModal">
    <template #button-slot>
      <CoinButton description="Tags">
        <TagIco />
      </CoinButton>
    </template>
    <template #container-slot>
      <div class="container">
        <TagEditor
          content="Criar tag"
          @emit-tag="tagCreate"
          :emojis="props.emojis"
          :tag="tagInit"
          class="button"
        />
        <TagListSlot :all-tags="props.allTags" @emit-tag="tagTargetSet">
          <TagEditor
            content="Editar tag"
            @emit-tag="tagUpdate"
            :emojis="props.emojis"
            :tag="tagTarget"
          />
          <TagDelete :tag="tagTarget" @emit-delete="tagDelete" class="button" />
          <TagDeleteCards :tag="tagTarget" :cards="TagFindCards(tagTarget)" class="button" />
        </TagListSlot>
      </div>
    </template>
  </FloatModalSlot>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  & .button {
    margin: 3px 0;
  }
}
</style>
