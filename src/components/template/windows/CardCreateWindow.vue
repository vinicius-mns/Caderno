<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref, watch, watchEffect } from 'vue'
import { useTags } from '@/stores/tags/tags'
import { useCards } from '@/stores/cards/cards'
import type { Icard } from '@/stores/cards/Interfaces'
import WindowsSlot from '@/components/molecules/WindowsSlot.vue'
import { useWindows } from '@/stores/windows'
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import ThemeButton from '@/components/atoms/ThemeButton.vue'
import PlusIco from '@/components/atoms/icons/PlusIco.vue'
import ButtonOption from '@/components/molecules/ButtonOption.vue'
import SendIco from '@/components/atoms/icons/SendIco.vue'
import FloatDescription from '@/components/atoms/FloatDescription.vue'
import CoinButton from '@/components/molecules/CoinButton.vue'
import TagSelector from '@/components/molecules/TagSelector.vue'
import PencilIco from '@/components/atoms/icons/PencilIco.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import ThemeTextArea from '@/components/atoms/ThemeTextArea.vue'
import { useStylesCard } from '@/stores/stylesCard/stylesCard'
import TrashIco from '@/components/atoms/icons/TrashIco.vue'
import FloatModalSlot from '@/components/atoms/FloatModalSlot.vue'
import AddTagIco from '@/components/atoms/icons/AddTagIco.vue'
import TagsSelectedView from '@/components/molecules/TagsSelectedView.vue'
import ThemeP from '@/components/atoms/ThemeP.vue'

const window = useWindows()

const cardStyle = useStylesCard()

const cards = useCards()

const tags = useTags()

const allTags = computed(() => tags.tags)

const useTrashWidth = () => {
  const openedValue = '30px'

  const closedValue = '0px'

  const width = ref(closedValue)

  const open = () => (width.value = openedValue)

  const close = () => (width.value = closedValue)

  return {
    width,
    open,
    close
  }
}

const useCard = () => {
  const defaultCard = reactive<Icard>({
    id: '0',
    content: '',
    date: new Date(),
    tags: []
  })

  const props = reactive<{ baseCard: Icard; cards: Icard[] }>({
    baseCard: defaultCard,
    cards: []
  })

  const setGlobalTags = (tags: Itag[]) => {
    props.baseCard = { ...props.baseCard, tags }

    if (props.cards.length <= 1) props.cards = [props.baseCard]
  }

  const push = () => {
    props.cards.push(props.baseCard)
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
    const promises = props.cards.map((c) => cards.create(c))

    await Promise.all(promises)

    await cards.atualizeReactiveCards({
      includeTags: tags.includeTags,
      excludeTags: tags.excludeTags
    })

    props.cards = [defaultCard]

    window.cardCreate.close()
  }

  return {
    props,
    defaultCard,
    setGlobalTags,
    push,
    setContent,
    setTags,
    remove,
    createAll
  }
}

const card = useCard()

const trashWidth = computed(() => card.props.cards.map(() => useTrashWidth()))

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
      <FlexContainer class="top container">
        <CoinButton description="Criar tag" :border="false" background-color="transparent">
          <PencilIco />
        </CoinButton>

        <FloatModalSlot>
          <template #button-slot>
            <CoinButton description="Adicionar tag" :border="false" background-color="transparent">
              <AddTagIco />
            </CoinButton>
          </template>

          <template #container-slot>
            <TagSelector
              :all-tags="allTags"
              :tags-selected="card.props.baseCard.tags"
              @emit-selected="card.setGlobalTags"
            />
          </template>
        </FloatModalSlot>

        <TagsSelectedView :tags-selected="card.props.baseCard.tags" />
      </FlexContainer>

      <hr class="base-width" />

      <FlexContainer
        v-for="(unicCard, i) in card.props.cards"
        :key="i"
        class="base-width card-to-create"
        flex-direction="column"
      >
        <FloatModalSlot>
          <template #button-slot>
            <FlexContainer>
              <CoinButton
                description="Adicionar tag"
                :border="false"
                background-color="transparent"
              >
                <AddTagIco />
              </CoinButton>

              <TagsSelectedView :tags-selected="card.props.cards[i].tags" />
            </FlexContainer>
          </template>

          <template #container-slot>
            <TagSelector
              :all-tags="allTags"
              :tags-selected="card.props.cards[i].tags"
              @emit-selected="(tags: Itag[]) => card.setTags(i, tags)"
            />
          </template>
        </FloatModalSlot>
        <FlexContainer @mouseenter="trashWidth[i].open" @mouseleave="trashWidth[i].close">
          <ThemeTextArea
            :id="`create-card-${i}`"
            :content="unicCard.content"
            :style="cardStyle.atualStyle"
            @emit-content="(content: string) => card.setContent(i, content)"
          />

          <ThemeButton
            background-color="front"
            class="delete-card-button"
            @click="() => card.remove(i)"
            :style="{ width: trashWidth[i].width.value }"
          >
            <TrashIco />
          </ThemeButton>
        </FlexContainer>
      </FlexContainer>
      <FlexContainer class="bottom container">
        <ThemeButton class="add-card" background-color="front" @click="card.push">
          <FloatDescription content="Adicionar novo card" class="full-content">
            <FlexContainer align-items="center" justify-content="center" class="full-content">
              <PlusIco />
            </FlexContainer>
          </FloatDescription>
        </ThemeButton>

        <ButtonOption content="Salvar" class="send-card" :visible="true" @click="card.createAll">
          <SendIco />
        </ButtonOption>
      </FlexContainer>
    </FlexContainer>
  </WindowsSlot>
</template>

<style scoped lang="scss">
.main-container {
  width: 500px;
  max-width: 96dvw;
  max-height: 80dvh;
  overflow: auto;
  & .base-width {
    width: calc(100% - 30px);
  }
  & .card-to-create {
    margin-top: 8px;
  }
  & .delete-card-button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(206, 35, 35, 0.61);
    width: 30px;
  }
  & .full-content {
    width: 100%;
    height: 100%;
  }
  & .container {
    height: 40px;
    width: calc(100% - 30px);
  }
  & .bottom {
    margin: 15px;
    & .add-card {
      width: 100%;
      height: 100%;
      margin-right: 10px;
    }
    & .send-card {
      width: 120px;
    }
  }
}
</style>
