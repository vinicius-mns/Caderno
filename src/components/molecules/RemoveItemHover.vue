<script setup lang="ts">
import { ref } from 'vue'
import ThemeButton from '../atoms/ThemeButton.vue'
import TrashIco from '../atoms/icons/TrashIco.vue'
import FloatDescription from '../atoms/FloatDescription.vue'

const props = defineProps<{
  id: string
}>()

const emit = defineEmits<{
  (e: 'emitDelete', v: string): void
}>()

const classVisibleTrash = ref('')

const onVisibleTrash = () => {
  classVisibleTrash.value = 'visible'
}

const offVisibleTrash = () => {
  classVisibleTrash.value = ''
}

const emitDelete = () => emit('emitDelete', props.id)
</script>

<template>
  <div
    class="remove-item-hover-container"
    @mouseenter="onVisibleTrash"
    @mouseleave="offVisibleTrash"
  >
    <slot></slot>

    <ThemeButton :class="[classVisibleTrash, 'delete-button']" @click="emitDelete()">
      <FloatDescription content="Remover" class="description">
        <TrashIco />
      </FloatDescription>
    </ThemeButton>
  </div>
</template>

<style scoped lang="scss">
.remove-item-hover-container {
  position: relative;
  display: flex;

  & .delete-button {
    transition: all 0.3s;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 0;
    opacity: 0;

    & .description {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 100%;
    }
  }

  & .visible {
    opacity: 100%;
    width: 30px;
    background-color: rgba(206, 35, 35, 0.61);
  }
}
</style>
