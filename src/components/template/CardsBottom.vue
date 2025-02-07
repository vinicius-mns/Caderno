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
import { computed, onBeforeUnmount, onMounted, onUpdated, ref } from 'vue'
import { useTags } from '@/stores/tags/tags'
import type { Icard } from '@/stores/cards/Interfaces'
import FloatDescription from '../atoms/FloatDescription.vue'
import { useCardsTags } from '@/stores/cardsTags'
import GearIco from '../atoms/icons/GearIco.vue'
import SearchIco from '../atoms/icons/SearchIco.vue'
import rules from '@/stores/documentRules.json'
import PlusIco from '../atoms/icons/PlusIco.vue'
import FloatModalSlot from '../atoms/FloatModalSlot.vue'
import TagView2 from '../molecules/TagView2.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'

const stylePage = useStylesPage()

const tags = useTags()

const windows = useWindows()

const cardsTags = useCardsTags()

const isMobile = ref(false)

const filter = computed(() => {
  const on = tags.includeTags.length > 0 || tags.excludeTags.length > 0
  const both = tags.includeTags.length > 0 && tags.excludeTags.length > 0
  return { on, both }
})

const updateMobileSize = () => {
  const windowsWidth = document.documentElement.clientWidth
  const mobileWidth = parseInt(rules.window.width.mobile)
  isMobile.value = windowsWidth <= mobileWidth
}

const cardCreateShow = {
  value: ref(false),
  open: () => (cardCreateShow.value.value = true),
  close: () => (cardCreateShow.value.value = false)
}

const cardCreate = async (card: Icard) => {
  const sucess = await cardsTags.card.create(card)
  if (sucess) cardCreateShow.close()
}

onMounted(() => {
  updateMobileSize()
  window.addEventListener('resize', updateMobileSize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateMobileSize)
})
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

    <ModalCard class="filter-view" :box-shadow="true" v-show="filter.on">
      <FlexContainer @click="windows.filterCardsByTags.open(null)" align-items="center">
        <FlexContainer>
          <TagView2
            v-for="(tag, i) in tags.includeTags"
            type="include"
            class="tag"
            height="26px"
            :tag="tag"
            :content="tag[1]"
            :key="i"
            :mini="true"
          />
        </FlexContainer>

        <div class="line" v-show="filter.both"></div>

        <FlexContainer>
          <TagView2
            v-for="(tag, i) in tags.excludeTags"
            type="exclude"
            class="tag"
            height="26px"
            :tag="tag"
            :content="tag[1]"
            :key="i"
            :mini="true"
          />
        </FlexContainer>
      </FlexContainer>
    </ModalCard>

    <ModalCard class="bottom-card" :box-shadow="true">
      <FlexContainer>
        <ButtonCoinSlot
          v-if="!isMobile"
          content="Tags"
          :border="true"
          class="button-margin"
          @click="windows.tags.open(null)"
        >
          <TagIco />
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
          v-if="!isMobile"
          content="Filtrar"
          :border="true"
          class="button-margin"
          @click="windows.filterCardsByTags.open(null)"
        >
          <FilterIco />
        </ButtonCoinSlot>

        <FloatModalSlot :closeOnClick="true" :center="true">
          <template #button-slot>
            <ButtonCoinSlot content="Mais" :border="true" class="button-margin">
              <PlusIco />
            </ButtonCoinSlot>
          </template>

          <template #container-slot>
            <ModalCard>
              <FlexContainer flex-direction="column" class="options-container">
                <ButtonSlot
                  content="Criar tag"
                  class="button-option"
                  border-color="transparent"
                  :invert-color="true"
                  @click="windows.tagCreate.open(null)"
                >
                  <PencilIco />
                </ButtonSlot>

                <ButtonSlot
                  v-if="isMobile"
                  content="Tags"
                  class="button-option"
                  border-color="transparent"
                  @click="windows.tags.open(null)"
                >
                  <TagIco />
                </ButtonSlot>

                <ButtonSlot
                  v-if="isMobile"
                  content="Filtrar cards"
                  class="button-option"
                  border-color="transparent"
                  @click="windows.filterCardsByTags.open(null)"
                >
                  <FilterIco />
                </ButtonSlot>

                <ButtonSlot
                  content="Configurações"
                  class="button-option"
                  border-color="transparent"
                  @click="windows.config.open(null)"
                >
                  <GearIco />
                </ButtonSlot>
              </FlexContainer>
            </ModalCard>
          </template>
        </FloatModalSlot>
      </FlexContainer>
    </ModalCard>
  </FlexContainer>
</template>

<style scoped lang="scss">
.bottom-container {
  position: fixed;
  width: 100%;
  bottom: 12px;

  & .modal-create-card {
    width: 500px;
    max-height: 90dvh;

    & .card {
      width: 100%;
    }
  }

  & .filter-view {
    cursor: pointer;
    padding: 4px;
    border-radius: 100px;
    margin-bottom: 4px;

    & .tag {
      margin: 0 2px;
    }

    & .line {
      background-color: v-bind('stylePage.atualColor.text');
      opacity: 60%;
      width: 1px;
      border-radius: 10px;
      margin: 0 2px;
      height: 22px;
    }

    & .title {
      margin-left: 4px;
    }
  }

  & .bottom-card {
    padding: 8px;
    border-radius: 100px;

    & .button-margin {
      margin: 0 4px;
    }

    & .button-create-card {
      padding: 0 10px;
      justify-content: center;
    }

    & .options-container {
      width: 180px;

      & .button-option {
        width: 100%;
        margin: 2px 0;
      }
    }
  }
}
</style>
