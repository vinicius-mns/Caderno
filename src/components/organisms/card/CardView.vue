<script setup lang="ts">
import { computed, ref } from 'vue'
import CalcDate from '@/components/atoms/CalcDate.vue'
import { marked } from 'marked'
import ThemeP from '@/components/atoms/ThemeP.vue'
import FloatDescription from '@/components/atoms/FloatDescription.vue'
import { useStylesCard } from '@/stores/stylesCard/stylesCard'
import type { Icard } from '@/stores/cards/Interfaces'
import ThemeMarkown from '@/components/atoms/ThemeMarkown.vue'
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import FloatModalSlot from '@/components/atoms/FloatModalSlot.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import TagIco from '@/components/atoms/icons/TagIco.vue'
import PlusIco from '@/components/atoms/icons/PlusIco.vue'
import ButtonCoinSlot from '@/components/molecules/ButtonCoinSlot.vue'
import PencilIco from '@/components/atoms/icons/PencilIco.vue'
import TrashIco from '@/components/atoms/icons/TrashIco.vue'
import ShareIco from '@/components/atoms/icons/ShareIco.vue'
import ModalCard from '@/components/atoms/ModalCard.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import TagsSelectable from './partials/TagsSelectable.vue'
import MoreOptions from './partials/MoreOptions.vue'

const styleCard = useStylesCard()

const props = withDefaults(
  defineProps<{
    textFilterTags: string
    card: Icard
    tags: Itag[]
    textAlign?: 'justify' | 'center' | 'start'
    fontSize?: string
    hideButtonPlush?: boolean
  }>(),
  {
    fontSize: '16px',
    textAlign: 'start',
    hideButtonPlush: false
  }
)

const emit = defineEmits<{
  (e: 'tagsUpdated', v: Icard): void
  (e: 'openEditor', v: null): void
  (e: 'openDelete', v: null): void
  (e: 'searchTag', v: string): void
  (e: 'openCreateTag', v: null): void
  (e: 'clear', v: null): void
}>()

marked.setOptions({ breaks: true })

// valores

const floatModal = ref<InstanceType<typeof FloatModalSlot>>()

const viewButtonPlush = ref(false)

// metodos

const cardDate = computed(() => String(new Date(props.card.date).toLocaleDateString()))

const bottonPlush = {
  show: () => (viewButtonPlush.value = true),
  hide: () => (viewButtonPlush.value = false)
}

const closeFloatModal = () => floatModal.value.close()

// emicoes

const updatedTags = (newTags: Itag[]) => {
  const newCard = { ...props.card, tags: newTags }

  emit('tagsUpdated', newCard)

  closeFloatModal()
}

const openEditor = () => emit('openEditor', null)

const openDelete = () => emit('openDelete', null)

const searchTag = (tag: string) => emit('searchTag', tag)

const openCreateTag = (v: null) => emit('openCreateTag', v)

const clear = (v: null) => emit('clear', v)
</script>

<template>
  <MoreOptions>
    <template #container>
      <FlexContainer
        class="card-container"
        flex-direction="column"
        align-items="center"
        :style="styleCard.atualStyle"
        @mouseenter="bottonPlush.show"
        @mouseleave="bottonPlush.hide"
      >
        <header class="showHeader">
          <FloatDescription :content="cardDate">
            <CalcDate class="date-text" :date="props.card.date" />
          </FloatDescription>

          <TagsSelectable
            :all-tags="props.tags"
            :tags-checked="props.card.tags"
            :text-filter-tags="textFilterTags"
            @tags-updated="updatedTags"
            @search-tag="searchTag"
            @clear="clear"
            @open-create-tag="openCreateTag"
          >
            <FlexContainer class="tags-list-container">
              <FloatDescription
                v-for="(tag, i) in props.card.tags"
                :content="`${tag[0]} ${tag[1]}`"
                :key="i"
              >
                <ThemeP :key="i" :content="tag[0]" class="tag" />
              </FloatDescription>
            </FlexContainer>
          </TagsSelectable>
        </header>

        <div class="markdown-container">
          <ThemeMarkown :content="props.card.content" />
        </div>

        <FloatModalSlot
          :closeOnClick="true"
          v-if="viewButtonPlush && !hideButtonPlush"
          ref="floatModal"
        >
          <template #button-slot>
            <ButtonCoinSlot content="Mais" :circle="true" class="button-plus">
              <PlusIco />
            </ButtonCoinSlot>
          </template>

          <template #container-slot>
            <ModalCard class="card-options" background-color="front" flex-direction="column">
              <ButtonSlot
                content="Editar Card"
                border-color="transparent"
                class="button-option"
                @click="openEditor"
              >
                <PencilIco />
              </ButtonSlot>

              <TagsSelectable
                :all-tags="props.tags"
                :tags-checked="props.card.tags"
                :text-filter-tags="textFilterTags"
                @tags-updated="updatedTags"
                @search-tag="searchTag"
                @clear="clear"
                @open-create-tag="openCreateTag"
              >
                <ButtonSlot
                  content="Selecionar tags"
                  border-color="transparent"
                  class="button-option"
                >
                  <TagIco />
                </ButtonSlot>
              </TagsSelectable>

              <ButtonSlot content="Compartir Card" border-color="transparent" class="button-option">
                <ShareIco />
              </ButtonSlot>

              <ButtonSlot
                content="Deletar Card"
                border-color="transparent"
                class="button-option"
                @click="openDelete"
              >
                <TrashIco />
              </ButtonSlot>
            </ModalCard>
          </template>
        </FloatModalSlot>
      </FlexContainer>
    </template>

    <template #options>
      <ButtonCoinSlot content="Mais">
        <PlusIco />
      </ButtonCoinSlot>
    </template>
  </MoreOptions>
</template>

<style scoped lang="scss">
.card-container {
  width: 100%;
  height: 100%;
  height: auto;
  transition: all 0.3s;
  position: relative;

  // & .tags-selectable {
  //   width: 408px;
  //   max-width: 95dvw;
  //   max-height: 50dvh;
  // }

  & header {
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;
    padding: 2px 20px 0;
    display: flex;
    align-items: center;
    transition: all 0.3s;
    margin-top: 8px;

    & .date-text {
      width: max-content;
      font-size: 12px;
      flex-shrink: 0;
      padding: 0;
      margin: 0 10px 0 0;

      cursor: default;
    }

    & .tags-list-container {
      display: flex;
      width: 100%;
      overflow: hidden;

      & .tag {
        cursor: pointer;
        padding: 0 2px;
        font-size: 12px;
        flex-shrink: 0;

        &:hover {
          filter: grayscale(0);
        }
      }
    }
  }

  & .markdown-container {
    font-size: v-bind('props.fontSize');
    text-align: v-bind('props.textAlign');
    width: 100%;
    padding: 0 20px 4px;
    box-sizing: border-box;
    overflow-wrap: break-word;
  }

  & .button-plus {
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
</style>
