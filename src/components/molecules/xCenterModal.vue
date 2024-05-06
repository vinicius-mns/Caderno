<!-- <script setup lang="ts">
import { useStyle } from '@/stores/style'
import ThemeP from '../atoms/ThemeP.vue'
import ThemeButtonClose from '../atoms/ThemeButtonClose.vue'
import ThemeButton from '../atoms/ThemeButton.vue'
import { ref } from 'vue'

const { style } = useStyle()

const props = defineProps<{
  titleModal: string
  buttonContent: string
}>()

const visibleModal = ref(false)

const toggleVisible = () => {
  visibleModal.value = !visibleModal.value
}

defineExpose({
  toggleVisible
})
</script>

<template>
  <div>
    <ThemeButton @click="toggleVisible" class="x">{{ props.buttonContent }}</ThemeButton>
    <div class="glass" v-if="visibleModal" @click="toggleVisible">
      <div class="modal" @click.stop>
        <header>
          <ThemeP :content="props.titleModal" />
          <ThemeButtonClose @click="toggleVisible" />
        </header>
        <main>
          <slot></slot>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$boxShadow: v-bind('style.boxShadow');
$buttonSize: v-bind('style.button.size');
$buttonHoverColor: v-bind('style.color.highlight');
$buttonTextColor: v-bind('style.color.text');
$buttonBorderRadius: v-bind('style.button.borderRadius');
$buttonBgColor: v-bind('style.button.bgColor');
$modalBgColor: v-bind('style.color.background');
$headerHeight: calc($buttonSize + 2px);
$closeButton: $headerHeight;
.x {
  width: 100%;
}
.glass {
  z-index: 99999;
  width: 100%;
  height: 100dvh;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  // background: rgba(119, 119, 119, 0.5);
  backdrop-filter: blur(2px);
  // -webkit-backdrop-filter: blur(2px);
  .modal {
    max-width: 90%;
    overflow: hidden;
    background-color: $modalBgColor;
    box-shadow: 0 0 18px rgba(0, 0, 0, 0.8);
    & header {
      height: $headerHeight;
      width: 100%;
      display: flex;
      justify-content: space-between;
      & p {
        margin: 0;
        padding: 0;
        width: calc(100% - $closeButton);
        height: 100%;
        color: $buttonTextColor;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    margin-top: 20px;
    opacity: 0;
    animation: init 0.3s forwards;
  }
  @keyframes init {
    to {
      opacity: 100%;
      margin-top: 0;
    }
  }
}
</style> -->
