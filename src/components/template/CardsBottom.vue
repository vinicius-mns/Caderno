<script setup lang="ts">
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import ButtonCoinSlot from '../molecules/ButtonCoinSlot.vue'
import ButtonSlot from '../molecules/ButtonSlot.vue'
import PencilIco from '../atoms/icons/PencilIco.vue'
import TagIco from '../atoms/icons/TagIco.vue'
import { useWindows } from '@/stores/windows'
import FilterIco from '../atoms/icons/FilterIco.vue'
import ModalCard from '../atoms/ModalCard.vue'
import CardTypes from '../organisms/CardTypes.vue'
import { ref } from 'vue'
import { useTags } from '@/stores/tags/tags'
import type { Icard } from '@/stores/cards/Interfaces'
import FloatDescription from '../atoms/FloatDescription.vue'
import ThemeP from '../atoms/ThemeP.vue'
import { useCardsTags } from '@/stores/cardsTags'

const tags = useTags()

const windows = useWindows()

const cardsTags = useCardsTags()

const cardCreateShow = {
  value: ref(false),
  open: () => (cardCreateShow.value.value = true),
  close: () => (cardCreateShow.value.value = false)
}

const cardCreate = async (card: Icard) => {
  const sucess = await cardsTags.card.create(card)
  if (sucess) cardCreateShow.close()
}
</script>

<template>
  <FlexContainer class="bottom-container" align-items="center" flex-direction="column">
    <ModalCard
      v-if="cardCreateShow.value.value"
      class="modal-create-card"
      :box-shadow="true"
      :intro-animation="true"
    >
      <CardTypes
        class="card"
        type="create"
        :card-props="null"
        :all-tags="tags.tags"
        @create-card="cardCreate"
        @cancel-card="cardCreateShow.close"
        @tag-create-open="windows.tagCreate.open"
      />
    </ModalCard>

    <FlexContainer class="filter-view" @click="windows.filterCardsByTags.open(null)">
      <FlexContainer flex-direction="column" class="tags-filter">
        <ThemeP class="title" content="com tags" />

        <FlexContainer>
          <FloatDescription v-for="(tag, i) in tags.includeTags" :content="tag[1]" :key="i">
            <p class="tag include">{{ tag[0] }}</p>
          </FloatDescription>
        </FlexContainer>
      </FlexContainer>

      <FlexContainer flex-direction="column" class="tags-filter">
        <ThemeP class="title" content="sem tags" />

        <FlexContainer>
          <FloatDescription v-for="(tag, i) in tags.excludeTags" :content="tag[1]" :key="i">
            <p class="tag exclude">{{ tag[0] }}</p>
          </FloatDescription>
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>

    <ModalCard class="bottom-card" :box-shadow="true">
      <FlexContainer>
        <ButtonSlot
          border-radius="50px"
          class="button-create-card button-margin"
          content="Criar card"
          @click="cardCreateShow.open"
          :invert-color="true"
        >
          <PencilIco />
        </ButtonSlot>

        <ButtonCoinSlot
          content="Tags"
          :border="true"
          class="button-margin"
          @click="windows.tags.open(null)"
        >
          <TagIco />
        </ButtonCoinSlot>

        <ButtonCoinSlot
          content="Filtrar"
          :border="true"
          class="button-margin"
          @click="windows.filterCardsByTags.open(null)"
        >
          <FilterIco />
        </ButtonCoinSlot>
      </FlexContainer>
    </ModalCard>
  </FlexContainer>
</template>

<style scoped lang="scss">
.bottom-container {
  position: fixed;
  width: 100%;
  bottom: 22px;

  & .modal-create-card {
    width: 500px;
    max-height: 90dvh;

    & .card {
      width: 100%;
    }
  }

  & .filter-view {
    cursor: pointer;

    & .tags-filter {
      margin: 0 4px;

      & .tag {
        border: solid 1px;
        border-radius: 50%;
        padding: 3px;
        margin: 0 2px;
      }

      & .title {
        margin-left: 4px;
      }

      & .include {
        border-color: blue;
      }

      & .exclude {
        border-color: red;
      }
    }
  }

  & .bottom-card {
    padding: 8px;
    border-radius: 100px;
    margin-top: 8px;

    & .button-margin {
      margin: 0 4px;
    }

    & .button-create-card {
      padding: 0 10px;
      justify-content: center;
    }
  }
}
</style>
