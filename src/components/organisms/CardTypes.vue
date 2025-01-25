<script setup lang="ts">
import type { Icard } from '@/stores/cards/Interfaces'
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import CheckIco from '@/components/atoms/icons/CheckIco.vue'
import CrossIco from '@/components/atoms/icons/CrossIco.vue'
import PencilIco from '@/components/atoms/icons/PencilIco.vue'
import ShareIco from '@/components/atoms/icons/ShareIco.vue'
import TrashIco from '@/components/atoms/icons/TrashIco.vue'
import { useStylesCard } from '@/stores/stylesCard/stylesCard'
import ThemeTextArea from '@/components/atoms/ThemeTextArea.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import CardView from '@/components/molecules/CardView.vue'
import { nextTick, ref } from 'vue'
import ThemeH1 from '../atoms/ThemeH1.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'
import ButtonCoinSlot from '../molecules/ButtonCoinSlot.vue'
import TagIco from '../atoms/icons/TagIco.vue'
import TagSelector from './TagSelector.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import FloatModalSlot from '../atoms/FloatModalSlot.vue'
import PlusIco from '../atoms/icons/PlusIco.vue'
import ModalCard from '../atoms/ModalCard.vue'
import { v4 as uuid } from 'uuid'

const cardStyle = useStylesCard()

const stylePage = useStylesPage()

const cardEmpty: Icard = {
  id: uuid(),
  content: '',
  date: new Date(),
  tags: []
}

type ICardType = 'card' | 'create' | 'editor' | 'view' | 'delete'

const props = defineProps<{
  cardProps: Icard | null
  type: ICardType
  allTags: Itag[]
}>()

const emit = defineEmits<{
  (e: 'createCard', v: Icard): void
  (e: 'updateCard', v: Icard): void
  (e: 'cancelCard', v: Icard): void
  (e: 'deleteCard', v: Icard): void
  (e: 'tagCreateOpen', v: null): void
}>()

const viewComponent = ref(true)

const useCard = () => {
  const card = ref<Icard>(props.cardProps || cardEmpty)

  const cardSet = (newCard: Icard) => {
    card.value = newCard
  }

  return { card, set: cardSet }
}

const useCardType = () => {
  const cardType = ref<ICardType>(props.type)

  const cardTypeSet = (newType: ICardType) => (cardType.value = newType)

  const is = (type: ICardType | ICardType[]) => {
    if (Array.isArray(type)) return type.includes(cardType.value)

    return cardType.value === type
  }

  const isNot = (type: ICardType | ICardType[]) => {
    return !is(type)
  }

  return { type: cardType, set: cardTypeSet, is, isNot }
}

const useButtonMoreOptions = () => {
  const show = ref(false)

  const open = () => (show.value = true)

  const close = () => (show.value = false)

  return { show, open, close }
}

const card = useCard()

const cardEditor = useCard()

const cardType = useCardType()

const buttonMoreOptions = useButtonMoreOptions()

const cardCancel = () => {
  if (cardType.is('create')) emit('cancelCard', cardEditor.card.value)
  else cardType.set('view')
}

const sendCard = () => {
  if (cardType.is('create')) emit('createCard', cardEditor.card.value)

  if (cardType.is('editor')) emit('updateCard', cardEditor.card.value)
}

const sendTags = (tags: Itag[]) => {
  cardEditor.set({ ...cardEditor.card.value, tags })

  nextTick(sendCard)
}

const sendDelete = () => {
  console.log('delete chamado no card')
  emit('deleteCard', props.cardProps || cardEditor.card.value)
}

// const cardContentSet = () => {
//   card.set({ ...card.card.value, content: cardEditor.card.value.content })
//   cardType.set('card')
//   // showOptions.close()
// }

// const cardTagsSet = () => {
//   card.set({ ...card.card.value, tags: cardEditor.card.value.tags })
//   // cardType.set('card')
// }

// const cardEditorCancel = () => {
//   cardEditor.set(card.card.value)
//   cardType.set('view')
//   // showOptions.close()
// }
</script>

