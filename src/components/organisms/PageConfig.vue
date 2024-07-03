<script setup lang="ts">
import ThemeP from '../atoms/ThemeP.vue'
import OptionContainer from '../molecules/OptionContainer.vue'
import PageStyleSelector from '../molecules/PageStyleSelector.vue'

const emit = defineEmits<{
  (e: 'emitStyle', v: number): void
}>()

const emitStyle = (e: number) => emit('emitStyle', e)
</script>

<template>
  <OptionContainer title="Page">
    <OptionContainer title="Estilo">
      <PageStyleSelector @emit-style="emitStyle" />
    </OptionContainer>
    <OptionContainer title="Medidas">
      <ThemeP content="nada ainda" />
    </OptionContainer>
    <OptionContainer title="Outros">
      <ThemeP content="nada ainda" />
    </OptionContainer>
  </OptionContainer>
</template>

<style scoped lang="scss"></style>
