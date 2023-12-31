import { defineStore } from 'pinia'
import { computed, reactive } from 'vue'

type IDeviceString = 'mobile' | 'tablet' | 'desktop'

interface IDevice {
  button: number
  sideBar: string
}

interface IStore {
  deviceName: IDeviceString
  desktop: IDevice
  tablet: IDevice
  mobile: IDevice
}

export const useSize = defineStore('globalSize', () => {
  const store: IStore = reactive({
    deviceName: 'mobile',
    desktop: {
      button: 32,
      sideBar: '260px'
    },
    tablet: {
      button: 36,
      sideBar: '210px'
    },
    mobile: {
      button: 40,
      sideBar: '50px'
    }
  })

  /**
   * deve ser chamado ao montar o app
   * Defeni qual despositivo desta sendo renderizado com base na largura do dispositivo
   */
  const defineDevice = () => {
    const screen = window.innerWidth
    if (screen < 768) {
      store.deviceName = 'mobile'
    } else if (screen >= 768 && screen < 1024) {
      store.deviceName = 'tablet'
    } else {
      store.deviceName = 'desktop'
    }
  }

  const device = computed<IDevice>(() => store[store.deviceName])

  return {
    device,
    defineDevice,
    store
  }
})
