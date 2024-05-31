<script setup lang="ts">
import { ref } from 'vue'
import FloatModalSlot from '@/components/atoms/FloatModalSlot.vue'
import ThemeButton from '@/components/atoms/ThemeButton.vue'
import EmojiPlusIco from '@/components/atoms/icons/EmojiPlusIco.vue'
import ModalCard from '../atoms/ModalCard.vue'

const props = defineProps<{
  seletedEmoji: string
  emojis: string[]
}>()

const emit = defineEmits<{
  (e: 'changeEmoji', v: string): void
}>()

const modal = ref<InstanceType<typeof FloatModalSlot>>()

const sendSelected = (e: string) => {
  emit('changeEmoji', e)
  modal.value?.close()
}
</script>

<template>
  <FloatModalSlot ref="modal" class="container-selectemoji">
    <template #button-slot>
      <ThemeButton class="emoji-button" v-if="props.seletedEmoji">{{
        props.seletedEmoji
      }}</ThemeButton>
      <ThemeButton class="emoji-button" v-else>
        <EmojiPlusIco class="emoji-plus" />
      </ThemeButton>
    </template>
    <template #container-slot>
      <ModalCard class="container">
        <ThemeButton
          v-for="(emoji, i) in props.emojis"
          :key="i"
          @click="() => sendSelected(emoji)"
          class="option"
        >
          {{ emoji }}
        </ThemeButton>
      </ModalCard>
    </template>
  </FloatModalSlot>
</template>

<style scoped lang="scss">
$buttonSize: 36px;
.container-selectemoji {
  & .emoji-button {
    font-size: $buttonSize;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    & .emoji-plus {
      height: calc($buttonSize / 1.2);
      width: calc($buttonSize / 1.2);
    }
  }
}
.container {
  width: 300px;
  height: 48dvh;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  .option {
    height: 40px;
    width: 40px;
    margin: 2.5px;
    font-size: 30px;
    background-color: transparent;
  }
}
</style>
