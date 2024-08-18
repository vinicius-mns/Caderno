<script setup lang="ts">
import TagsWithOptions from '../organisms/TagsWithOptions.vue'
import TagIco from '../atoms/icons/TagIco.vue'
import { useWindows } from '@/stores/windows'
import FloatModalSlot from '../atoms/FloatModalSlot.vue'
import ModalCard from '../atoms/ModalCard.vue'
import ButtonOption from '../molecules/ButtonOption.vue'
import PencilIco from '../atoms/icons/PencilIco.vue'
import GearIco from '@/components/atoms/icons/GearIco.vue'
import { useTags } from '@/stores/tags/tags'
import type { Itag } from '@/stores/tags/Interfaces'
import { computed } from 'vue'
import { useCards } from '@/stores/cards/cards'
import AddCardIco from '../atoms/icons/AddCardIco.vue'
import CardCreateIco from '../atoms/icons/CardCreateIco.vue'
import FlexContainer from '../atoms/FlexContainer.vue'

const window = useWindows()

const cards = useCards()

const tags = useTags()

const allTags = computed(() => tags.tags)

const openCardCreate = () => {
  window.cardCreate.open({ content: '', date: new Date(), id: '', tags: [] })
}

const openTagCreate = () => window.tagCreate.open(['', ''])

const openTagDelete = (tag: Itag) => window.tagDelete.open(tag)

const openTagUpdate = (tag: Itag) => window.tagEditor.open(tag)

const openTagDeleteCard = async (tag: Itag) => {
  const allCards = await cards.read({ includeTags: [tag[1]], excludeTags: [] })
  if (allCards) {
    window.tagDeleteCard.open({ tag, cards: allCards })
  }
}
</script>

<template>
  <div class="cards-bottom">
    <ButtonOption content="Configuração" @click="() => window.config.open(null)">
      <GearIco />
    </ButtonOption>
    <ButtonOption content="Criar novo card" @click="openCardCreate">
      <AddCardIco />
    </ButtonOption>
    <ButtonOption content="Criar nova tag" @click="() => window.config.open(null)">
      <PencilIco />
    </ButtonOption>
    <FloatModalSlot>
      <template #button-slot>
        <ButtonOption content="Tags">
          <TagIco />
        </ButtonOption>
      </template>
      <template #container-slot>
        <ModalCard>
          <FlexContainer :style="{ width: '360px', 'max-height': '50dvh' }" flex-direction="column">
            <ButtonOption
              content="Criar tag"
              class="input-option"
              @click="openTagCreate"
              :visible="true"
            >
              <PencilIco />
            </ButtonOption>
            <FlexContainer :style="{ width: '100%', height: '100%', overflow: 'auto' }">
              <TagsWithOptions
                :all-tags="allTags"
                @update="openTagUpdate"
                @delete="openTagDelete"
                @delete-cards-with-tag="openTagDeleteCard"
              />
            </FlexContainer>
          </FlexContainer>
        </ModalCard>
      </template>
    </FloatModalSlot>
  </div>
</template>

<style scoped lang="scss">
.cards-bottom {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  // & .modal-card {
  //   height: 60dvh;
  //   width: 360px;
  //   max-width: 95dvw;
  //   display: flex;
  //   flex-direction: column;
  //   & .input-option {
  //     margin-bottom: 5px;
  //   }
  //   & .tags {
  //     height: 100%;
  //     overflow: auto;
  //   }
  // }
}
</style>
