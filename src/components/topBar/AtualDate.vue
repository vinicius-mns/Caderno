<script setup lang="ts">
import { reactive, watchEffect } from 'vue'

const state = reactive({
  date: new Date(),
  hour: 12,
  minute: '',
  AmPM: 'PM'
})

watchEffect(() => {
  setInterval(() => {
    state.date = new Date()
    defineHour()
    defineMinute()
    defineAmPm()
  }, 1000)
})

const defineHour = () => {
  const hour = state.date.getHours()
  hour === 12 && (state.hour = 12) // meio dia
  hour === 0 && (state.hour = 12) // meia noite
  hour < 12 && (state.hour = hour) // manha
  hour > 12 && (state.hour = hour - 12) // tarde
}

const defineMinute = () => {
  const minute = state.date.getMinutes().toString().padStart(2, '0')
  state.minute = minute
}

const defineAmPm = () => {
  const hour = state.date.getHours()
  hour === 12 && (state.AmPM = 'PM') // meio dia
  hour === 0 && (state.AmPM = 'AM') // meia noite
  hour < 12 && (state.AmPM = 'AM') // manha
  hour > 12 && (state.AmPM = 'PM') // tarde
}
</script>

<template>
  <div class="date-container">
    <div class="date">
      <p>{{ state.hour }}</p>
      <p>:</p>
      <p>{{ state.minute }}</p>
      <p>{{ state.AmPM }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@media screen and (min-width: 769px) {
  .date-container {
    // medidas
    width: 100%;
    height: 100%;
    // display
    display: flex;
    align-items: center;
    justify-content: center;

    & .date {
      // medidas
      width: 50%;
      height: 32px;
      // display
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      // estilo
      background-color: white;
      border-radius: 50px;
    }
  }
}

@media screen and (max-width: 768px) {
  .date-container {
    // medidas
    width: 90%;
    height: 100%;
    // display
    display: flex;
    align-items: center;
    justify-content: center;

    & .date {
      // medidas
      width: 100%;
      height: 100%;
      // display
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      background-color: white;
    }
  }
}
</style>
