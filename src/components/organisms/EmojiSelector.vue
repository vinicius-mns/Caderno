<script setup lang="ts">
import { ref } from 'vue'
import FloatModalSlot from '@/components/atoms/FloatModalSlot.vue'
import ThemeButton from '../atoms/ThemeButton.vue'
import EmojiPlusIco from '../atoms/icons/EmojiPlusIco.vue'

const props = defineProps<{
  seletedEmoji: string
  emojis: string[]
}>()

const emit = defineEmits<{
  (e: 'changeEmoji', v: string): void
}>()

const modal = ref<InstanceType<typeof FloatModalSlot>>()

const sendSelected = (e: string) => {
  console.log('click', e)
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
      <div class="container">
        <ThemeButton
          v-for="(emoji, i) in props.emojis"
          :key="i"
          @click="() => sendSelected(emoji)"
          class="option"
        >
          {{ emoji }}
        </ThemeButton>
      </div>
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
  width: 290px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  .option {
    height: 50px;
    width: 50px;
    margin: 2.5px;
    font-size: 30px;
    background-color: transparent;
  }
}
</style>
