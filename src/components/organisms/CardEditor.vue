<script setup lang="ts">
import { ref } from 'vue'
import ThemeTextArea from '@/components/atoms/ThemeTextArea.vue'
import CheckIco from '@/components/atoms/icons/CheckIco.vue'
import ButtonOption from '@/components/molecules/ButtonOption.vue'
import ThemeP from '../atoms/ThemeP.vue'
import ShareIco from '../atoms/icons/ShareIco.vue'
import TrashIco from '../atoms/icons/TrashIco.vue'
import FloatModalSlot from '../atoms/FloatModalSlot.vue'
import CoinButton from '../molecules/CoinButton.vue'
import ModalCard from '../atoms/ModalCard.vue'
import PlusTag from '../atoms/icons/PlusTag.vue'
import MessageModal from '../molecules/MessageModal.vue'
import PlusIco from '../atoms/icons/PlusIco.vue'
import CheckBoxBase from '../atoms/CheckBoxBase.vue'
import TagView from '../molecules/TagView.vue'
// import SearchImput from '../molecules/SearchImput.vue'
import FlexContainer from '../atoms/FlexContainer.vue'
import { useStylesCard } from '@/stores/stylesCard/stylesCard'
import type { Itag } from '@/stores/tags/Interfaces'
import type { Icard } from '@/stores/cards/Interfaces'

const stylesCard = useStylesCard()

const props = defineProps<{ type: 'editor' | 'create'; card: Icard; allTags: Itag[] }>()

const emit = defineEmits<{
  (e: 'cardAdd', v: Icard): void
  (e: 'cardCreate', v: Icard): void
  (e: 'cardUpdate', v: Icard): void
  (e: 'cardDelete', v: Icard): void
}>()

const messageModalRef = ref<InstanceType<typeof MessageModal>>()
const openMessage = () => messageModalRef.value?.openMessage()

const textareaRef = ref<InstanceType<typeof ThemeTextArea>>()

const cardContent = ref(props.card.content)

const cardTags = ref(props.card.tags)

const tagsList = ref(props.allTags)

const tagIsChecked = (name: string) => cardTags.value.map((tag) => tag[1]).includes(name)

const setContent = (v: string) => (cardContent.value = v)

const addOrRemoveTag = (name: string) => {
  const tag = tagsList.value.find((tag) => tag[1] === name)

  if (tag) {
    if (tagIsChecked(tag[1])) {
      cardTags.value = cardTags.value.filter((Xtag) => Xtag[1] !== tag[1])
    } else {
      cardTags.value = [...cardTags.value, tag]
    }
  }
}

const clearAll = () => {
  cardContent.value = ''
  textareaRef.value?.clear()
}

const cardAdd = () => {
  emit('cardAdd', {
    content: cardContent.value,
    date: props.card.date,
    id: props.card.id,
    tags: cardTags.value
  })
  clearAll()
  openMessage()
}

const cardCreate = () => {
  emit('cardCreate', {
    content: cardContent.value,
    date: props.card.date,
    id: props.card.id,
    tags: cardTags.value
  })
  clearAll()
}

const cardUpdate = () => {
  emit('cardUpdate', {
    content: cardContent.value,
    date: props.card.date,
    id: props.card.id,
    tags: cardTags.value
  })
  clearAll()
}

const cardDelete = () => {
  emit('cardDelete', {
    content: cardContent.value,
    date: props.card.date,
    id: props.card.id,
    tags: cardTags.value
  })
  clearAll()
}
// const searchTag = (content: string) => {
//   tagsList.value = props.allTags.filter((tag) =>
//     tag.content.toLowerCase().includes(content.toLowerCase())
//   )
// }

// const tagsView = computed(
//   () =>
//     cardTags.value.map((id: string) =>
//       props.allTags.find((tag) => tag.id === id)
//     ) as unknown as Itag[]
// )
</script>

