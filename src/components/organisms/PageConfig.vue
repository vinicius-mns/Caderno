<script setup lang="ts">
import type { IColorPage } from '@/stores/stylesPage/interfaces'
import ThemeP from '../atoms/ThemeP.vue'
import OptionContainer from '../molecules/OptionContainer.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'
import { onMounted, ref } from 'vue'
import ColorPageSelector from '../molecules/ColorPageSelector.vue'

const stylePage = useStylesPage()

const allColor = ref([] as IColorPage[])

const emit = defineEmits<{
  (e: 'emitColor', v: string): void
}>()

const emitColor = (name: string) => emit('emitColor', name)

onMounted(async () => {
  const colors = await stylePage.allColors()
  if (colors) allColor.value = colors
})
</script>

<template>
  <OptionContainer title="Page">
    <OptionContainer title="Estilo">
      <ColorPageSelector
        :all-color="allColor"
        :atual-color="stylePage.atualColor"
        @set-color-name="emitColor"
      />
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
