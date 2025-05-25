<script setup lang="ts">
import { computed, ref } from 'vue'
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'

const props = withDefaults(
  defineProps<{
    showOn?: 'click' | 'hover' | 'always'
    height?: string
  }>(),
  {
    showOn: 'always'
  }
)

const stylesPage = useStylesPage()

const showOptions = ref(false)

const optionsClass = computed(() => {
  if (props.showOn === 'always') return ''
  if (showOptions.value) return ''
  return 'hidden'
})

const showOptionsOn = () => (showOptions.value = true)

const showOptionsOff = () => (showOptions.value = false)

const toggleOptions = () => (showOptions.value = !showOptions.value)
</script>

<template>
  <FlexContainer
    class="card-options-slot"
    flex-direction="column"
    align-items="center"
    justify-content="center"
    @mouseenter="props.showOn === 'hover' && showOptionsOn()"
    @mouseleave="props.showOn === 'hover' && showOptionsOff()"
    @click="props.showOn === 'click' && toggleOptions()"
  >
    <slot name="container" />

    <FlexContainer
      :class="['options-section', optionsClass]"
      align-items="center"
      justify-content="space-between"
    >
      <slot name="options" />
    </FlexContainer>

    <!-- <ButtonCoinSlot content="Cancelar" class="button-margin" @click="emit('remove', props.id)">
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
      </FlexContainer> -->
  </FlexContainer>
</template>

<style scoped lang="scss">
.card-options-slot {
  width: 100%;

  & .options-section {
    // background-color: v-bind('stylesPage.atualColor.border');
    // background-color: transparent;
    // height: auto;
    // height: 60px;
    // transition: all 0.3s;
    // margin-top: -6px;
    // border-radius: 0 0 8px 8px;
    // box-sizing: border-box;
    // background-color: red;
    width: 100%;

    // & .button-margin {
    //   margin-right: 4px;
    // }
  }

  & .hidden {
    opacity: 0;
    height: 0;
    overflow: hidden;
  }
}
</style>
