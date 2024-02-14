<script setup lang="ts">
import { useStyle } from '@/stores/style'

const { style } = useStyle()

const props = defineProps<{
  titleModal: string
}>()

const emit = defineEmits<{
  (e: 'close', v: null): void
}>()
</script>

<template>
  <div class="glass" @click="() => emit('close', null)">
    <div class="modal" @click.stop>
      <header>
        <p>{{ props.titleModal }}</p>
        <button class="close-modal-button" @click="() => emit('close', null)">
          <p>x</p>
        </button>
      </header>
      <main>
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<style scoped lang="scss">
$boxShadow: v-bind('style.boxShadow');
$buttonSize: v-bind('style.button.size');
$buttonHoverColor: v-bind('style.button.hoverColor');
$buttonTextColor: v-bind('style.button.textColor');
$buttonBorderRadius: v-bind('style.button.borderRadius');
$buttonBgColor: v-bind('style.button.bgColor');
$modalBgColor: v-bind('style.component.bgColor');
$headerHeight: calc($buttonSize + 2px);
$closeButton: $headerHeight;
.glass {
  width: 100%;
  height: 100dvh;
  position: fixed;
  z-index: 99999;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(123, 123, 123, 0.2);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  color: white;
  .modal {
    max-width: 90%;
    border-radius: 8px;
    overflow: hidden;
    background-color: $modalBgColor;
    box-shadow: $boxShadow;
    & header {
      height: $headerHeight;
      width: 100%;
      display: flex;
      justify-content: space-between;
      & p {
        width: calc(100% - $closeButton);
        height: 100%;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      & .close-modal-button {
        height: $closeButton;
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        background-color: transparent;
        cursor: pointer;
        &:hover {
          background-color: rgba(255, 0, 0, 0.345);
          overflow: hidden;
        }
      }
    }
  }
}
</style>
