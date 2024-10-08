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
import TagSelector from '@/components/molecules/TagSelector.vue'
import PencilIco from '@/components/atoms/icons/PencilIco.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import ThemeTextArea from '@/components/atoms/ThemeTextArea.vue'
import { useStylesCard } from '@/stores/stylesCard/stylesCard'
import FloatModalSlot from '@/components/atoms/FloatModalSlot.vue'
import AddTagIco from '@/components/atoms/icons/AddTagIco.vue'
import TagsSelectedView from '@/components/molecules/TagsSelectedView.vue'
import ButtonCoinSlot from '@/components/molecules/ButtonCoinSlot.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import RemoveItemHover from '@/components/molecules/RemoveItemHover.vue'

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
    const promises = props.cards.map((c) => cards.create(c))

    await Promise.all(promises)

    await cards.atualizeReactiveCards({
      includeTags: tags.includeTags,
      excludeTags: tags.excludeTags
    })

    props.cards = [{ ...templateCard, tags: props.globalTags }]

    window.cardCreate.close()
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
      <FlexContainer class="top container">
        <ButtonCoinSlot content="Criar tag" :border="false" background-color="transparent">
          <PencilIco />
        </ButtonCoinSlot>

        <FloatModalSlot ref="modal">
          <template #button-slot>
            <ButtonCoinSlot content="Criar tag" :border="false" background-color="transparent">
              <AddTagIco />
            </ButtonCoinSlot>
          </template>

          <template #container-slot>
            <TagSelector
              :all-tags="allTags"
              :tags-selected="card.props.globalTags"
              @emit-selected="card.setGlobalTags"
            />
          </template>
        </FloatModalSlot>

        <TagsSelectedView :tags-selected="card.props.globalTags" />
      </FlexContainer>

      <hr class="base-width" />

      <RemoveItemHover
        v-for="(unicCard, i) in card.props.cards"
        :key="i"
        :id="String(i)"
        class="base-width"
        @emit-delete="(index: string) => card.remove(Number(index))"
      >
        <FlexContainer class="card-to-create" flex-direction="column">
          <FloatModalSlot ref="modalList">
            <template #button-slot>
              <FlexContainer>
                <ButtonCoinSlot
                  content="Adicionar tag"
                  :border="false"
                  background-color="transparent"
                >
                  <AddTagIco />
                </ButtonCoinSlot>

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

          <ThemeTextArea
            :id="`create-card-${i}`"
            :content="unicCard.content"
            :style="cardStyle.atualStyle"
            @emit-content="(content: string) => card.setContent(i, content)"
          />
        </FlexContainer>
      </RemoveItemHover>

      <FlexContainer class="bottom container">
        <ThemeButton class="add-card" background-color="front" @click="card.push">
          <FloatDescription content="Adicionar novo card" class="full-content">
            <FlexContainer align-items="center" justify-content="center" class="full-content">
              <PlusIco />
            </FlexContainer>
          </FloatDescription>
        </ThemeButton>

        <ButtonSlot content="Salvar" class="send-card" :visible="true" @click="card.createAll">
          <SendIco />
        </ButtonSlot>
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
    width: 100%;
    margin-top: 8px;
    position: relative;
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
