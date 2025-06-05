<script setup lang="ts">
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import FloatModalSlot from '@/components/atoms/FloatModalSlot.vue'
import FilterIco from '@/components/atoms/icons/FilterIco.vue'
import GearIco from '@/components/atoms/icons/GearIco.vue'
import PencilIco from '@/components/atoms/icons/PencilIco.vue'
import PlusIco from '@/components/atoms/icons/PlusIco.vue'
import TagIco from '@/components/atoms/icons/TagIco.vue'
import ModalCard from '@/components/atoms/ModalCard.vue'
import ButtonCoinSlot from '@/components/molecules/ButtonCoinSlot.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'

const emit = defineEmits<{
  (e: 'openFilter', v: null): void
  (e: 'openCardCreate', v: null): void
  (e: 'openTags', v: null): void
  (e: 'openConfig', v: null): void
}>()
</script>

<template>
  <div class="bottom-nav">
    <!-- <ButtonCoinSlot content="Filter" @click="emit('openFilter', null)" :invert-color="true">
      <FilterIco />
    </ButtonCoinSlot> -->

    <ButtonSlot
      content="Criar card"
      border-radius="50px"
      class="button-creat"
      :invert-color="true"
      @click="emit('openCardCreate', null)"
    >
      <PencilIco />
    </ButtonSlot>

    <ButtonCoinSlot content="Tags" @click="emit('openTags', null)">
      <TagIco />
    </ButtonCoinSlot>

    <ButtonCoinSlot content="Mais" :border="true" @click="emit('openConfig', null)">
      <PlusIco />
    </ButtonCoinSlot>

    <!-- <FloatModalSlot :closeOnClick="true" :center="true">
      <template #button-slot>
      </template>

      <template #container-slot>
        <ModalCard>
          <FlexContainer flex-direction="column" class="options-container">
            <ButtonSlot
              content="Criar tag"
              class="button-option"
              border-color="transparent"
              :invert-color="true"
              @click="emitCreateTag"
            >
              <PencilIco />
            </ButtonSlot>

            <ButtonSlot
              v-if="false"
              content="Tags"
              class="button-option"
              border-color="transparent"
              @click="() => {}"
            >
              <TagIco />
            </ButtonSlot>

            <ButtonSlot
              v-if="false"
              content="Filtrar cards"
              class="button-option"
              border-color="transparent"
              @click="() => {}"
            >
              <FilterIco />
            </ButtonSlot>

            <ButtonSlot
              content="Configurações"
              class="button-option"
              border-color="transparent"
              @click="emitConfig"
            >
              <GearIco />
            </ButtonSlot>
          </FlexContainer>
        </ModalCard>
      </template>
    </FloatModalSlot> -->
  </div>
</template>

<style scoped lang="scss">
.bottom-nav {
  display: flex;
  gap: 6px;
}
</style>
