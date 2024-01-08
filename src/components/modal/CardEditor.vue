<script setup lang="ts">
import { computed, reactive } from 'vue'
import ModalContainer from './ModalContainer.vue'
import type { ICard } from '@/api/local'
import { useTags } from '@/stores/local/tags'
import { useLocalCards } from '@/stores/local/cards'

const tags = useTags()
const allTags = computed(() => tags.getAll)

const cards = useLocalCards()

const props = defineProps<{
  toggleShow: () => void
}>()

const form: ICard = reactive({
  content: '',
  date: new Date(),
  id: '',
  tags: []
})

const send = () => {
  cards.create(form)
  props.toggleShow()
}
</script>

<template>
  <ModalContainer title="Card editor" :toggle-show="props.toggleShow" width="800px" height="500px">
    <div class="card-editor">
      <div class="card-section">
        <textarea v-model="form.content"></textarea>
        <button @click="send">Criar card</button>
      </div>
      <div class="tag-section">
        <div class="tags">
          <ul>
            <li v-for="(tag, index) in allTags" :key="index">
              <div class="content">
                <p>{{ tag.img }}</p>
                <p>{{ tag.content }}</p>
              </div>
              <input type="checkbox" :value="tag" v-model="form.tags" />
            </li>
          </ul>
        </div>
        <button>Adicionar nova tag</button>
      </div>
    </div>
  </ModalContainer>
</template>

<style scoped lang="scss">
.card-editor {
  // medidas
  width: 100%;
  height: 100%;
  // display
  display: flex;
  flex-direction: row;
  // estilo
  background-color: rgb(118, 248, 250);

  $card-section-width: 68;

  & .card-section {
    // medidas
    width: $card-section-width * 1%;
    height: 100%;
    // display
    display: flex;
    flex-direction: column;
    align-items: center;
    // estilo
    background-color: rgb(169, 181, 60);

    & textarea {
      // medidas
      resize: none;
      width: 100%;
      height: 90%;
      padding: 20px;
      // estilo
      border: none;
      outline: none;
      box-sizing: border-box;
      background-color: white;
    }

    & button {
      // medidas
      width: 100%;
      height: 8%;
      // estilo
      border: none;
      cursor: pointer;
    }
  }

  & .tag-section {
    // medidas
    width: (100 - $card-section-width) * 1%;
    height: 100%;
    // display
    display: flex;
    flex-direction: column;
    align-items: center;

    & .tags {
      // medidas
      width: 100%;
      height: 90%;
      // estilo
      background-color: red;

      & ul {
        // medidas
        width: 100%;
        height: 100%;
        overflow: auto;
        // estilo
        background-color: greenyellow;

        & li {
          height: 28px;
          margin: 10px;
          display: flex;
          background-color: rgb(96, 241, 98);

          & .content {
            // medidas
            width: calc(100% - 30px);
            height: 100%;
            // display
            display: flex;
            align-items: center;
            background-color: white;

            & p {
              // medidas
              margin-left: 5px;
              text-overflow: ellipsis;
              overflow: hidden;
              // estilo
              white-space: nowrap;
            }
          }

          & input {
            // medidas
            width: 30px;
          }
        }
      }
    }

    & button {
      // medidas
      width: 100%;
      height: 8%;
      // estilo
      background-color: blue;
      border: none;
      cursor: pointer;
    }
  }
}
</style>
