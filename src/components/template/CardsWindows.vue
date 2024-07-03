<script setup lang="ts">
import { computed } from 'vue'
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import type { ICard } from '@/api/api_local/entites/cards/CardsTypes'
import { useWindows } from '@/stores/windows'
import { useCards } from '@/stores/local/cards'
import CardEditor from '../organisms/CardEditor.vue'
import CardDelete from '../organisms/CardDelete.vue'
import TagDelete from '@/components/organisms/TagDelete.vue'
import TagEditor from '@/components/organisms/TagEditor.vue'
import TagDeleteCards from '@/components/organisms/TagDeleteCards.vue'
import { useTags } from '@/stores/local/tags'
import CardConfig from '../organisms/CardConfig.vue'
import { useConfig } from '@/stores/config'

const window = useWindows()

const cards = useCards()

const tags = useTags()

const config = useConfig()

const props = defineProps<{
  allTags: ITag[]
  allEmojis: string[]
  cardWidth: number
}>()

const card = { id: '', content: '', date: new Date(), tags: [] }

const cardsToDeleteView = computed(() => cards.filterReturn.findByTags([window.props.tagProps.id]))

const cardAdd = (card: ICard) => cards.createOne(card)

const cardCreate = (card: ICard) => {
  cards.createOne(card)
  window.close()
}

const cardUpdate = (card: ICard) => {
  cards.updateOne(card)
  window.close()
}

const cardDelete = (cardId: string) => {
  cards.deleteOne(cardId)
  window.close()
}

const tagCreate = (tag: ITag) => {
  tags.createOne(tag)
  window.close()
}

const tagUpdate = (tag: ITag) => {
  tags.updateOne(tag)
  window.close()
}

const tagDelete = (tag: ITag) => {
  tags.deleteOne(tag.id)
  window.close()
}

const tagDeleteCards = (tagId: string) => {
  cards.cardsDeleteByTag(tagId)
  window.close()
}

const CardChangeWidth = (n: number) => {
  config.cardChengeWidth(n)
}
</script>

<template>
  <div class="cards-windows">
    <CardEditor
      v-if="window.show === 'Criar card'"
      type="create"
      :card="card"
      :all-tags="props.allTags"
      @create-tag="window.open.tagCreate"
      @card-create="cardCreate"
      @card-add="cardAdd"
    />
    <CardEditor
      v-if="window.show === 'Editar card'"
      type="editor"
      :card="window.props.cardProps"
      :all-tags="props.allTags"
      @card-update="cardUpdate"
      @create-tag="window.open.tagCreate"
      @card-delete="window.open.cardDelete"
    />
    <CardDelete
      v-if="window.show === 'Deletar card'"
      :card="window.props.cardProps"
      @emit-delete-id="cardDelete"
    />
    <TagEditor
      v-if="window.show === 'Criar tag'"
      :tag="window.props.tagProps"
      :emojis="allEmojis"
      @emit-tag="tagCreate"
    />
    <TagEditor
      v-if="window.show === 'Editar tag'"
      :tag="window.props.tagProps"
      :emojis="allEmojis"
      @emit-tag="tagUpdate"
    />
    <TagDelete
      v-if="window.show === 'Deletar tag'"
      :tag="window.props.tagProps"
      @emit-delete="tagDelete"
    />
    <TagDeleteCards
      v-if="window.show === 'Deletar cards com tag'"
      :cards-to-delete-view="cardsToDeleteView"
      :tag="window.props.tagProps"
      @delete-cards-by-tag-id="tagDeleteCards"
    />
    <CardConfig
      :width="cardWidth"
      v-if="window.show === 'Configurações'"
      @emit-width="CardChangeWidth"
    />
  </div>
</template>

<style scoped lang="scss"></style>
