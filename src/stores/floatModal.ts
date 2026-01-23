import { defineStore } from 'pinia'
import { reactive, ref, type UnwrapRef } from 'vue'
import type { Itag } from './tags/Interfaces'

export type FloatModalRoutes = '' | 'tagOptions' | 'tags-filter'

export const useFloatModal = defineStore('float modal', () => {
  const newModal = <T>(v: { props: T }) => {
    const show = ref(false)

    const position = reactive<{
      cursorX: string
      cursorY: string
      positionX: 'left' | 'center' | 'right'
      positionY: 'top' | 'bottom'
    }>({
      cursorX: '0px',
      cursorY: '0px',
      positionX: 'left',
      positionY: 'top'
    })

    // cursorX: number
    // cursorY: number
    // positionX: 'left' | 'center' | 'right'
    // positionY: 'top' | 'bottom'

    // const cursorPosition = reactive({ x: '0px', y: '0px' })

    // const position = reactive<Positions>({
    //   x: 'left',
    //   y: 'top'
    // })

    const close = () => (show.value = false)

    const props = ref<T>(v.props)

    const open = (newProps: T, button: HTMLElement) => {
      props.value = newProps as UnwrapRef<T>

      const buttonElement = button.getBoundingClientRect()
      const { innerWidth: widthScreen, innerHeight: heightScreen } = window

      const buttonONLeft = buttonElement.left <= widthScreen * 0.3
      const buttonOnRight = buttonElement.right >= widthScreen * 0.7
      const buttonOnTop = buttonElement.bottom <= heightScreen / 2

      const bindX = {
        left: buttonElement.left,
        right: buttonElement.right,
        center: buttonElement.left + buttonElement.width / 2
      }

      const bindY = {
        top: buttonElement.bottom + 5,
        bottom: buttonElement.top - 5
      }

      const x = () => {
        if (buttonONLeft) return 'left'
        if (buttonOnRight) return 'right'
        return 'center'
      }

      const y = () => {
        if (buttonOnTop) return 'top'
        return 'bottom'
      }

      position.cursorX = `${bindX[x()]}px`
      position.cursorY = `${bindY[y()]}px`
      position.positionX = x()
      position.positionY = y()

      show.value = true
    }

    return { show, props, position, close, open }
  }

  const tagOptions = newModal<Itag>({ props: ['', ''] })

  const tagsFilter = newModal({ props: null })

  return {
    tagOptions,
    tagsFilter
  }
})
