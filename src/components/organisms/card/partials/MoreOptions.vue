<script setup lang="ts">
import { ref } from 'vue'
import type { Icard } from '@/stores/cards/Interfaces'
import type { Itag } from '@/stores/tags/Interfaces'
import FloatModalSlot from '@/components/atoms/FloatModalSlot.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import PlusIco from '@/components/atoms/icons/PlusIco.vue'
import PencilIco from '@/components/atoms/icons/PencilIco.vue'
import TrashIco from '@/components/atoms/icons/TrashIco.vue'
import ShareIco from '@/components/atoms/icons/ShareIco.vue'
import TagsSelectable from '@/components/organisms/card/partials/TagsSelectable.vue'
import ButtonCoinSlot from '@/components/molecules/ButtonCoinSlot.vue'
import ModalCard from '@/components/atoms/ModalCard.vue'
import TagIco from '@/components/atoms/icons/TagIco.vue'

const props = withDefaults(
  defineProps<{
    textFilterTags: string
    card: Icard
    tags: Itag[]
    hideButtonPlush?: boolean
  }>(),
  {
    hideButtonPlush: false
  }
)

const emit = defineEmits<{
  (e: 'tagsUpdated', v: Icard): void
  (e: 'openEditor', v: null): void
  (e: 'openDelete', v: null): void
  (e: 'searchTag', v: string): void
  (e: 'openCreateTag', v: null): void
  (e: 'clear', v: null): void
}>()

const floatModal = ref<InstanceType<typeof FloatModalSlot>>()
const viewButtonPlush = ref(false)

const closeFloatModal = () => floatModal.value.close()

const updatedTags = (newTags: Itag[]) => {
  const newCard = { ...props.card, tags: newTags }
  emit('tagsUpdated', newCard)
  closeFloatModal()
}

const openEditor = () => emit('openEditor', null)
const openDelete = () => emit('openDelete', null)
const searchTag = (tag: string) => emit('searchTag', tag)
const openCreateTag = (v: null) => emit('openCreateTag', v)
const clear = (v: null) => emit('clear', v)
</script>

<template>
  <FloatModalSlot :closeOnClick="true" :clickStop="true" ref="floatModal">
    <template #button-slot>
      <ButtonCoinSlot content="Mais" :circle="true" class="button-plus">
        <PlusIco />
      </ButtonCoinSlot>
    </template>

    <template #container-slot>
      <ModalCard class="card-options" background-color="front" flex-direction="column">
        <ButtonSlot
          content="Editar Card"
          border-color="transparent"
          class="button-option"
          @click="openEditor"
        >
          <PencilIco />
        </ButtonSlot>

        <TagsSelectable
          :all-tags="props.tags"
          :tags-checked="props.card.tags"
          :text-filter-tags="textFilterTags"
          @tags-updated="updatedTags"
          @search-tag="searchTag"
          @clear="clear"
          @open-create-tag="openCreateTag"
        >
          <ButtonSlot content="Selecionar tags" border-color="transparent" class="button-option">
            <TagIco />
          </ButtonSlot>
        </TagsSelectable>

        <ButtonSlot content="Compartir Card" border-color="transparent" class="button-option">
          <ShareIco />
        </ButtonSlot>

        <ButtonSlot
          content="Deletar Card"
          border-color="transparent"
          class="button-option"
          @click="openDelete"
        >
          <TrashIco />
        </ButtonSlot>
      </ModalCard>
    </template>
  </FloatModalSlot>
</template>

<style scoped lang="scss">
.card-options {
  width: 200px;
  height: fit-content;

  & .button-option {
    width: 100%;
  }
}
</style>
