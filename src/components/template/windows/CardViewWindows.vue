<script setup lang="ts">
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import CheckIco from '@/components/atoms/icons/CheckIco.vue'
import CrossIco from '@/components/atoms/icons/CrossIco.vue'
import PencilIco from '@/components/atoms/icons/PencilIco.vue'
import ShareIco from '@/components/atoms/icons/ShareIco.vue'
import TrashIco from '@/components/atoms/icons/TrashIco.vue'
import ThemeMarkown from '@/components/atoms/ThemeMarkown.vue'
import ThemeTextArea from '@/components/atoms/ThemeTextArea.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import CardView from '@/components/molecules/CardView.vue'
import SearchImput from '@/components/molecules/SearchImput.vue'
import TagView2 from '@/components/molecules/TagView2.vue'
import WindowsSlot from '@/components/molecules/WindowsSlot.vue'
import CardEditor from '@/components/organisms/CardEditor.vue'
import CardTypes from '@/components/organisms/CardTypes.vue'
import { useCards } from '@/stores/cards/cards'
import { useStylesCard } from '@/stores/stylesCard/stylesCard'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'
import type { Itag } from '@/stores/tags/Interfaces'
import { useTags } from '@/stores/tags/tags'
import { useWindows } from '@/stores/windows'
import { computed, ref } from 'vue'

const stylesPage = useStylesPage()

const cardStyle = useStylesCard()

const windows = useWindows()

const tags = useTags()

const cards = useCards()

const allTags = computed(() => tags.tags)

const card = computed(() => windows.cardView.props)

const tagsInCard = computed(() => windows.cardView.props.tags)

const isChecked = (tag: Itag) => {
  return tagsInCard.value.map((t) => t[1]).includes(tag[1])
}
</script>

<template>
  <WindowsSlot
    class="card-view-windows"
    :title="windows.cardView.title"
    @close="windows.cardView.close()"
    v-if="windows.cardView.show"
  >
    <FlexContainer class="main-container" justify-content="space-evenly">
      <FlexContainer class="card-side side" flex-direction="column" align-items="center">
        <CardTypes :card-props="card" class="card" />
      </FlexContainer>

      <FlexContainer class="tags-side side" flex-direction="column" align-items="end">
        <SearchImput class="search-tags" key-id="search-tag-on-card" placeholder="Pesquisar tag" />

        <FlexContainer flex-wrap="wrap" class="tags-area" align-items="center">
          <TagView2
            class="tag"
            v-for="(tag, i) in allTags"
            :key="i"
            :tag="tag"
            :type="isChecked(tag) ? 'include' : 'none'"
            @click="() => {}"
          />
        </FlexContainer>

        <ButtonSlot
          content="Confirmar alteração"
          class="confirm-button"
          border-radius="50px"
          @click="() => {}"
        >
          <CheckIco />
        </ButtonSlot>
      </FlexContainer>
    </FlexContainer>
  </WindowsSlot>
</template>

<style scoped lang="scss">
.main-container {
  width: 1224px;
  max-width: 95dvw;
  height: 80dvh;
  box-sizing: border-box;
  padding-bottom: 60px;

  & .side {
    height: 100%;
    overflow-y: auto;
  }

  & .card-side {
    padding: 0 8px;
    width: 610px;

    & .card {
      width: 600px;
    }
    // width: 100%;
  }

  & .tags-side {
    width: 350px;
    flex-shrink: 0;

    & .search-tags {
      width: 100%;
    }

    & .tags-area {
      width: 100%;
      overflow-y: auto;
      margin-top: 8px;

      & .tag {
        width: calc(33% - 6px);
        margin: 2px;
      }
    }

    & .confirm-button {
      transition: all 0.3s;
      margin-top: 8px;
      width: auto;
      border-color: rgb(41, 41, 122);
    }
  }

  // & .card-side {
  // width: 500px;
  // overflow-y: auto;
  // background-color: blue;
  // padding: 8px;
  // box-sizing: border-box;
  // width: 100%;
  // height: 100%;
  // flex-shrink: 0;
  // }

  // & .right-side {
  // width: 500px;
  // overflow-y: auto;
  // background-color: green;
  // padding: 8px;
  // box-sizing: border-box;
  // background-color: green;
  // padding: 8px;
  // box-sizing: border-box;
  // width: 400px;

  // & .tags-selector-container {
  //   overflow: hidden;

  //   & .tags-area {
  //     height: 100%;
  //     overflow-y: auto;
  //     margin-top: 8px;

  //     & .tag {
  //       width: calc(33% - 6px);
  //       margin: 2px;
  //     }
  //   }

  //   & .confirm-button {
  //     transition: all 0.3s;
  //     margin: 8px 10px 8px;
  //     width: auto;
  //     border-color: rgb(41, 41, 122);
  //   }
  // }
  // }
}
</style>
