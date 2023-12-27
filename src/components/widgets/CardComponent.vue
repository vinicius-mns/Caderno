<script setup lang="ts">
import type { ITag } from '@/api/local'

const props = defineProps<{
  tags: ITag[]
  content: string
  date: Date
}>()

const parseDate = () => {
  const mounthName = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ]
  const day = props.date.getDate()
  const mounthIndex = props.date.getMonth()
  return `${day}/${mounthName[mounthIndex]}`
}

const title = () => JSON.stringify(props.tags.map(({ content }) => content))
</script>

<template>
  <div class="card-component">
    <header>
      <div class="date">
        <p>{{ parseDate() }}</p>
      </div>
      <div class="tags" :title="title()">
        <div class="tag" v-for="(tag, i) in props.tags" :key="i">
          <p>{{ tag.img }}</p>
        </div>
      </div>
    </header>
    <div class="text">
      <p>{{ props.content }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-component {
  // medidas
  width: 94%;
  max-width: 350px;
  margin-top: 4%;
  word-wrap: break-word;
  overflow: hidden;
  //display
  display: flex;
  flex-direction: column;
  align-items: center;
  //estilo
  background-color: #d9d9d9;
  background-color: white;
  border-radius: 16px;

  & header {
    // medidas
    height: 34px;
    width: 90%;
    margin-top: 4px;
    margin-bottom: 4px;
    //display
    display: flex;
    align-items: center;
    justify-content: space-between;

    & .date {
      // medidas
      height: 34px;
      //display
      display: flex;
      align-items: center;
      justify-content: center;
    }
    & .tags {
      // medidas
      height: 34px;
      //display
      display: flex;
      align-items: center;
      overflow: hidden;
      // estilo
      cursor: pointer;

      & .tag {
        //medidas
        height: 80%;
        aspect-ratio: 1;
        margin-left: 8px;
        //display
        display: flex;
        align-items: center;
        justify-content: center;
        //estilo
        border-radius: 50%;

        & p {
          font-size: 22px;
        }
      }
    }
  }

  & .text {
    // medidas
    width: 100%;
    margin-bottom: 2px;
    // display
    display: flex;
    justify-content: center;
    // estilo
    background-color: white;
    text-align: justify;

    & p {
      width: 90%;
      margin-bottom: 12px;
    }
  }
}
</style>
