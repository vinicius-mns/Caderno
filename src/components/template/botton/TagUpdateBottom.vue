<script setup lang="ts">
import { reactive, ref } from 'vue'
import ThemeImputText from '@/components/atoms/ThemeImputText.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import FloatModalSlot from '@/components/atoms/FloatModalSlot.vue'
import EmojiPlusIco from '@/components/atoms/icons/EmojiPlusIco.vue'
import ModalCard from '@/components/atoms/ModalCard.vue'
import ButtonCoinSlot from '@/components/molecules/ButtonCoinSlot.vue'
import ThemeP from '@/components/atoms/ThemeP.vue'
import SearchImput from '@/components/molecules/SearchImput.vue'
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import { useStylesPage } from '@/stores/stylesPage/stylesPage'
import CheckIco from '@/components/atoms/icons/CheckIco.vue'
import ButtonSlot from '@/components/molecules/ButtonSlot.vue'
import CrossIco from '@/components/atoms/icons/CrossIco.vue'
import ThemeH1 from '@/components/atoms/ThemeH1.vue'
import PlusIco from '@/components/atoms/icons/PlusIco.vue'

const stylePage = useStylesPage()

const props = defineProps<{
  tag: Itag
  emojis: string[]
  type: 'create' | 'update'
}>()

const emit = defineEmits<{
  (e: 'sendtag', v: Itag): void
  (e: 'searchEmoji', v: string): void
  (e: 'close', v: null): void
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

const tagsToCreate = ref<Itag[]>([['', ''] as Itag])

const pushTagToCreate = () => {
  tagsToCreate.value.push(['', ''])
}
</script>

<template>
  <div class="tag-editor-container">
    <header>
      <ThemeH1 content="Editar tag" v-if="props.type === 'update'" />

      <ThemeH1 content="Criar tag" v-if="props.type === 'create'" />

      <ButtonCoinSlot content="Fechar" :circle="true" @click="emit('close', null)">
        <CrossIco />
      </ButtonCoinSlot>
    </header>

    <div class="tag-editor-area" v-if="props.type === 'update'">
      <div class="tag-editor">
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

      <div class="actions">
        <ButtonSlot
          content="Salvar"
          :circle="true"
          @click="sendtag"
          border-radius="50px"
          :invert-color="true"
        >
          <CheckIco />
        </ButtonSlot>
      </div>
    </div>

    <div class="tag-editor-area" v-else v-for="(tag, i) in tagsToCreate" :key="i">
      <div class="tag-editor">
        <FloatModalSlot ref="modal">
          <template #button-slot>
            <ButtonCoinSlot content="Selecionar emoji" v-if="tagReative.emoji" :circle="true">
              <ThemeP :content="tag[0]" class="emoji" />
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
          :init-content="tag[1]"
          key-id="tag-editor"
          placeholder="Nome da tag"
          class="imput-text"
        />
      </div>

      <div class="actions">
        <ButtonSlot
          content="Salvar"
          :circle="true"
          @click="sendtag"
          border-radius="50px"
          :invert-color="true"
        >
          <CheckIco />
        </ButtonSlot>
      </div>
    </div>

    <div class="actions-to-create" v-if="props.type === 'create'">
      <ButtonCoinSlot content="Salvar" :circle="true" @click="pushTagToCreate">
        <PlusIco />
      </ButtonCoinSlot>

      <ButtonSlot content="Criar todos" border-radius="50px" class="create-all">
        <CheckIco />
      </ButtonSlot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tag-editor-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 8px;
  box-sizing: border-box;
  position: relative;

  & header {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  & .tag-editor-area {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 8px;

    & .tag-editor {
      width: 100%;
      display: flex;
      flex-direction: row;
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
              background-color: v-bind('stylePage.atualColor.hover');
              border-radius: v-bind('stylePage.borderRadius.inside');
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
  }

  & .actions {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  & .actions-to-create {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    // gap: 8px;

    & .create-all {
      position: absolute;
      bottom: 6px;
      right: 6px;
    }
  }
}
</style>
