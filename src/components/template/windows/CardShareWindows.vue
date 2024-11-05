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
import CardView from '@/components/molecules/CardView.vue'
import SaveIco from '@/components/atoms/icons/SaveIco.vue'

const window = useWindows()

const cardStyle = useStylesCard()

const cards = useCards()

const tags = useTags()

const modal = ref<InstanceType<typeof FloatModalSlot>>()
</script>

<template>
  <WindowsSlot
    v-if="window.cardShare.show"
    :title="window.cardShare.title"
    @close="window.cardShare.close"
  >
    <FlexContainer class="main-container" flex-direction="column" align-items="center">
      <FlexContainer class="max-w scroll" flex-direction="column" align-items="center">
        <CardView :card="window.cardShare.props" class="card" />
      </FlexContainer>
      <ButtonSlot content="Salvar" class="button">
        <SaveIco />
      </ButtonSlot>
    </FlexContainer>
  </WindowsSlot>
</template>

<style scoped lang="scss">
.main-container {
  width: 500px;
  max-width: 95dvw;
  max-height: 80dvh;
  overflow: hidden;
  padding: 15px;
  box-sizing: border-box;

  & .max-w {
    width: 100%;
  }

  & .scroll {
    overflow-y: auto;
  }

  & .card {
    width: calc(100% - 15px);
  }

  & .button {
    width: calc(100% - 15px);
    margin-top: 15px;
  }
}
</style>
