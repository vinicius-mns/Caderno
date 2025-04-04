<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import ThemeTextArea from '@/components/atoms/ThemeTextArea.vue'
import { useStylesCard } from '@/stores/stylesCard/stylesCard'
import ButtonCoinSlot from '@/components/molecules/ButtonCoinSlot.vue'
import CrossIco from '@/components/atoms/icons/CrossIco.vue'
import CheckIco from '@/components/atoms/icons/CheckIco.vue'
import TagView2 from '@/components/molecules/TagView2.vue'
import type { Itag, ItagsApi } from '@/stores/tags/Interfaces'
import TagSelector from '@/components/organisms/tag/TagSelector.vue'
import PlusIco from '@/components/atoms/icons/PlusIco.vue'
import TagIco from '@/components/atoms/icons/TagIco.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'

const stylesPage = useStylesPage()
const styleCard = useStylesCard()

const props = defineProps<{
  content: string
  tags: Itag[]
  checkedTags: Itag[]
  id: number
}>()

const emit = defineEmits<{
  (e: 'emitContent', v: string): void
  (e: 'emitTags', v: Itag[]): void
  (e: 'remove', v: number): void
}>()

const showOptions = ref(false)

const showOptionsOn = () => (showOptions.value = true)

const showOptionsOff = () => (showOptions.value = false)

// const sliceBoderStyle = computed(() => {
//   return showOptions.value ? { borderRadius: '8px 8px 0 0' } : {}
// })

const optionsClass = computed(() => {
  return showOptions.value ? '' : 'hidden'
})
</script>

<template>
  <FlexContainer
    class="card-create-container"
    flex-direction="column"
    align-items="center"
    justify-content="center"
    @mouseenter="showOptionsOn"
    @mouseleave="showOptionsOff"
    @click="showOptionsOn"
  >
    <ThemeTextArea
      :style="styleCard.atualStyle"
      class="text-area-create-card"
      :id="`card-create-${props.id}`"
      :content="props.content"
      @emit-content="emit('emitContent', $event)"
      @keydown="() => {}"
    />

    <FlexContainer
      :class="['botton-section', optionsClass]"
      align-items="center"
      justify-content="space-between"
    >
      <ButtonCoinSlot content="Cancelar" class="button-margin" @click="emit('remove', props.id)">
        <CrossIco />
      </ButtonCoinSlot>

      <FlexContainer>
        <TagSelector
          class="tag-selector"
          text-filter-tags=""
          :all-tags="props.tags"
          :tags-checked="props.checkedTags"
          @tags-updated="emit('emitTags', $event)"
        >
          <ButtonCoinSlot content="Selecionar tags" class="button-margin">
            <TagIco />
          </ButtonCoinSlot>
        </TagSelector>

        <ButtonSlot
          content="Criar card"
          class="button-margin"
          border-radius="10px"
          :invert-color="true"
        >
          <PlusIco />
        </ButtonSlot>
      </FlexContainer>
    </FlexContainer>

    <FlexContainer class="tags-section" flex-wrap="wrap">
      <TagView2
        v-for="(tag, i) in props.checkedTags"
        class="tag"
        :tag="tag"
        :key="i"
        :mini="true"
      />
    </FlexContainer>

    <!-- <Transition name="appear">
      <ButtonCoinSlot
        v-if="showOptions"
        class="remove"
        content="Remover"
        @click="emit('remove', props.id)"
        background-color="red"
        size="30px"
      >
        <CrossIco />
      </ButtonCoinSlot>
    </Transition> -->
  </FlexContainer>
</template>

<style scoped lang="scss">
.card-create-container {
  width: 100%;

  & .botton-section {
    transition: all 0.3s;
    height: 60px;
    padding: 0px 8px;
    box-sizing: border-box;
    background-color: v-bind('stylesPage.atualColor.border');
    margin-top: -6px;
    width: 100%;
    border-radius: 0 0 8px 8px;

    & .button-margin {
      margin-right: 4px;
    }
  }

  & .hidden {
    opacity: 0;
    height: 0;
    overflow: hidden;
  }

  & .tags-section {
    margin-top: 4px;
    width: 100%;
  }
}
</style>
