<script setup lang="ts">
import { reactive, ref } from 'vue'
import ModalContainer from './ModalContainer.vue'
import { useTags } from '@/stores/local/tags'

const tags = useTags()

const props = defineProps<{
  toggleShow: () => void
}>()

const style = reactive({
  width: '400px',
  height: '100px'
})

const form = reactive({
  img: '',
  content: ''
})

const setEmoji = (emoji: string) => {
  form.img = emoji
  toggleShowEmojis()
}

const send = () => {
  tags.create(form)
  props.toggleShow()
}

const showEmojis = ref(false)
const toggleShowEmojis = () => (showEmojis.value = !showEmojis.value)

const emojis = ['⭐️', '🤓', '🥰', '🌼', '👑', '🫀', '🐦', '💅', '🥰', '👑', '💙', '💰']
</script>

<template>
  <ModalContainer
    title="Editar tag"
    :toggle-show="props.toggleShow"
    :width="style.width"
    :height="style.height"
  >
    <div class="tag-editor-container">
      <div class="emojis-list" v-show="showEmojis">
        <button @click="() => setEmoji(emoji)" v-for="(emoji, i) in emojis" :key="i">
          <p>{{ emoji }}</p>
        </button>
      </div>
      <div class="tag-editor">
        <button @click="toggleShowEmojis" class="emoji">
          <p>{{ form.img }}</p>
        </button>
        <input type="text" class="name" v-model="form.content" />
      </div>
      <button class="add-tag-button" @click="send">Adicionar</button>
    </div>
  </ModalContainer>
</template>

<style scoped lang="scss">
.tag-editor-container {
  // medidas
  height: 100%;
  width: 100%;
  position: relative;
  // estilo
  background-color: rgb(78, 78, 146);

  & .emojis-list {
    // medidas
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: scroll;
    // display
    display: flex;
    align-items: center;
    // estilo
    background-color: red;

    & button {
      // medidas
      height: 40px;
      flex-shrink: 0;
      aspect-ratio: 1;
      margin-left: 10px;
      overflow: hidden;
      // estilo
      border: none;
      border-radius: 50%;

      & p {
        font-size: 32px;
      }
    }
  }

  & .tag-editor {
    // medidas
    width: 100%;
    height: 100%;
    // display
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    // estilo
    background-color: rgb(60, 152, 64);

    & .emoji {
      // medidas
      height: 40px;
      aspect-ratio: 1;
      border-radius: 50%;
      // estilo
      background-color: pink;
      border: none;

      & p {
        font-size: 32px;
      }
    }

    & .name {
      // medidas
      height: 40px;
      width: 80%;
      padding: 20px;
      // estilo
      outline: none;
      border-radius: 50px;
      border: none;
      box-sizing: border-box;
    }
  }

  & .add-tag-button {
    // medidas
    width: 100%;
    height: 40px;
  }
}
</style>
