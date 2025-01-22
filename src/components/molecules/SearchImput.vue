<script setup lang="ts">
import ThemeButton from '@/components/atoms/ThemeButton.vue'
import SearchIco from '../atoms/icons/SearchIco.vue'
import ThemeImputText from '../atoms/ThemeImputText.vue'
import FlexContainer from '../atoms/FlexContainer.vue'
import ButtonCoinSlot from './ButtonCoinSlot.vue'
import EraserIco from '../atoms/icons/EraserIco.vue'
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    placeholder: string
    keyId: string
    initContent?: string
  }>(),
  {
    initContent: ''
  }
)

const emit = defineEmits<{
  (e: 'emitContent', v: string): void
}>()

const textImput = ref<InstanceType<typeof ThemeImputText>>()

const content = ref<string>('')

const setContent = (v: string) => (content.value = v)

const emitContent = () => emit('emitContent', content.value)

const clearContent = () => {
  textImput.value?.clearContent()
  emit('emitContent', '')
}
</script>

<template>
  <ThemeButton class="option-button-container">
    <FlexContainer align-items="center" class="search-container">
      <ButtonCoinSlot
        content="Pesquisar"
        class="ico"
        @click="emitContent"
        background-color="transparent"
        border-color="transparent"
      >
        <SearchIco />
      </ButtonCoinSlot>

      <ThemeImputText
        ref="textImput"
        :init-content="props.initContent"
        class="text"
        :key-id="props.keyId"
        :placeholder="placeholder"
        @emit-content="setContent"
        @keydown.enter="emitContent"
      />

      <ButtonCoinSlot
        content="Limpar"
        class="eraser"
        background-color="transparent"
        border-color="transparent"
        @click="clearContent"
      >
        <EraserIco />
      </ButtonCoinSlot>
    </FlexContainer>
  </ThemeButton>
</template>

<style scoped lang="scss">
.option-button-container {
  height: 36px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  border-radius: 50px;
  overflow: hidden;

  & .search-container {
    width: 100%;

    & .ico {
      position: absolute;
      left: 5px;
    }

    & .text {
      flex-grow: 1;
      flex-shrink: 0;
      height: 40px;
      width: 100%;
      padding: 0 50px;
    }

    & .eraser {
      opacity: 40%;
      position: absolute;
      right: 5px;

      &:hover {
        opacity: 100%;
      }
    }
  }
}
//   width: 100%;
//   height: 40px;
//   flex-shrink: 0;
//   flex-grow: 0;
//   border: none;
//   & .option-button {
//     height: 100%;
//     width: 100%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     & .ico {
//       flex-shrink: 0;
//       height: 100%;
//       width: 30px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//     }
//     & .text {
//       flex-shrink: 0;
//       width: calc(100% - 30px);
//       height: 100%;
//       display: flex;
//       align-items: center;
//       & p {
//         padding-left: 10px;
//         font-size: 14px;
//         overflow: hidden;
//         text-overflow: ellipsis;
//         text-wrap: nowrap;
//       }
//     }
//   }
// }
</style>
