<script setup lang="ts">
import ThemeButton from '@/components/atoms/ThemeButton.vue'
import router from '@/router'
import { useCards } from '@/stores/cards/cards'

const cards = useCards()

const firstRoute = () => {
  if (cards.cards.length <= 0) router.push('/tutorial')
  else router.push('/cards')
}
</script>

<template>
  <div class="container-page">
    <div class="container">
      <div class="logo-container">
        <div class="logo"><h2>logo aqui</h2></div>
      </div>
      <nav>
        <RouterLink to="" class="link">
          <ThemeButton class="cards" @click="firstRoute()">Iniciar</ThemeButton>
        </RouterLink>
        <RouterLink to="/about" class="link">
          <ThemeButton class="about">Oque é o site?</ThemeButton>
        </RouterLink>
      </nav>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container-page {
  width: 100%;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  & .container {
    width: 500px;
    max-width: 98%;
    & .logo-container {
      width: 100%;
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: white;
      & .logo {
        width: 200px;
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    & nav {
      width: 100%;
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      & .link {
        padding: 0;
        margin: 0;
        background-color: transparent;
        width: 48%;
        & button {
          width: 100%;
          height: 60px;
          font-size: 20px;
          padding: 20px;
        }
        & .cards {
          background-color: rgb(120, 120, 168);
        }
        & .about {
          background-color: #f1ce02;
          color: black;
        }
      }
    }
  }
}
</style>
