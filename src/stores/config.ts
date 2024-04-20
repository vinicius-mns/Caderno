import { configStorage } from '@/api/api_local/entites/config/Config_api'
import type { IConfig } from '@/api/api_local/entites/config/configTypes'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useConfig = defineStore('config', () => {
  const config_local_api = configStorage()

  const config = reactive({
    value: config_local_api.read(),
    setValue: (ent: IConfig) => (config.value = ent)
  })

  const setColumns = (columnsLength: number) => {
    try {
      config_local_api.setColumns(columnsLength)
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
    setColumns,
    toggleFilter
  }
})
