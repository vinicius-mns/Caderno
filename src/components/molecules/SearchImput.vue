<script setup lang="ts">
import ThemeButton from '@/components/atoms/ThemeButton.vue'
import SearchIco from '../atoms/icons/SearchIco.vue'
import ThemeImputText from '../atoms/ThemeImputText.vue'

const props = defineProps<{ placeholder: string; keyId: string }>()

const emit = defineEmits<{
  (e: 'emitContent', v: string): void
}>()

const emitContent = (v: string) => emit('emitContent', v)
</script>

<template>
  <ThemeButton class="option-button-container">
    <div class="option-button">
      <div class="ico">
        <SearchIco />
      </div>
      <div class="text">
        <ThemeImputText
          :key-id="props.keyId"
          :placeholder="placeholder"
          @emit-content="emitContent"
        />
      </div>
    </div>
  </ThemeButton>
</template>

<style scoped lang="scss">
.option-button-container {
  width: 100%;
  height: 40px;
  flex-shrink: 0;
  flex-grow: 0;
  border: none;
  & .option-button {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    & .ico {
      flex-shrink: 0;
      height: 100%;
      width: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    & .text {
      flex-shrink: 0;
      width: calc(100% - 30px);
      height: 100%;
      display: flex;
      align-items: center;
      & p {
        padding-left: 10px;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        text-wrap: nowrap;
      }
    }
  }
}
</style>
