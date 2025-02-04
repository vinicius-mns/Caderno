<script setup lang="ts">
import type { Icard } from '@/stores/cards/Interfaces'
import type { Itag } from '@/stores/tags/Interfaces'

import { computed, ref } from 'vue'

import FlexContainer from '../atoms/FlexContainer.vue'
import FloatModalSlot from '../atoms/FloatModalSlot.vue'
import ModalCard from '../atoms/ModalCard.vue'
import ButtonSlot from '../molecules/ButtonSlot.vue'
import PencilIco from '../atoms/icons/PencilIco.vue'
import ShareIco from '../atoms/icons/ShareIco.vue'
import TrashIco from '../atoms/icons/TrashIco.vue'
import SearchImput from '../molecules/SearchImput.vue'
import TagView2 from '../molecules/TagView2.vue'
import CheckIco from '../atoms/icons/CheckIco.vue'
import PlusIco from '../atoms/icons/PlusIco.vue'
import ButtonCoinSlot from '../molecules/ButtonCoinSlot.vue'
import TagIco from '../atoms/icons/TagIco.vue'

const props = defineProps<{ card: Icard; allTags: Itag[] }>()

const emit = defineEmits<{
  (e: 'updateTags', v: Icard): void
  (e: 'editCard', v: Icard): void
  (e: 'deleteCard', v: Icard): void
  (e: 'shareCard', v: Icard): void
}>()

const tagsInCard = ref(props.card.tags)

// type Ishow = 'options' | 'tags'

// const useShow = () => {
//   const show = ref<Ishow>('options')

//   const showIs = (v: Ishow) => show.value === v

//   const showSet = (v: Ishow) => (show.value = v)

//   return { is: showIs, set: showSet }
// }

const buttonConfirmVisible = computed(() => {
  const isChanged = JSON.stringify(props.card.tags) !== JSON.stringify(tagsInCard.value)

  if (isChanged)
    return {
      height: '40px'
    }
  else {
    return {
      height: '0',
      border: 'none'
    }
  }
})

const addOrRemoveTag = (tag: Itag) => {
  const tagsNameSet = new Set(tagsInCard.value.map((t) => t[1]))

  if (tagsNameSet.has(tag[1])) tagsInCard.value = tagsInCard.value.filter((t) => t[1] !== tag[1])
  else tagsInCard.value = [...tagsInCard.value, tag]
}

const isChecked = (tag: Itag) => {
  return tagsInCard.value.map((t) => t[1]).includes(tag[1])
}

const updateTags = () => {
  const newCard = { ...props.card, tags: tagsInCard.value }

  emit('updateTags', newCard)
}

const editCard = () => emit('editCard', props.card)

const deleteCard = () => emit('deleteCard', props.card)

const shareCard = () => emit('shareCard', props.card)
</script>

<template>
  <FloatModalSlot>
    <template #button-slot>
      <ButtonCoinSlot content="Mais" :circle="true" class="more-button">
        <PlusIco />
      </ButtonCoinSlot>
    </template>

    <template #container-slot>
      <ModalCard class="card-options" background-color="front">
        <FlexContainer class="options-container" flex-direction="column">
          <ButtonSlot
            content="Editar Card"
            border-color="transparent"
            @click="editCard()"
            class="button-option"
          >
            <PencilIco />
          </ButtonSlot>

          <FloatModalSlot>
            <template #button-slot>
              <ButtonSlot content="Alterar tags" border-color="transparent" class="button-option">
                <TagIco />
              </ButtonSlot>
            </template>

            <template #container-slot>
              <ModalCard class="card-tags" background-color="front">
                <FlexContainer
                  class="tags-selector-container"
                  flex-direction="column"
                  align-items="end"
                >
                  <SearchImput key-id="search-tag-on-card" placeholder="Pesquisar tag" />

                  <FlexContainer flex-wrap="wrap" class="tags-area" align-items="center">
                    <TagView2
                      class="tag"
                      v-for="(tag, i) in props.allTags"
                      :key="i"
                      :tag="tag"
                      :type="isChecked(tag) ? 'include' : 'none'"
                      @click="addOrRemoveTag(tag)"
                    />
                  </FlexContainer>

                  <ButtonSlot
                    content="Confirmar alteração"
                    class="confirm-button"
                    border-radius="50px"
                    :style="buttonConfirmVisible"
                    @click="updateTags()"
                  >
                    <CheckIco />
                  </ButtonSlot>
                </FlexContainer>
              </ModalCard>
            </template>
          </FloatModalSlot>

          <ButtonSlot
            content="Compartir Card"
            border-color="transparent"
            @click="shareCard()"
            class="button-option"
          >
            <ShareIco />
          </ButtonSlot>

          <ButtonSlot
            content="Deletar Card"
            border-color="transparent"
            @click="deleteCard()"
            class="button-option"
          >
            <TrashIco />
          </ButtonSlot>
        </FlexContainer>
      </ModalCard>
    </template>
  </FloatModalSlot>
</template>

<style scoped lang="scss">
.card-options {
  width: 200px;
  height: fit-content;
  // margin: 8px;

  & .button-option {
    width: 100%;
  }

  & .card-tags {
    display: flex;
    width: 408px;
    height: 500px;
    overflow: hidden;

    & .tags-selector-container {
      overflow: hidden;

      & .tags-area {
        height: 100%;
        overflow-y: auto;
        margin-top: 8px;

        & .tag {
          width: calc(33% - 6px);
          margin: 2px;
        }
      }

      & .confirm-button {
        transition: all 0.3s;
        margin: 8px 10px 0;
        width: auto;
        border-color: rgb(41, 41, 122);
      }
    }
  }
}
</style>
