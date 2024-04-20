import { styleStorage } from '@/api/api_local/entites/style/Style_api'
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useStyle = defineStore('style', () => {
  const apiStyle = styleStorage()

  const style = reactive(apiStyle.read())

  const updateStyle = () => {
    const localStyle = apiStyle.read()
    style.boxShadow = localStyle.boxShadow
    style.button = localStyle.button
    style.component = localStyle.component
    style.darkmode = localStyle.darkmode
    style.optionsColor = localStyle.optionsColor
    style.page = localStyle.page
    style.color.background = localStyle.color.background
    style.color.base = localStyle.color.base
    style.color.neutral = localStyle.color.neutral
    style.color.text = localStyle.color.text
    style.color.highlight = localStyle.color.highlight
  }

  const toggleDarkMode = () => {
    apiStyle.toggleDarkMode()
    updateStyle()
  }

  const selecColor = (color: string) => {
    apiStyle.selecColor(color)
    updateStyle()
  }

  // const defineButtonSize = (device: 'mobile' | 'desktop') => {
  //   const execute = {
  //     mobile: () => (style.button.size = '42px'),
  //     desktop: () => (style.button.size = '32px')
  //   }
  //   execute[device]()
  // }

  const setBorderRadius = (value: number) => {
    apiStyle.changeBorderRadius(value)
    updateStyle()
  }

  const setBoxShadown = (value: { color?: string; border?: number }) => {
    apiStyle.changeBoxShadown(value)
    updateStyle()
  }

  return {
    style,
    // defineButtonSize,
    toggleDarkMode,
    selecColor,
    setBorderRadius,
    setBoxShadown
  }
})
