<script setup lang="ts">
import { reactive, ref, nextTick } from 'vue'
import ThemeImputText from '@/components/atoms/ThemeImputText.vue'
import type { Itag } from '@/stores/tags/Interfaces'
import NewFloatModal from '@/components/molecules/NewFloatModal.vue'
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
  emojis: string[]
}>()

const emit = defineEmits<{
  (e: 'createTag', v: Itag): void
  (e: 'searchEmoji', v: string): void
  (e: 'close', v: null): void
}>()

// const modal = ref<InstanceType<typeof FloatModalSlot>>()

const tags = reactive<Itag[]>([['', ''] as Itag])

const pushTagToCreate = () => {
  tags.push(['', ''])
}

const removeTag = (index: number) => {
  tags.splice(index, 1)

  const save = [...tags]

  tags.length = 0

  nextTick(() => tags.push(...save))
}

const nameSet = (name: string, index: number) => {
  tags[index][1] = name
}

const emojiSet = (emoji: string, index: number) => {
  tags[index][0] = emoji
  // modal.value?.close()
}

const searchEmoji = (v: string) => {
  emit('searchEmoji', v)
}

const sendtag = () => {
  // emit('createTag', [tagReative.emoji, tagReative.name])
  console.log('tags', tags)
}
</script>

<template>
  <div class="tag-editor-container">
    <header>
      <ThemeH1 content="Criar tag" />

      <ButtonCoinSlot content="Fechar" :circle="true" @click="emit('close', null)">
        <CrossIco />
      </ButtonCoinSlot>
    </header>

    <div class="container-tags-area">
      <div class="tag-editor-area" v-for="(tag, tagIndex) in tags" :key="tagIndex">
        <div class="tag-editor">
          <NewFloatModal ref="modal" :closeOnClick="true">
            <template #button-slot>
              <ButtonCoinSlot content="Selecionar emoji" v-if="tag[0]" :circle="true">
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
                    @click="emojiSet(emoji, tagIndex)"
                    class="option"
                  >
                    {{ emoji }}
                  </p>
                </FlexContainer>
              </ModalCard>
            </template>
          </NewFloatModal>

          <ThemeImputText
            @emit-content="nameSet($event, tagIndex)"
            :init-content="tag[1]"
            key-id="tag-editor"
            placeholder="Nome da tag"
            class="imput-text"
          />
        </div>

        <div class="actions">
          <ButtonCoinSlot content="Remover" @click="removeTag(tagIndex)">
            <CrossIco />
          </ButtonCoinSlot>

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
    </div>

    <div class="actions-to-create">
      <ButtonSlot content="Adicionar" border-radius="50px" @click="pushTagToCreate">
        <PlusIco />
      </ButtonSlot>

      <ButtonSlot
        content="Criar todos"
        border-radius="50px"
        :invert-color="true"
        class="create-all"
        @click="sendtag"
      >
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

  & .container-tags-area {
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    gap: 12px;
    padding: 8px;
    box-sizing: border-box;

    & .tag-editor-area {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 8px;
      border: solid 1px v-bind('stylePage.atualColor.border');
      border-radius: 12px;
      padding: 8px;
      box-sizing: border-box;

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
  }

  & .actions {
    width: 100%;
    gap: 8px;
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
