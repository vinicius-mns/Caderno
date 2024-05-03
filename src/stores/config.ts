import { configStorage } from '@/api/api_local/entites/config/Config_api'
import type { IConfig } from '@/api/api_local/entites/config/configTypes'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useConfig = defineStore('config', () => {
  const config_local_api = configStorage()

  const filterCardsByTag = ref(false)

  const toggleFilterByTag = () => (filterCardsByTag.value = !filterCardsByTag.value)

  const config = reactive({
    value: config_local_api.read(),
    setValue: (ent: IConfig) => (config.value = ent)
  })

  const cardChengeWidth = (width: number) => {
    try {
      config_local_api.cardChengeWidth(width)
      config.setValue(config_local_api.read())
    } catch (e) {
      console.error(e)
    }
  }

  const toggleFilter = () => {
    try {
      config_local_api.toggleFilter()
      config.setValue(config_local_api.read())
    } catch (e) {
      console.error(e)
    }
  }

  return {
    config,
    cardChengeWidth,
    toggleFilter,
    filterCardsByTag,
    toggleFilterByTag
  }
})
