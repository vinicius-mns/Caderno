<script setup lang="ts">
import { useStyle } from '@/stores/style'
import ThemeP from '../atoms/ThemeP.vue'
import ThemeButtonClose from '../atoms/ThemeButtonClose.vue'
import { ref } from 'vue'

const { atualStyle } = useStyle()

const props = defineProps<{
  titleModal: string
}>()

const emit = defineEmits<{
  (e: 'open', v: void): void
  (e: 'close', v: void): void
}>()

const showModal = ref(false)

const open = () => {
  showModal.value = true
  emit('open')
}

const close = () => {
  showModal.value = false
  emit('close')
}

defineExpose({
  open,
  close
})
</script>

<template>
  <div>
    <div class="button-modal" @click="open">
      <slot name="button-modal"></slot>
    </div>
    <div class="glass" v-if="showModal">
      <div class="modal" @click.stop>
        <header>
          <ThemeP :content="props.titleModal" />
          <ThemeButtonClose @click="close" />
        </header>
        <main>
          <slot name="center-modal"></slot>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$boxShadow: v-bind('atualStyle.boxShadow');
$buttonSize: 36px;
$buttonHoverColor: v-bind('atualStyle.color.three');
$buttonTextColor: v-bind('atualStyle.color.text');
$buttonBorderRadius: v-bind('atualStyle.borderRadius');
$buttonBgColor: v-bind('atualStyle.color.two');
$modalBgColor: v-bind('atualStyle.color.one');
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
  backdrop-filter: blur(2px);
  .modal {
    max-width: 90%;
    overflow: hidden;
    background-color: $modalBgColor;
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
</style>