<template>
  <div class="card-form">
    <div class="top-container">
      <div class="tags-container">
        <FloatModalSlot>
          <template #button-slot>
            <CoinButton description="Adicionar tag" class="action-button">
              <PlusTag />
            </CoinButton>
          </template>
          <template #container-slot>
            <FlexContainer flex-direction="column">
              <ModalCard class="modal-card">
                <!-- <SearchImput
                  key-id="search-tag-card-editor"
                  placeholder="pesquisar tag"
                  @emit-content="searchTag"
                /> -->
                <FlexContainer flex-wrap="wrap" :style="{ 'overflow-x': 'auto' }">
                  <CheckBoxBase
                    v-for="(tag, i) in tagsList"
                    :key="i"
                    :id="tag[1]"
                    :is-checked="tagIsChecked(tag[1])"
                    checkbox-name="select-tag-in-card"
                    @select="addOrRemoveTag"
                    :style="{ width: 'calc(50% - 4px)', margin: '2px' }"
                  >
                    <TagView :tag="tag" />
                  </CheckBoxBase>
                </FlexContainer>
              </ModalCard>
            </FlexContainer>
          </template>
        </FloatModalSlot>
        <CoinButton v-for="(cardTag, i) in cardTags" :key="i" :description="cardTag[1]" class="tag">
          <ThemeP :content="cardTag[0]" class="tag-emoji" />
        </CoinButton>
      </div>
      <div class="actions">
        <CoinButton
          description="Compartilhar card"
          class="action-button"
          v-show="props.type === 'editor'"
        >
          <ShareIco />
        </CoinButton>
        <CoinButton
          description="Deletar card"
          class="action-button"
          @click="cardDelete"
          v-show="props.type === 'editor'"
        >
          <TrashIco />
        </CoinButton>
      </div>
    </div>
    <div class="botton-container">
      <ThemeTextArea
        ref="textareaRef"
        :content="card.content"
        class="textarea"
        @emit-content="setContent"
        :style="stylesCard.atualStyle"
      />
      <ButtonOption
        content="Confirmar edição"
        @click="cardUpdate"
        class="confirmn-button"
        v-show="props.type === 'editor'"
        :visible="true"
      >
        <CheckIco />
      </ButtonOption>
      <div class="buttons-sub-container" v-show="props.type === 'create'">
        <ButtonOption
          @click="cardCreate"
          content="Confirmar criação"
          class="button-create-card"
          :visible="true"
        >
          <CheckIco />
        </ButtonOption>
        <ButtonOption
          content="Adicionar cartão"
          @click="cardAdd"
          class="button-add-card"
          :visible="true"
        >
          <PlusIco />
        </ButtonOption>
      </div>
    </div>
    <MessageModal ref="messageModalRef">
      <ThemeP content="Adicionado com sucesso" v-show="type === 'create'" />
    </MessageModal>
  </div>
</template>

<style scoped lang="scss">
.card-form {
  width: 500px;
  max-width: 95dvw;
  display: flex;
  flex-direction: column;
  padding: 15px;
  box-sizing: border-box;
  overflow-y: auto;
  & .top-container {
    width: 100%;
    display: flex;
    margin-bottom: 10px;
    & .tags-container {
      width: 100%;
      height: 100%;
      flex-grow: 1;
      display: flex;
      align-items: center;
      overflow: auto;
      & .modal-card {
        box-sizing: border-box;
        width: 350px;
        max-width: 95dvw;
        max-height: 50dvh;
        display: flex;
        flex-direction: column;
        & .search-tag {
          width: calc(100% - 6px);
          margin-bottom: 10px;
        }
        & .tags-selector {
          height: 100%;
          width: 100%;
          display: flex;
          overflow: auto;
          flex-wrap: wrap;
          justify-content: center;
          overflow: auto;
          & .tag-selectable {
            width: calc(50% - 6px);
            margin: 3px;
            flex-shrink: 0;
          }
        }
        & .create-tag {
          margin-top: 10px;
        }
      }
      & .tag {
        margin-left: 10px;
        & .tag-emoji {
          font-size: 16px;
        }
      }
    }
    & .actions {
      flex-shrink: 0;
      height: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      & .action-button {
        margin-left: 10px;
      }
    }
  }
  & .botton-container {
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    & .textarea {
      font-size: 16px;
    }
    & .buttons-sub-container {
      margin-top: 10px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      & .button-create-card {
        width: calc(68% - 10px);
      }
      & .button-add-card {
        width: 32%;
        flex-shrink: 0;
      }
    }
  }
  & .confirmn-button {
    margin-top: 10px;
  }
}
</style>
