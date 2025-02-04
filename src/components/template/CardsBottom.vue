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
import { useCardsTags } from '@/stores/cardsTags'
import GearIco from '../atoms/icons/GearIco.vue'
import SearchIco from '../atoms/icons/SearchIco.vue'

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
        :search-tag="tags.textFilterTags"
        @read-tags-by-name="tags.readAllTags"
        @create-card="cardCreate"
        @cancel-card="cardCreateShow.close"
        @tag-create-open="windows.tagCreate.open"
      />
    </ModalCard>

    <FlexContainer class="filter-view" @click="windows.filterCardsByTags.open(null)">
      <FlexContainer>
        <FloatDescription v-for="(tag, i) in tags.includeTags" :content="tag[1]" :key="i">
          <p class="tag include">{{ tag[0] }}</p>
        </FloatDescription>
      </FlexContainer>

      <FlexContainer>
        <FloatDescription v-for="(tag, i) in tags.excludeTags" :content="tag[1]" :key="i">
          <p class="tag exclude">{{ tag[0] }}</p>
        </FloatDescription>
      </FlexContainer>
    </FlexContainer>

    <ModalCard class="bottom-card" :box-shadow="true">
      <FlexContainer>
        <ButtonCoinSlot content="Pesquisar card" :border="true" class="button-margin">
          <SearchIco />
        </ButtonCoinSlot>

        <ButtonCoinSlot
          content="Filtrar"
          :border="true"
          class="button-margin"
          @click="windows.filterCardsByTags.open(null)"
        >
          <FilterIco />
        </ButtonCoinSlot>

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
          content="Configurações"
          :border="true"
          class="button-margin"
          @click="windows.config.open(null)"
        >
          <GearIco />
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

    & .tag {
      border: solid 1px;
      border-radius: 50%;
      padding: 5px;
      margin: 0 2px;
    }

    & .title {
      margin-left: 4px;
    }

    & .include {
      border-color: rgba(0, 0, 255, 0.5);
      background-color: rgba(0, 0, 255, 0.2);
    }

    & .exclude {
      border-color: rgba(255, 0, 0, 0.5);
      background-color: rgba(255, 0, 0, 0.2);
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
