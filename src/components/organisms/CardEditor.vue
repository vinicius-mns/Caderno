<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ICard } from '@/api/local'
import ThemeTextArea from '@/components/atoms/ThemeTextArea.vue'
import CheckIco from '@/components/atoms/icons/CheckIco.vue'
import type { ITag } from '@/api/api_local/entites/tags/TagsTypes'
import ButtonOption from '@/components/molecules/ButtonOption.vue'
import TagSelectable from '@/components/molecules/TagSelectable.vue'
import ThemeP from '../atoms/ThemeP.vue'
import ShareIco from '../atoms/icons/ShareIco.vue'
import TrashIco from '../atoms/icons/TrashIco.vue'
import FloatModalSlot from '../atoms/FloatModalSlot.vue'
import CoinButton from '../molecules/CoinButton.vue'
import ModalCard from '../atoms/ModalCard.vue'
import PlusTag from '../atoms/icons/PlusTag.vue'
import MessageModal from '../molecules/MessageModal.vue'
import PlusIco from '../atoms/icons/PlusIco.vue'
import { useCardStyle } from '@/stores/cardStyle'

const cardStyle = useCardStyle()

const props = defineProps<{ type: 'editor' | 'create'; card: ICard; allTags: ITag[] }>()

const emit = defineEmits<{
  (e: 'cardAdd', v: ICard): void
  (e: 'cardCreate', v: ICard): void
  (e: 'cardUpdate', v: ICard): void
  (e: 'cardDelete', v: ICard): void
}>()

const messageModalRef = ref<InstanceType<typeof MessageModal>>()
const openMessage = () => messageModalRef.value?.openMessage()

const textareaRef = ref<InstanceType<typeof ThemeTextArea>>()

const cardContent = ref(props.card.content)

const cardTags = ref(props.card.tags)

const tagsView = computed(
  () =>
    cardTags.value.map((id: string) =>
      props.allTags.find((tag) => tag.id === id)
    ) as unknown as ITag[]
)

const isChecked = (id: string) => cardTags.value.includes(id)

const setContent = (v: string) => (cardContent.value = v)

const handleCheckTags = (tagCheck: { tag: ITag; check: boolean }) => {
  const addCheckTagId = (tag: ITag) => {
    cardTags.value = [...cardTags.value, tag.id]
  }
  const removeCheckTagId = (tag: ITag) => {
    const atualCheckedTagIds = cardTags.value
    cardTags.value = atualCheckedTagIds.filter((id) => id !== tag.id)
  }
  tagCheck.check ? addCheckTagId(tagCheck.tag) : removeCheckTagId(tagCheck.tag)
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
            <ModalCard class="modal-card">
              <div class="tags-selector">
                <TagSelectable
                  v-for="(tag, i) in allTags"
                  :key="i"
                  :tag="tag"
                  @emit-tag="handleCheckTags"
                  :checked="isChecked(tag.id)"
                  class="tag"
                />
              </div>
            </ModalCard>
          </template>
        </FloatModalSlot>
        <CoinButton
          v-for="(cardTag, i) in tagsView"
          :key="i"
          :description="cardTag.content"
          class="tag"
        >
          <ThemeP :content="cardTag.emoji" class="tag-emoji" />
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
        :style="cardStyle.atualCardSyle"
      />
      <ButtonOption
        content="Confirmar edição"
        @click="cardUpdate"
        class="confirmn-button"
        v-show="props.type === 'editor'"
      >
        <CheckIco />
      </ButtonOption>
      <div class="buttons-sub-container" v-show="props.type === 'create'">
        <ButtonOption @click="cardCreate" content="Confirmar criação" class="button-create-card">
          <CheckIco />
        </ButtonOption>
        <ButtonOption content="Adicionar cartão" @click="cardAdd" class="button-add-card">
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
          & .tag {
            margin: 3px;
            width: calc(50% - 6px);
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
          font-size: 22px;
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
