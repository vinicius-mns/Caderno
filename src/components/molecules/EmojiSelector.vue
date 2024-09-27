<script setup lang="ts">
import { ref } from 'vue'
import ThemeButton from '@/components/atoms/ThemeButton.vue'
import EmojiPlusIco from '@/components/atoms/icons/EmojiPlusIco.vue'
import ModalCard from '../atoms/ModalCard.vue'
import FloatModalSlot from '../atoms/FloatModalSlot.vue'

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
  <div>
    <FloatModalSlot ref="modal">
      <template #button-slot>
        <ThemeButton class="emoji-button" v-if="props.seletedEmoji">
          {{ props.seletedEmoji }}
        </ThemeButton>
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
  </div>
</template>

<style scoped lang="scss">
$buttonSize: 46px;
.emoji-button {
  font-size: calc($buttonSize / 1.8);
  width: $buttonSize;
  height: $buttonSize;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  & .emoji-plus {
    height: calc($buttonSize / 1.8);
    width: calc($buttonSize / 1.8);
  }
}

.container {
  width: 360px;
  max-width: 92%;
  height: 45dvh;
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  .option {
    height: 40px;
    width: 40px;
    margin: 2.5px;
    font-size: 30px;
    border: none;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
