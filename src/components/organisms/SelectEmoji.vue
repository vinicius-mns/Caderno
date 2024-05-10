<script setup lang="ts">
import EmojiSelector from '../molecules/EmojiSelector.vue'
import { ref } from 'vue'
import { useEmoji } from '@/stores/emojis'
import FloatModalSlot from '../molecules/FloatModalSlot.vue'
import ThemeButton from '../atoms/ThemeButton.vue'
import EmojiPlusIco from '../atoms/icons/EmojiPlusIco.vue'

const emojis = useEmoji()

const props = defineProps<{
  seletedEmoji: string
}>()

const emit = defineEmits<{
  (e: 'changeEmoji', v: string): void
}>()

const modal = ref<InstanceType<typeof FloatModalSlot>>()

const allEmojis = ref(emojis.getAll())

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
      <EmojiSelector
        :emojis="allEmojis"
        :emoji-selected="props.seletedEmoji"
        @change-emoji="sendSelected"
      />
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
</style>
