<script setup lang="ts">
import { useStyle } from '@/stores/style'
import { onMounted, ref } from 'vue'

const { style } = useStyle()

const animetion = ref('')

const animete = () => (animetion.value = 'animation')

onMounted(animete)
</script>

<template>
  <div :class="[animetion, 'about']">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.about {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // background: linear-gradient(135deg, #6daae600 0%, #3961d11f 100%);
  // border-radius: 15px;
  background-color: v-bind('style.color.background');
  color: v-bind('style.color.text');
  padding: 40px;
  width: 100%;
  & h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
  & p {
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 20px;
    max-width: 700px;
    text-align: justify;
    strong {
      font-weight: 600;
      background-color: transparent;
      color: #f1ce02;
      padding: 3px 6px;
      border-radius: 4px;
    }
  }
  li {
    margin: 12px;
    & strong {
      color: #f1ce02;
      background-color: transparent;
    }
  }
}

.animation {
  margin-top: 120px;
  opacity: 50%;
  overflow: hidden;
  animation: intro 0.5s forwards;
}

@keyframes intro {
  to {
    margin-top: 0;
    opacity: 100%;
  }
}
</style>
