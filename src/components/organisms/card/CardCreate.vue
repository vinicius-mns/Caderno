<script setup lang="ts">
import { reactive } from 'vue'
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import ThemeTextArea from '@/components/atoms/ThemeTextArea.vue'
import { useStylesCard } from '@/stores/stylesCard/stylesCard'
import ButtonCoinSlot from '@/components/molecules/ButtonCoinSlot.vue'
import CrossIco from '@/components/atoms/icons/CrossIco.vue'
import TagView2 from '@/components/molecules/TagView2.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import TagSelector from '@/components/organisms/tag/TagSelector.vue'
import TagIco from '@/components/atoms/icons/TagIco.vue'
import SendIco from '@/components/atoms/icons/SendIco.vue'
import ExpandableControls from './partials/ExpandableControls.vue'
import type { Icard } from '@/stores/cards/Interfaces'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'
import PlusIco from '@/components/atoms/icons/PlusIco.vue'

const styleCard = useStylesCard()

const stylesPage = useStylesPage()

const props = defineProps<{
  content: string
  tags: Itag[]
  checkedTags: Itag[]
  id: string
}>()

const emit = defineEmits<{
  (e: 'emitContent', v: string): void
  (e: 'emitTags', v: Itag[]): void
  (e: 'remove', v: string): void
  (e: 'emitCard', v: Icard): void
}>()

// valores

const card = reactive({
  id: String(props.id),
  content: '',
  date: new Date(),
  tags: props.checkedTags
})

const errorMessage = reactive({
  show: false,
  message: ''
})

// metodos

const cardSet = {
  content: (content: string) => (card.content = content),
  tags: (tags: Itag[]) => (card.tags = tags)
}

const cardSend = {
  content: (content: string) => emit('emitContent', content),
  tags: (tags: Itag[]) => emit('emitTags', tags),
  card: (card: Icard) => {
    try {
      validateContent(card.content)
      validateTags(card.tags)

      emit('emitCard', card)
    } catch (error) {
      if (error instanceof Error) {
        openErrorMessage(error.message)
      }
    }
  }
}

const cardSetAndSend = {
  content: (content: string) => {
    cardSet.content(content)
    cardSend.content(content)
  },
  tags: (tags: Itag[]) => {
    cardSet.tags(tags)
    cardSend.tags(tags)
  }
}

const openErrorMessage = (message: string) => {
  errorMessage.message = message
  errorMessage.show = true

  setTimeout(() => (errorMessage.show = false), 1200)
}

const validateContent = (content: string) => {
  if (content.length < 3) {
    throw new Error('Escreva no card')
  }
}

const validateTags = (tags: Itag[]) => {
  if (tags.length <= 0) {
    throw new Error('Selecione alguma tag')
  }
}

const sendByEnter = (e: KeyboardEvent) => {
  if (e.ctrlKey && e.key === 'Enter') cardSend.card(card)
}
</script>

<template>
  <FlexContainer flex-direction="column" class="card-create-container">
    <ExpandableControls show-on="always">
      <template #container>
        <ThemeTextArea
          :style="styleCard.atualStyle"
          class="text-area-create-card"
          :id="`card-create-${props.id}`"
          :content="props.content"
          :max-height-px="226"
          @emit-content="cardSetAndSend.content"
          @keydown="sendByEnter"
        />
      </template>

      <template #options>
        <div class="button-section">
          <div class="tags-section">
            <TagView2
              v-for="(tag, i) in card.tags"
              class="tag"
              :tag="tag"
              :key="i"
              :mini="true"
              height="23px"
            />
          </div>

          <FlexContainer class="buttons">
            <ButtonCoinSlot content="Remover" @click="emit('remove', props.id)">
              <CrossIco />
            </ButtonCoinSlot>

            <TagSelector
              class="tag-selector"
              text-filter-tags=""
              :all-tags="props.tags"
              :tags-checked="card.tags"
              @tags-updated="cardSetAndSend.tags"
            >
              <ButtonCoinSlot content="Selecionar tags">
                <TagIco />
              </ButtonCoinSlot>
            </TagSelector>

            <ButtonSlot
              content="Criar card"
              :invert-color="true"
              border-radius="50px"
              @click="cardSend.card(card)"
            >
              <SendIco />
            </ButtonSlot>
          </FlexContainer>
        </div>
      </template>
    </ExpandableControls>

    <p :class="['message-error', errorMessage.show && 'appear']">{{ errorMessage.message }}</p>
  </FlexContainer>
</template>

<style scoped lang="scss">
.card-create-container {
  width: 100%;
  position: relative;

  & .button-section {
    width: 100%;
    height: 100%;
    display: flex;
    margin-top: 8px;
    & svg {
      height: 15px;
      aspect-ratio: 1;
    }

    & .tags-section {
      width: 100%;
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 2px;
    }

    & .buttons {
      gap: 8px;
    }
  }

  & .message-error {
    transition: all 0.2s;
    color: white;
    position: absolute;
    left: 50%;
    background-color: red;
    transform: translate(-50%, -30%);
    padding: 6px 16px;
    border-radius: 8px;
    bottom: calc(50% - 10px);
    opacity: 0;
    text-wrap: nowrap;
  }

  & .appear {
    opacity: 1;
    bottom: 50%;
  }

  animation: init 0.3s;
}

@keyframes init {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
