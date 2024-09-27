<!-- <script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
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
import SendIco from '../atoms/icons/SendIco.vue'
import TagSelector from '../molecules/TagSelector.vue'
import MenuIco from '../atoms/icons/MenuIco.vue'

const stylesCard = useStylesCard()

const props = defineProps<{ type: 'editor' | 'create'; card: Icard; allTags: Itag[] }>()

const emit = defineEmits<{
  (e: 'cardAdd', v: Icard): void
  (e: 'cardCreate', v: Icard): void
  (e: 'cardUpdate', v: Icard): void
  (e: 'cardDelete', v: Icard): void
  (e: 'sendCard', v: Icard): void
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

const useCardHandle = () => {
  const cardObject = reactive<Icard>({
    id: props.card.id,
    content: props.card.content,
    date: props.card.date,
    tags: props.card.tags
  })

  const sendCard = () => {
    emit('sendCard', cardObject)
  }

  const setContent = (content: string) => {
    cardObject.content = content
    sendCard()
  }

  const setTags = (tags: Itag[]) => {
    cardObject.tags = tags
    sendCard()
  }

  return {
    setContent,
    setTags
  }
}

// const cardAdd = () => {
//   emit('cardAdd', {
//     content: cardContent.value,
//     date: props.card.date,
//     id: props.card.id,
//     tags: cardTags.value
//   })
//   clearAll()
//   openMessage()
// }

// const cardCreate = () => {
//   emit('cardCreate', {
//     content: cardContent.value,
//     date: props.card.date,
//     id: props.card.id,
//     tags: cardTags.value
//   })
//   clearAll()
// }

const useCardUpdate = () => {
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
}

const useMoreOptions = () => {
  const show = ref(false)

  const close = () => (show.value = false)

  const open = () => (show.value = true)

  return {
    show,
    close,
    open
  }
}

const moreOptions = useMoreOptions()

const cardHandle = useCardHandle()

onMounted(() => {
  console.log('card revebido', props.card)
})
</script>

<template>
  <FlexContainer
    class="card-form"
    flex-direction="column"
    @mouseenter="moreOptions.open"
    @mouseleave="moreOptions.close"
  >
    <FlexContainer class="top-container">
      <TagSelector
        :all-tags="props.allTags"
        :tags-selected="card.tags"
        @emit-selected="cardHandle.setTags"
      />
    </FlexContainer>
    <FlexContainer class="main-container">
      <ThemeTextArea
        ref="textareaRef"
        :content="card.content"
        class="textarea"
        :style="stylesCard.atualStyle"
        @emit-content="cardHandle.setContent"
      />
      <FloatModalSlot v-show="moreOptions.show.value">
        <template #button-slot>
          <CoinButton
            description="Mais"
            class="more-options"
            background-color="transparent"
            :border="false"
          >
            <MenuIco />
          </CoinButton>
        </template>
        <template #container-slot>
          <ModalCard class="more-options-card">
            <FlexContainer flex-direction="column">
              <ButtonOption content="Deletar Card" @click="cardDelete">
                <TrashIco />
              </ButtonOption>
            </FlexContainer>
          </ModalCard>
        </template>
      </FloatModalSlot>
    </FlexContainer>
    <MessageModal ref="messageModalRef">
      <ThemeP content="Adicionado com sucesso" v-show="type === 'create'" />
    </MessageModal>
  </FlexContainer>
</template>

<style scoped lang="scss">
.card-form {
  width: 100%;
  padding: 10px 15px;
  box-sizing: border-box;
  & .top-container {
    width: 100%;
    overflow: hidden;
    margin-bottom: 2px;
  }
  & .main-container {
    position: relative;
    & .more-options {
      position: absolute;
      right: 0;
    }
    & .more-options-card {
      width: 240px;
    }
  }
}
</style> -->
