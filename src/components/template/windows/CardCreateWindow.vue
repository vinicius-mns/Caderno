<script setup lang="ts">
import { computed, nextTick, reactive, ref, watch } from 'vue'
import { useTags } from '@/stores/tags/tags'
import { useCards } from '@/stores/cards/cards'
import type { Icard } from '@/stores/cards/Interfaces'
import WindowsSlot from '@/components/molecules/WindowsSlot.vue'
import { useWindows } from '@/stores/windows'
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import ThemeButton from '@/components/atoms/ThemeButton.vue'
import PlusIco from '@/components/atoms/icons/PlusIco.vue'
import SendIco from '@/components/atoms/icons/SendIco.vue'
import FloatDescription from '@/components/atoms/FloatDescription.vue'
import PencilIco from '@/components/atoms/icons/PencilIco.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import ThemeTextArea from '@/components/atoms/ThemeTextArea.vue'
import { useStylesCard } from '@/stores/stylesCard/stylesCard'
import FloatModalSlot from '@/components/atoms/FloatModalSlot.vue'
import ButtonCoinSlot from '@/components/molecules/ButtonCoinSlot.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import RemoveItemHover from '@/components/molecules/RemoveItemHover.vue'
import TagSelectorWithList from '@/components/organisms/TagSelectorWithList.vue'

const window = useWindows()

const cardStyle = useStylesCard()

const cards = useCards()

const tags = useTags()

const modal = ref<InstanceType<typeof FloatModalSlot>>()

const executeAndCloseModal = (callBack: () => void) => {
  callBack()

  modal.value?.close()
}

const allTags = computed(() => tags.tags)

const useCard = (closeModalCallback: typeof executeAndCloseModal) => {
  const templateCard = {
    id: '0',
    content: '',
    date: new Date(),
    tags: []
  }

  const props = reactive<{ globalTags: Itag[]; cards: Icard[] }>({
    globalTags: [],
    cards: []
  })

  const setGlobalTags = (tags: Itag[]) => {
    closeModalCallback(() => {
      props.globalTags = tags

      if (props.cards.length <= 1) props.cards = [{ ...templateCard, tags }]
    })
  }

  const push = () => {
    props.cards.push({ ...templateCard, tags: props.globalTags })
  }

  const remove = (index: number) => {
    const newCards = props.cards.filter((_, i) => i !== index)

    props.cards = []

    nextTick(() => (props.cards = newCards))
  }

  const setContent = (index: number, content: string) => {
    props.cards[index] = { ...props.cards[index], content }
  }

  const setTags = (index: number, tags: Itag[]) => {
    props.cards[index] = { ...props.cards[index], tags }
  }

  const createAll = async () => {
    try {
      await cards.createMany(props.cards)

      await cards.atualizeReactiveCards({
        includeTags: tags.includeTags,
        excludeTags: tags.excludeTags
      })

      props.cards = [{ ...templateCard, tags: props.globalTags }]

      window.cardCreate.close()
    } catch (e) {
      e instanceof Error
        ? window.errorMessage.open(e.message)
        : window.errorMessage.open('erro inesperado')
    }
  }

  return {
    props,
    setGlobalTags,
    push,
    setContent,
    setTags,
    remove,
    createAll
  }
}

const card = useCard(executeAndCloseModal)

const includeTags = computed(() => tags.includeTags)

watch(includeTags, () => card.setGlobalTags(includeTags.value), { deep: true })
</script>

<template>
  <WindowsSlot
    v-if="window.cardCreate.show"
    :title="window.cardCreate.title"
    @close="window.cardCreate.close"
  >
    <FlexContainer class="main-container" flex-direction="column" align-items="center">
      <FlexContainer class="base-width top container">
        <ButtonCoinSlot
          content="Criar tag"
          :border="false"
          background-color="transparent"
          @click="window.tagCreate.open(null)"
        >
          <PencilIco />
        </ButtonCoinSlot>

        <TagSelectorWithList
          :all-tags="allTags"
          :tags-checked="card.props.globalTags"
          @emit-selected="card.setGlobalTags"
        />
      </FlexContainer>

      <hr class="base-width" />

      <FlexContainer flex-direction="column" class="base-width cards-area">
        <RemoveItemHover
          v-for="(unicCard, i) in card.props.cards"
          :key="i"
          :id="String(i)"
          class="card-editor"
          @emit-delete="(index: string) => card.remove(Number(index))"
        >
          <TagSelectorWithList
            class="tags-selector-in-card-editor"
            :all-tags="allTags"
            :tags-checked="unicCard.tags"
            @emit-selected="(tags: Itag[]) => card.setTags(i, tags)"
          />

          <ThemeTextArea
            :id="`create-card-${i}`"
            :content="unicCard.content"
            :style="cardStyle.atualStyle"
            @emit-content="(content: string) => card.setContent(i, content)"
          />
        </RemoveItemHover>
      </FlexContainer>

      <FlexContainer class="base-width bottom-container">
        <ButtonSlot
          content="Criar cards"
          class="button-resize send-card"
          :visible="true"
          @click="card.createAll()"
        >
          <SendIco />
        </ButtonSlot>

        <ThemeButton class="button-resize add-card" background-color="front" @click="card.push">
          <FloatDescription content="Adicionar novo card" class="full-content">
            <FlexContainer align-items="center" justify-content="center" class="full-content">
              <PlusIco />
            </FlexContainer>
          </FloatDescription>
        </ThemeButton>
      </FlexContainer>
    </FlexContainer>
  </WindowsSlot>
</template>

<style scoped lang="scss">
.main-container {
  width: 500px;
  max-width: 96dvw;
  max-height: 80dvh;
  overflow: hidden;

  & .base-width {
    width: calc(100% - 30px);
  }

  & .cards-area {
    overflow-y: auto;

    & .tags-selector-in-card-editor {
      position: absolute;
      top: -41px;
    }
    & .card-editor {
      width: 100%;
      margin-top: 41px;
      margin-bottom: 10px;
    }
  }

  & .full-content {
    width: 100%;
    height: 100%;
  }

  & .bottom-container {
    height: 40px;
    margin: 15px;

    & .button-resize {
      flex-shrink: 1;
    }

    & .add-card {
      width: 80px;
      height: 100%;
      margin-left: 10px;
    }

    & .send-card {
      width: 100%;
    }
  }
}
</style>
