<script setup lang="ts">
import { ref } from 'vue'
import ModalContainer from '../modal/ModalContainer.vue'

const show = ref(false)
const toggleShow = () => (show.value = !show.value)
</script>

<template>
  <div class="create-card">
    <button @click="toggleShow">
      <p>Criar novo card</p>
    </button>
    <ModalContainer v-show="show" title="Criar novo card" :toggleShow="toggleShow">
      <div class="card-editor">
        <div class="card-section">
          <textarea></textarea>
          <button>Criar card</button>
        </div>
        <!-- <div class="tag-section">
          <div class="tags">
            <ul>
              <li v-for="(tag, index) in mockTags" :key="index">
                <div class="content">
                  <p>{{ tag.img }}</p>
                  <p>{{ tag.content }}</p>
                </div>
                <input type="checkbox" :value="tag" />
              </li>
            </ul>
          </div>
          <button>Adicionar nova tag</button>
        </div> -->
      </div>
    </ModalContainer>
  </div>
</template>

<style scoped lang="scss">
@media screen and (min-width: 769px) {
  .create-card {
    // medidas
    width: 100%;
    height: 100%;
    // display
    display: flex;
    justify-content: center;
    align-items: center;

    & button {
      // medidas
      height: 32px;
      width: 60%;
      // estilo
      border: solid black 1px;
      cursor: pointer;
      background-color: white;
      border-radius: 40px;
    }
  }
}

@media screen and (max-width: 768px) {
  $heigth: 42px;

  .create-card {
    height: $heigth;
    border: none;
    border-radius: 50px;
    overflow: hidden;
    width: calc(100% - ($heigth * 2));

    & button {
      width: 100%;
      height: 100%;
      border: none;
    }
  }
}
</style>
