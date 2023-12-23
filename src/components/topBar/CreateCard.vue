<script setup lang="ts"></script>

<template>
  <div class="create-card">
    <button>
      <p>Criar novo card</p>
    </button>
  </div>
</template>

<style scoped lang="scss">
.create-card {
  // medidas
  width: 100%;
  height: 100%;
  // display
  display: flex;
  justify-content: center;
  align-items: center;

  & button {
    // medidas
    height: 32px;
    width: 94%;
    // estilo
    background-color: red;
    border: none;
    border-radius: 40px;
  }
}
</style>
