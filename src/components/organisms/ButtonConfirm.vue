<script setup lang="ts">
import ThemeButton from '../atoms/ThemeButton.vue'
import ThemeP from '../atoms/ThemeP.vue'
import CheckIco from '../atoms/icons/CheckIco.vue'
</script>

<template>
  <ThemeButton class="delete-button">
    <CheckIco />
    <ThemeP content="Confirmar" />
  </ThemeButton>
</template>

<style scoped lang="scss">
.delete-button {
  display: flex;
  background-color: blue;
  color: white;
}
</style>
