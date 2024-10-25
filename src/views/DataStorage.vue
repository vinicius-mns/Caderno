<script setup lang="ts">
import FlexContainer from '@/components/atoms/FlexContainer.vue'
import ThemeP from '@/components/atoms/ThemeP.vue'

const localStorageDate = Array.from({ length: localStorage.length }, (_, index) => {
  const key = localStorage.key(index)

  const values = localStorage.getItem(key!)

  return {
    key,
    values
  }
})

const copyToClipboard = (text: string) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log('Texto copiado para a área de transferência:', text)
      console.log('chamado')
    })
    .catch((err) => {
      console.error('Erro ao copiar o texto:', err)
    })
}

const apagar = () => localStorage.clear()
</script>

<template>
  <FlexContainer class="page-container" flex-direction="column">
    <FlexContainer
      v-for="(storage, i) in localStorageDate"
      :key="i"
      flex-direction="column"
      class="item"
    >
      <FlexContainer>
        <ThemeP :content="`chave: ${storage.key}`" class="title" />
        <button @click="copyToClipboard(`chave: ${storage.key}, valores: ${storage.values}`)">
          Copiar
        </button>
      </FlexContainer>
      <ThemeP :content="`valores: ${storage.values}`" />
    </FlexContainer>
    <button @click="apagar">Deletar</button>
  </FlexContainer>
</template>

<style scoped lang="scss">
.page-container {
  background-color: black;

  & .item {
    margin: 20px;
  }

  & .title {
    margin: 10px;
  }
}
</style>
