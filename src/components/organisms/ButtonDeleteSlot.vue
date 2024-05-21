<script setup lang="ts">
import FloatModalSlot from '@/components/atoms/FloatModalSlot.vue'
import ButtonOption from '@/components/molecules/ButtonOption.vue'
import TrashIco from '../atoms/icons/TrashIco.vue'
</script>

<template>
  <FloatModalSlot>
    <template #button-slot>
      <ButtonOption content="Deletar" class="delete-button">
        <TrashIco />
      </ButtonOption>
    </template>
    <template #container-slot>
      <div class="delete-container">
        <slot></slot>
        <ButtonOption content="Deletar" class="delete-button">
          <TrashIco />
        </ButtonOption>
      </div>
    </template>
  </FloatModalSlot>
</template>

<style scoped lang="scss">
.delete-button {
  display: flex;
  background-color: red;
  color: white;
}
.delete-container {
  width: 300px;
  display: flex;
  align-items: center;
  height: 300px;
  background-color: blue;
}
</style>
