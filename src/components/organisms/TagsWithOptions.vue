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

const props = defineProps<{ allTags: Itag[] }>()

const emit = defineEmits<{
  (e: 'emitTagUpdated', v: Itag): void
  (e: 'delete', v: Itag): void
  (e: 'update', v: Itag): void
  (e: 'deleteCardsWithTag', v: Itag): void
}>()

const tagTarget = ref<Itag>(['', ''])

const tagTargetSet = (v: Itag) => (tagTarget.value = v)

const modal = ref<InstanceType<typeof FloatModalSlot>>()

const modalClose = () => modal.value?.close()

const emitUpdate = () => emit('update', tagTarget.value)

const emitDelete = () => emit('delete', tagTarget.value)

const emitDeleteCardsWithTag = () => emit('deleteCardsWithTag', tagTarget.value)
</script>

<template>
  <div class="container">
    <FloatModalSlot ref="modal">
      <template #button-slot>
        <FlexContainer flex-wrap="wrap">
          <ThemeButton
            v-for="(tag, i) in props.allTags"
            :key="i"
            @click="() => tagTargetSet(tag)"
            :style="{ width: 'calc(50% - 4px)', margin: '2px' }"
          >
            <TagView :tag="tag" class="tag" />
          </ThemeButton>
        </FlexContainer>
        <!-- <div class="container-tags">
        </div> -->
      </template>
      <template #container-slot>
        <div @click="modalClose">
          <ModalCard class="options-container">
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
        </div>
      </template>
    </FloatModalSlot>
  </div>
</template>

<style scoped lang="scss">
.container {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  & .tag {
    margin-left: 10px;
  }
  // .container-tags {
  //   width: 100%;
  //   height: 100%;
  //   display: flex;
  //   flex-wrap: wrap;
  //   justify-content: space-evenly;
  //   & .tag {
  //     margin: 3px 0;
  //     width: 48%;
  //   }
  // }
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
</style>
