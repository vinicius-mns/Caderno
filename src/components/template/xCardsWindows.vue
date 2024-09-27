<!-- <script setup lang="ts">
import { computed } from 'vue'
import CardEditor from '@/components/organisms/CardEditor.vue'
import CardDelete from '@/components/organisms/CardDelete.vue'
import TagDelete from '@/components/organisms/TagDelete.vue'
import TagEditor from '@/components/organisms/TagEditor.vue'
import CardConfig from '@/components/organisms/CardConfig.vue'
import { useConfig } from '@/stores/config'
import PageConfig from '@/components/organisms/PageConfig.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'
import { useTags } from '@/stores/tags/tags'
import { useCards } from '@/stores/cards/cards'
import type { Icard } from '@/stores/cards/Interfaces'
import type { Itag } from '@/stores/tags/Interfaces'
import TagDeleteCards from '@/components/organisms/TagDeleteCards.vue'
import { useEmoji } from '@/stores/emojis'
import WindowsSlot from '@/components/molecules/WindowsSlot.vue'
import { useWindows } from '@/stores/windows'

const style = useStylesPage()

const window = useWindows()

const cards = useCards()

const tags = useTags()

const config = useConfig()

const emojis = useEmoji()

const allEmojis = computed(() => emojis.getAll())

const cardWidth = computed(() => config.config.value.cardWidth)

const allTags = computed(() => tags.tags)

const emptyCard: Icard = { id: '', content: '', date: new Date(), tags: [] }

const updateAllCards = async () => {
  const getTagIds = (tag: Itag[]) => tag.map(({ id }) => id)
  const includeTags = getTagIds(tags.includeTags)
  const excludeTags = getTagIds(tags.excludeTags)
  await cards.init({ includeTags, excludeTags })
}

const cardAdd = async (card: Icard) => {
  await cards.create(card.content, card.tags)
  await updateAllCards()
}

const cardCreate = async (card: Icard) => {
  await cardAdd(card)
  window.cardCreate.close()
}

const cardUpdate = async (card: Icard) => {
  await cards.update(card)
  await updateAllCards()
  window.cardEdit.close()
}

const cardDelete = async (cardId: string) => {
  await cards.deleteCard(cardId)
  await updateAllCards()
  window.cardDelete.close()
}

const tagCreate = async (tag: Itag) => {
  await tags.createTag(tag.content, tag.emoji)
  window.tagCreate.close()
}

const tagUpdate = async (tag: Itag) => {
  await tags.updateTag(tag)
  await updateAllCards()
  window.tagEditor.close()
}

const tagDelete = async (tag: Itag) => {
  await tags.deletedTag(tag.id)
  await updateAllCards()
  window.tagDelete.close()
}

const deleteCardsById = async (cardIds: string[]) => {
  //tomara que eu lembre de melhorar essa funcao:
  // ela faz varias chamadas a api, mas da para melhorar para do 1 chamada
  // so preciso criar a funcao na api
  cardIds.forEach(async (id) => {
    await cards.deleteCard(id)
  })
  await updateAllCards()
  window.tagDeleteCard.close()
}

const CardChangeWidth = (n: number) => {
  config.cardChengeWidth(n)
}

const openTagCreate = () => {
  window.tagCreate.open({ content: '', emoji: '', id: '' })
}

const openCardDelete = (card: Icard) => {
  window.cardDelete.open(card)
}
</script>

<template>
  <div class="cards-windows">
    <WindowsSlot
      v-if="window.cardCreate.show"
      :title="window.cardCreate.title"
      @close="window.cardCreate.close"
    >
      <CardEditor
        type="create"
        :card="emptyCard"
        :all-tags="allTags"
        @create-tag="openTagCreate"
        @card-create="cardCreate"
        @card-add="cardAdd"
      />
    </WindowsSlot>
    <WindowsSlot
      v-if="window.cardEdit.show"
      :title="window.cardEdit.title"
      @close="window.cardEdit.close"
    >
      <CardEditor
        type="editor"
        :card="window.cardEdit.props"
        :all-tags="allTags"
        @card-update="cardUpdate"
        @card-delete="openCardDelete"
      />
    </WindowsSlot>
    <WindowsSlot
      v-if="window.cardDelete.show"
      :title="window.cardDelete.title"
      @close="window.cardDelete.close"
    >
      <CardDelete :card="window.cardDelete.props" @emit-delete-id="cardDelete" />
    </WindowsSlot>
    <WindowsSlot
      v-if="window.tagCreate.show"
      :title="window.tagCreate.title"
      @close="window.tagCreate.close"
    >
      <TagEditor :tag="window.tagCreate.props" :emojis="allEmojis" @emit-tag="tagCreate" />
    </WindowsSlot>
    <WindowsSlot
      v-if="window.tagEditor.show"
      :title="window.tagEditor.title"
      @close="window.tagEditor.close"
    >
      <TagEditor :tag="window.tagEditor.props" :emojis="allEmojis" @emit-tag="tagUpdate" />
    </WindowsSlot>
    <WindowsSlot
      v-if="window.tagDelete.show"
      :title="window.tagDelete.title"
      @close="window.tagDelete.close"
    >
      <TagDelete :tag="window.tagDelete.props" @emit-delete="tagDelete" />
    </WindowsSlot>
    <WindowsSlot
      v-if="window.tagDeleteCard.show"
      :title="window.tagDeleteCard.title"
      @close="window.tagDeleteCard.close"
    >
      <TagDeleteCards
        :cards-to-delete="window.tagDeleteCard.props.cards"
        :tag="window.tagDeleteCard.props.tag"
        @delete-cards-by-id="deleteCardsById"
      />
    </WindowsSlot>
    <WindowsSlot
      v-if="window.config.show"
      :title="window.config.title"
      @close="window.config.close"
    >
      <div class="config-container">
        <CardConfig :width="cardWidth" @emit-width="CardChangeWidth" />
        <PageConfig @emit-color="style.setColor" />
      </div>
    </WindowsSlot>
  </div>
</template>

<style scoped lang="scss">
.config-container {
  width: 800px;
  max-width: 95dvw;
  max-height: 80dvh;
  padding: 15px;
  box-sizing: border-box;
  overflow-y: auto;
}
</style> -->
