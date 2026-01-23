import { ref } from 'vue'

export const pessoas = () => {
  const nome = ref('joaozinho')

  const dizerNome = () => {
    return `Ola ${nome.value}`
  }

  const mudarNome = (newName: string) => {
    nome.value = newName
  }

  return {
    dizerNome,
    mudarNome
  }
}