<template>
  <FlexContainer
    v-if="viewComponent"
    class="card-type-container"
    flex-direction="column"
    @mouseenter="buttonMoreOptions.open()"
    @mouseleave="buttonMoreOptions.close()"
  >
    <FloatModalSlot
      :closeOnClick="true"
      v-if="cardType.is('view') && buttonMoreOptions.show.value"
      class="more-options-container"
    >
      <template #button-slot>
        <ButtonCoinSlot content="Mais" :circle="true" class="button-more-options">
          <PlusIco />
        </ButtonCoinSlot>
      </template>

      <template #container-slot>
        <ModalCard class="card-options" background-color="front">
          <FlexContainer class="options-container" flex-direction="column">
            <ButtonSlot
              content="Editar Card"
              border-color="transparent"
              @click="cardType.set('editor')"
              class="button-option"
            >
              <PencilIco />
            </ButtonSlot>

            <ButtonSlot content="Alterar tags" border-color="transparent" class="button-option">
              <TagIco />
            </ButtonSlot>

            <ButtonSlot
              content="Compartir Card"
              border-color="transparent"
              @click="cardType.set('card')"
              class="button-option"
            >
              <ShareIco />
            </ButtonSlot>

            <ButtonSlot
              content="Deletar Card"
              border-color="transparent"
              @click="cardType.set('delete')"
              class="button-option"
            >
              <TrashIco />
            </ButtonSlot>
          </FlexContainer>
        </ModalCard>
      </template>
    </FloatModalSlot>

    <ThemeH1
      v-if="cardType.is(['create', 'editor'])"
      class="title"
      :content="cardType.is('card') ? 'Visualizando card...' : 'Criando card...'"
    />

    <ThemeTextArea
      v-if="cardType.is(['create', 'editor'])"
      class="card"
      :id="cardEditor.card.value.id"
      :content="cardEditor.card.value.content"
      :max-height-px="426"
      :style="cardStyle.atualStyle"
      @emit-content="cardEditor.set({ ...cardEditor.card.value, content: $event })"
    />

    <CardView
      v-if="cardType.is(['card', 'delete', 'view'])"
      class="card"
      :card="card.card.value"
      :font-size="cardType.isNot('view') ? 'large' : ''"
    />

    <FlexContainer class="footer" v-if="cardType.is(['editor', 'create', 'delete'])">
      <FlexContainer class="options">
        <TagSelector
          v-if="cardType.isNot('delete')"
          class="button-option"
          :all-tags="props.allTags"
          :tags-checked="cardEditor.card.value.tags"
          text-filter=""
          @emit-selected="sendTags"
          @open-create-tag="emit('tagCreateOpen', null)"
        />

        <ButtonCoinSlot
          v-if="cardType.isNot('delete')"
          content="Confirmar"
          class="button-option"
          border-radius="50px"
          @click="sendCard()"
        >
          <CheckIco />
        </ButtonCoinSlot>

        <ButtonSlot
          v-if="cardType.is('delete')"
          content="Confirmar Exclusão"
          border-radius="50px"
          class="button-option"
          background-color="red"
          @click="sendDelete()"
        >
          <TrashIco />
        </ButtonSlot>

        <ButtonCoinSlot
          content="Cancelar"
          border-radius="50px"
          class="button-option"
          @click="cardCancel()"
        >
          <CrossIco />
        </ButtonCoinSlot>
      </FlexContainer>

      <FlexContainer class="tags-container" flex-wrap="wrap" v-if="cardType.isNot('delete')">
        <span class="tag" v-for="(tag, i) in cardEditor.card.value.tags" :key="i">{{
          tag[0]
        }}</span>
      </FlexContainer>
    </FlexContainer>
  </FlexContainer>
</template>

<style scoped lang="scss">
.card-type-container {
  margin-bottom: 18px;

  & .more-options-container {
    & .button-more-options {
      position: absolute;
      right: 10px;
      top: 10px;
    }

    & .card-options {
      width: 200px;
      height: fit-content;

      & .button-option {
        width: 100%;
      }
    }
  }

  & .title {
    width: 100%;
    margin-left: 20px;
  }

  & .card {
    width: 100%;
  }

  & .footer {
    width: 100%;

    & .tags-container {
      margin-top: 6px;
      word-wrap: wrap;

      & .tag {
        margin: 4px;
      }
    }

    & .options {
      position: sticky;
      z-index: 1;
      bottom: 0;
      margin-top: 6px;

      & .button-option {
        width: auto;
        margin-right: 8px;
      }
    }
  }
}

// .card-with-options {
//   position: relative;
//   width: 100%;
//   max-width: 100%;
//   margin-bottom: 18px;

// & .title {
//   position: sticky;
//   top: 0;
//   margin-left: 10px;
//   width: max-content;
//   border-radius: 8px;
//   padding: 0 12px;
//   background-color: v-bind('stylePage.atualColor.front');
// }

// & .tag-selector-button {
//   position: absolute;
//   right: 2px;
//   top: 0;
// }
// }
</style>
