<!-- <script setup lang="ts">
import { useStyle } from '@/stores/style'
import { ref } from 'vue'
import CrossIco from './icons/CrossIco.vue'

const props = defineProps<{ title: string }>()

const emit = defineEmits<{
  (e: 'emitClose', v: void): void
}>()

const { atualStyle } = useStyle()

const modalPositionX = ref('40dvw')
const modalPositionY = ref('35dvh')

const drag = () => {
  modalPositionX.value = '-1000px'
  modalPositionY.value = '-1000px'
}

const dragend = (e: DragEvent) => {
  modalPositionX.value = `${e.clientX - 200}px`
  modalPositionY.value = `${e.clientY - 30}px`
}
const emitClose = () => emit('emitClose')
</script>

<template>
  <div class="modal-card-container" :draggable="true" @drag="drag" @dragend="dragend">
    <div class="xx">
      <header>
        <p>{{ props.title }}</p>
        <button class="close" @click="emitClose">
          <CrossIco />
        </button>
      </header>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
$borderRadius: v-bind('atualStyle.borderRadius.two');
$buttonSize: 36px;
$cardColor: v-bind('atualStyle.color.one');
$bgColor: v-bind('atualStyle.color.two');
$boxShadow: v-bind('atualStyle.boxShadow');
.modal-card-container {
  position: fixed;
  left: v-bind(modalPositionX);
  top: v-bind(modalPositionY);

  border-radius: $borderRadius;
  box-sizing: border-box;
  background-color: $bgColor;
  border: v-bind('atualStyle.border');
  overflow: hidden;

  & header {
    height: 30px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $bgColor;
    color: v-bind('atualStyle.color.text');
    cursor: grab;
    padding: 5px 0;
    & .close {
      position: absolute;
      right: 10px;
      height: 30px;
      aspect-ratio: 1;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      color: white;
      border-radius: 8px;
      cursor: pointer;
      &:hover {
        background-color: red;
      }
    }
  }
  @media screen and (max-width: 768px) {
    padding: 0;
    left: auto;
    top: auto;
    bottom: 0;
  }
  opacity: 0;
  margin-top: 20px;
  animation: init 0.3s forwards;
}
@keyframes init {
  to {
    opacity: 100%;
    margin-top: 0;
  }
}
</style> -->
