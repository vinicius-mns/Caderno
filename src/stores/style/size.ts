import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'

type IDeviceType = 'mobile' | 'tablet' | 'desktop'

interface IDevice {
  button: number
  sideBar: string
}

interface IDevices {
  desktop: IDevice
  tablet: IDevice
  mobile: IDevice
}

export const useSize = defineStore('globalSize', () => {
  const atualDevice = ref<IDeviceType>('mobile')

  const device = computed<IDevice>(() => devices[atualDevice.value])

  const devices: IDevices = reactive({
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

  const defineDevice = () => {
    const widthScreen = window.innerWidth
    if (widthScreen < 768) atualDevice.value = 'mobile'
    if (widthScreen >= 768) atualDevice.value = 'tablet'
    if (widthScreen >= 1024) atualDevice.value = 'desktop'
  }

  return {
    device,
    atualDevice,
    defineDevice
  }
})
