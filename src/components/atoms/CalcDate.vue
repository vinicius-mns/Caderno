<script setup lang="ts">
import { onMounted, onUpdated, ref } from 'vue'
import moment from 'moment'

type Diff = 'months' | 'weeks' | 'days' | 'hours' | 'minutes'

const props = defineProps<{
  date: Date | string
}>()

const dateString = ref('')

const calcDiffDate = (name: string, calc: Diff) => {
  const atualDate = moment(new Date())
  const targetDate = moment(new Date(props.date))
  const diff = atualDate.diff(targetDate, calc)
  if (diff >= 1) {
    dateString.value = `${diff} ${name} atrás`
    return 'sucess'
  }
}

const setDateString = () => {
  const months = moment(props.date).diff(moment(), 'months')
  if (months > 12) {
    dateString.value = String(props.date)
    return null
  }
  const temps = [
    ['meses', 'months'],
    ['semanas', 'weeks'],
    ['dias', 'days'],
    ['horas', 'hours'],
    ['minutos', 'minutes']
  ]
  for (const temp of temps) {
    const match = calcDiffDate(temp[0], temp[1] as Diff)
    if (match === 'sucess') return null
  }
  dateString.value = 'agora'
}

onMounted(setDateString)
onUpdated(setDateString)
</script>

<template>
  <p>{{ dateString }}</p>
</template>

<style scoped lang="scss">
p {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 50%;
  // devo fazer um estilo aqui
}
</style>
