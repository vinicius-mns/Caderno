<script setup lang="ts">
import type { IColorPage } from '@/stores/stylesPage/interfaces'
import FlexContainer from '../atoms/FlexContainer.vue'
import ThemeP from '../atoms/ThemeP.vue'
import OptionContainer from '../molecules/OptionContainer.vue'
import RadioButton from '../molecules/RadioButton.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'
import { onMounted, ref } from 'vue'

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
      <ThemeP content="Selecione um estilo:" :style="{ margin: '5px' }" />
      <FlexContainer flex-wrap="wrap">
        <RadioButton
          v-for="(color, i) in allColor"
          :id="color.name"
          :key="i"
          name="select-color"
          :checked-value="stylePage.atualColor.name"
          @select="emitColor"
          :style="{ flex: '1 0 200px' }"
        >
          <FlexContainer flex-direction="column" :style="{ width: '100%' }">
            <ThemeP :content="color.name" :style="{ marginBottom: '5px' }" />
            <FlexContainer flex-wrap="nowrap">
              <div :style="{ backgroundColor: color.back, height: '40px', width: '100%' }"></div>
              <div :style="{ backgroundColor: color.front, height: '40px', width: '100%' }"></div>
              <div :style="{ backgroundColor: color.hover, height: '40px', width: '100%' }"></div>
              <div :style="{ backgroundColor: color.text, height: '40px', width: '100%' }"></div>
            </FlexContainer>
          </FlexContainer>
        </RadioButton>
      </FlexContainer>
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
