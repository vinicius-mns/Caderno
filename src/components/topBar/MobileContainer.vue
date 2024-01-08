<script setup lang="ts">
import { ref } from 'vue'
import SearchCard from './SearchCard.vue'
import AtualDateVue from './AtualDate.vue'
import CreateCard from './CreateCard.vue'

const showMore = ref(false)
const toggleShowMore = () => (showMore.value = !showMore.value)
</script>

<template>
  <div class="mobile-topbar">
    <!-- <button class="add-card-button">Adicionar card</button> -->
    <CreateCard />
    <button class="more-button" @click="toggleShowMore">+</button>
    <div class="more-bg" v-show="showMore">
      <div class="more-container">
        <header>
          <AtualDateVue />
          <button @click="toggleShowMore">X</button>
        </header>
        <div class="more-itens">
          <SearchCard />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@media screen and (max-width: 768px) {
  .mobile-topbar {
    // medidas
    width: 95%;
    margin-left: 2.5%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    $heigth: 42px;

    & .add-card-button {
      height: $heigth;
      border: none;
      border-radius: 50px;
      width: calc(100% - ($heigth * 2));
    }

    & .more-button {
      height: $heigth;
      width: $heigth;
      border-radius: 50%;
      border: none;
    }

    & .more-bg {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.8);
      position: fixed;
      left: 0;
      top: 0;

      & .more-container {
        // medidas
        height: 40dvh;
        width: 80%;
        overflow: hidden;
        // posicionamento
        position: absolute;
        right: 5%;
        bottom: 5dvh;
        // estilo
        border-radius: 16px;
        background-color: blue;

        & header {
          width: 100%;
          height: $heigth;
          position: absolute;
          top: 0;
          display: flex;
          background-color: red;
          overflow: hidden;

          & button {
            height: $heigth;
            width: $heigth;
            border: none;
          }
        }

        & .more-itens {
          margin-left: 5%;
          width: 100%;
          margin-top: calc($heigth + 10px);
          height: calc(100% - $heigth);
          overflow: auto;
        }
      }
    }
  }
}
</style>
