<script setup lang="ts">
import { computed, ref } from 'vue'
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'

const props = withDefaults(
  defineProps<{
    showOn?: 'click' | 'hover'
  }>(),
  {
    showOn: 'hover'
  }
)

const stylesPage = useStylesPage()

const showOptions = ref(false)

const showOptionsOn = () => (showOptions.value = true)

const showOptionsOff = () => (showOptions.value = false)

const toggleOptions = () => (showOptions.value = !showOptions.value)

const optionsClass = computed(() => {
  return showOptions.value ? '' : 'hidden'
})
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
    z-index: 1;
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
}
</style>
