<script setup lang="ts">
import { reactive, ref } from 'vue'
import ThemeImputText from '@/components/atoms/ThemeImputText.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import FloatModalSlot from '../atoms/FloatModalSlot.vue'
import EmojiPlusIco from '../atoms/icons/EmojiPlusIco.vue'
import ModalCard from '../atoms/ModalCard.vue'
import ButtonCoinSlot from '../molecules/ButtonCoinSlot.vue'
import ThemeP from '../atoms/ThemeP.vue'
import SearchImput from '../molecules/SearchImput.vue'
import FlexContainer from '../atoms/FlexContainer.vue'

const props = defineProps<{
  tag: Itag
  emojis: string[]
}>()

const emit = defineEmits<{
  (e: 'sendtag', v: Itag): void
  (e: 'searchEmoji', v: string): void
}>()

const modal = ref<InstanceType<typeof FloatModalSlot>>()

const closeModal = () => modal.value?.close()

const tagReative = reactive({
  emoji: props.tag[0],
  name: props.tag[1],
  atualName: props.tag[1]
})

const sendtag = () => {
  emit('sendtag', [tagReative.emoji, tagReative.name])
}

const nameSetAndSend = (name: string) => {
  tagReative.name = name
  sendtag()
}

const emojiSetAndSend = (emoji: string) => {
  tagReative.emoji = emoji
  sendtag()
  closeModal()
}

const searchEmoji = (v: string) => {
  emit('searchEmoji', v)
}
</script>

<template>
  <div class="tag-editor-container">
    <FloatModalSlot ref="modal">
      <template #button-slot>
        <ButtonCoinSlot content="Selecionar emoji" v-if="tagReative.emoji" :circle="true">
          <ThemeP :content="tagReative.emoji" class="emoji" />
        </ButtonCoinSlot>

        <ButtonCoinSlot content="Selecionar emoji" v-else :circle="true">
          <EmojiPlusIco class="emoji" />
        </ButtonCoinSlot>
      </template>

      <template #container-slot>
        <ModalCard class="modal-container">
          <SearchImput
            key-id="search-emoji"
            placeholder="Pesquisar emoji"
            class="search-emoji"
            @emit-content="searchEmoji"
          />

          <FlexContainer flex-wrap="wrap" class="tags-list">
            <p
              v-for="(emoji, i) in props.emojis"
              :key="i"
              @click="() => emojiSetAndSend(emoji)"
              class="option"
            >
              {{ emoji }}
            </p>
          </FlexContainer>
        </ModalCard>
      </template>
    </FloatModalSlot>

    <ThemeImputText
      @emit-content="nameSetAndSend"
      :init-content="tagReative.name"
      key-id="tag-editor"
      placeholder="Nome da tag"
      class="imput-text"
    />
  </div>
</template>

<style scoped lang="scss">
.tag-editor-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & .emoji {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    height: 24px;
    width: 24px;
  }

  & .modal-container {
    width: 408px;
    max-width: 92%;
    max-height: 45dvh;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    & .search-emoji {
      width: 100%;
      flex-shrink: 0;
    }

    & .tags-list {
      overflow: auto;
      height: 100%;
      margin-top: 10px;

      .option {
        height: 40px;
        margin: 1px;
        font-size: 28px;
        height: 40px;
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          background-color: red;
          cursor: pointer;
        }
      }
    }
  }

  & .imput-text {
    width: calc(100% - 50px);
    height: 40px;
  }
}
</style>
