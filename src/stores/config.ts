import { configLocalStorage, type IConfig } from '@/api/HandleStorage/ConfigStorage'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useConfig = defineStore('config', () => {
  const configStorage = configLocalStorage()

  const defaultValuesConfig: IConfig = {
    darkmode: true,
    columnsCard: window.innerWidth < 768 ? 1 : 2,
    showFilterCards: false
  }

  const config = reactive({
    value: configStorage.get(defaultValuesConfig),
    setValue: (ent: IConfig) => (config.value = ent)
  })

  const darkmode = reactive({
    value: config.value.darkmode,
    toggle: () => {
      const nv = !darkmode.value
      darkmode.value = nv
      const atualConfig = configStorage.get(defaultValuesConfig)
      configStorage.createOrUpdate({ ...atualConfig, darkmode: nv })
    }
  })

  const columnsCard = reactive({
    value: config.value.columnsCard,
    setColumns: (n: number) => {
      columnsCard.value = n
      const atualConfig = configStorage.get(defaultValuesConfig)
      configStorage.createOrUpdate({ ...atualConfig, columnsCard: n })
    }
  })

  const showFilterCards = reactive({
    value: config.value.showFilterCards,
    setValue: (v?: boolean) => {
      if (v === undefined) {
        const newValue = !showFilterCards.value
        showFilterCards.value = newValue
        const atualConfig = configStorage.get(defaultValuesConfig)
        configStorage.createOrUpdate({ ...atualConfig, showFilterCards: newValue })
      }
    }
  })

  return {
    config,
    darkmode,
    columnsCard,
    showFilterCards
  }
})
