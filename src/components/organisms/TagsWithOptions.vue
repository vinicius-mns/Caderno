<script setup lang="ts">
import { ref } from 'vue'
import FloatModalSlot from '@/components/atoms/FloatModalSlot.vue'
import ModalCard from '@/components/atoms/ModalCard.vue'
import ButtonOption from '@/components/molecules/ButtonOption.vue'
import EraserIco from '@/components/atoms/icons/EraserIco.vue'
import CardCrossIco from '@/components/atoms/icons/CardCrossIco.vue'
import TrashIco from '@/components/atoms/icons/TrashIco.vue'
import PencilIco from '@/components/atoms/icons/PencilIco.vue'
import ThemeButton from '../atoms/ThemeButton.vue'
import TagView from '../molecules/TagView.vue'
import FlexContainer from '../atoms/FlexContainer.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import ThemeP from '../atoms/ThemeP.vue'

const props = defineProps<{ allTags: Itag[] }>()

const emit = defineEmits<{
  (e: 'emitTagUpdated', v: Itag): void
  (e: 'delete', v: Itag): void
  (e: 'update', v: Itag): void
  (e: 'deleteCardsWithTag', v: Itag): void
  (e: 'createTag', v: void): void
}>()

const tagTarget = ref<Itag>(['', ''])

const tagTargetSet = (v: Itag) => (tagTarget.value = v)

const modal = ref<InstanceType<typeof FloatModalSlot>>()

const modalClose = () => modal.value?.close()

const emitUpdate = () => emit('update', tagTarget.value)

const emitDelete = () => emit('delete', tagTarget.value)

const emitCreateTag = () => emit('createTag')

const emitDeleteCardsWithTag = () => emit('deleteCardsWithTag', tagTarget.value)
</script>

<template>
  <ModalCard class="container">
    <FlexContainer class="sub-container" flex-direction="column">
      <ThemeP content="Minhas tag:" class="my-tags-text" />
      <ButtonOption
        content="Criar nova Tag"
        class="button-create-tag"
        :visible="true"
        @click="emitCreateTag"
      >
        <PencilIco />
      </ButtonOption>
      <FloatModalSlot ref="modal">
        <template #button-slot>
          <FlexContainer flex-wrap="wrap">
            <ThemeButton
              class="tag"
              v-for="(tag, i) in props.allTags"
              :key="i"
              @click="() => tagTargetSet(tag)"
              background-color="front"
            >
              <TagView :tag="tag" />
            </ThemeButton>
          </FlexContainer>
        </template>
        <template #container-slot>
          <ModalCard class="options-container" @click="modalClose">
            <span>{{ tagTarget[0] }}</span>
            <ButtonOption content="Editar tag" @click="emitUpdate">
              <PencilIco />
            </ButtonOption>
            <ButtonOption content="Remover tag da cards">
              <EraserIco />
            </ButtonOption>
            <ButtonOption content="Deletar cards com tag" @click="emitDeleteCardsWithTag">
              <CardCrossIco />
            </ButtonOption>
            <ButtonOption content="Deletar tag" @click="emitDelete">
              <TrashIco />
            </ButtonOption>
          </ModalCard>
        </template>
      </FloatModalSlot>
    </FlexContainer>
  </ModalCard>
</template>

<style scoped lang="scss">
.container {
  height: 55dvh;
  width: 340px;
  & .sub-container {
    width: 100%;
    height: 100%;
    overflow: auto;
    & .my-tags-text {
      margin-left: 4px;
    }
    & .tag {
      width: calc(50% - 6px);
      margin: 3px;
    }
    & .button-create-tag {
      width: calc(100% - 6px);
      margin: 3px;
    }
    .options-container {
      width: 300px;
      display: flex;
      flex-direction: column;
      align-items: center;
      & span {
        font-size: 40px;
        text-shadow: 5px 2px 2px;
      }
    }
  }
}
</style>
