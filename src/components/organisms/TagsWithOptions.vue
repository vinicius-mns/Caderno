<script setup lang="ts">
import { ref } from 'vue'
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import FloatModalSlot from '@/components/atoms/FloatModalSlot.vue'
import TagView from '@/components/molecules/TagView.vue'
import ModalCard from '@/components/atoms/ModalCard.vue'
import ButtonOption from '@/components/molecules/ButtonOption.vue'
import EraserIco from '@/components/atoms/icons/EraserIco.vue'
import CardCrossIco from '@/components/atoms/icons/CardCrossIco.vue'
import TrashIco from '@/components/atoms/icons/TrashIco.vue'
import PencilIco from '@/components/atoms/icons/PencilIco.vue'

const props = defineProps<{ allTags: ITag[] }>()

const emit = defineEmits<{
  (e: 'emitTag', v: ITag): void
  (e: 'delete', v: ITag): void
  (e: 'update', v: ITag): void
  (e: 'deleteCardsWithTag', v: ITag): void
}>()

const tagTarget = ref({ id: '', content: '', emoji: '' })
const tagTargetSet = (v: ITag) => (tagTarget.value = v)

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
        <div class="container-tags">
          <TagView
            v-for="(tag, i) in props.allTags"
            :key="i"
            :tag="tag"
            @emit-tag="tagTargetSet"
            class="tag"
          />
        </div>
      </template>
      <template #container-slot>
        <div @click="modalClose">
          <ModalCard class="options-container">
            <span>{{ tagTarget.emoji }}</span>
            <ButtonOption content="Editar tag" class="button" @click="emitUpdate">
              <PencilIco />
            </ButtonOption>
            <ButtonOption content="Remover tag da cards" class="button">
              <EraserIco />
            </ButtonOption>
            <ButtonOption
              content="Deletar cards com tag"
              class="button"
              @click="emitDeleteCardsWithTag"
            >
              <CardCrossIco />
            </ButtonOption>
            <ButtonOption content="Deletar tag" class="button" @click="emitDelete">
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
  .container-tags {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    & .tag {
      margin: 3px 0;
      width: 48%;
    }
  }
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
  & .button {
    margin: 3px 0;
  }
}
</style>
