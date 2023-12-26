<script setup lang="ts">
const props = defineProps<{
  title: string
  toggleShow: () => void
}>()
</script>

<template>
  <div class="modal-container">
    <div class="modal">
      <header>
        <p>{{ props.title }}</p>
        <button @click="props.toggleShow">X</button>
      </header>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal-container {
  // medidas
  width: 100%;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  // display
  display: flex;
  align-items: center;
  justify-content: center;
  // estilo
  background: rgba(255, 255, 255, 0.4);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(7.2px);
  -webkit-backdrop-filter: blur(7.2px);

  & .modal {
    width: 800px;
    height: 500px;
    background-color: red;

    & header {
      width: 100%;
      height: 30px;
      position: relative;

      display: flex;
      align-items: center;
      justify-content: center;

      background-color: blue;

      & button {
        position: absolute;
        height: 100%;
        aspect-ratio: 1;
        right: 0;
        top: 0;
      }
    }

    & .content {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
