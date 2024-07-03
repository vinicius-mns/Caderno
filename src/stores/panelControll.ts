import type { ICard } from '@/api/api_local/entites/cards/CardsTypes'
import type { ITag } from '@/api/local'
import { defineStore } from 'pinia'
import { ref, type UnwrapRef, computed } from 'vue'

type IPanelRoutes =
  | ''
  | 'Home'
  | 'Configuração'
  | 'Tags'
  | 'Criar tag'
  | 'Tag opções'
  | 'Editar tag'
  | 'Deletar Tag'
  | 'Filter cards com tags'
  | 'Deletar cards com tag'
  | 'Criar card'
  | 'Editar Card'
  | 'Deletar card'

const panelComponent = () => {
  const createProp = <T>(param: T) => {
    const value = ref(param)
    const update = (v: UnwrapRef<T>) => (value.value = v)
    return {
      value,
      update
    }
  }

  const height = createProp('68dvh')

  const width = createProp('360px')

  const xPosition = createProp(`${window.innerWidth * 0.5 - parseInt(width.value.value) / 2}px`)

  const yPosition = createProp(`${window.innerHeight * 0.2}px`)

  const isMinimize = createProp(false)

  const rotateDegX = createProp('0deg')

  const rotateDegY = createProp('0deg')

  const handleMinimize = () => {
    isMinimize.update(true)
    height.update('50px')
    width.update('50px')
  }

  const handleMaxmize = () => {
    isMinimize.update(false)
    height.update('68dvh')
    width.update('360px')
  }

  // const toLarge = () => {
  //   isMinimize.update(false)
  //   const large = () => {
  //     width.update('60dvw')
  //     height.update('80dvh')
  //   }
  //   window.innerWidth >= 768 && large()
  //   xPosition.update('20dvw')
  //   yPosition.update('10dvh')
  // }

  const toSmall = () => {
    isMinimize.update(false)
    width.update('360px')
    height.update('68dvh')
  }

  return {
    xPosition,
    yPosition,
    height,
    width,
    rotateDegX,
    rotateDegY,
    isMinimize,
    handleMinimize,
    handleMaxmize,
    toSmall
  }
}

const panelRoute = (panel: ReturnType<typeof panelComponent>) => {
  const routeHistory = ref<IPanelRoutes[]>([''])

  const currentRoute = computed(() => routeHistory.value.at(-1) as unknown as string)

  const routeHistoryPush = (v: IPanelRoutes) => {
    currentRoute.value !== v && (routeHistory.value = [...routeHistory.value, v])

    const histoy = routeHistory.value
    histoy.length >= 5 && (routeHistory.value = histoy.slice(1))
  }

  const backRoute = () => {
    const histoy = routeHistory.value
    histoy.pop()
    routeHistory.value = histoy
  }

  const createRoute = <T>(param: { path: IPanelRoutes; props: T; transition: () => void }) => {
    const path = param.path
    const props = ref(param.props)

    const updateProps = (v: UnwrapRef<T>) => (props.value = v)

    const show = () => currentRoute.value === path

    const pushRoute = () => {
      routeHistoryPush(path)
      console.log('route histoy', routeHistory.value)
      setTimeout(() => {
        param.transition()
      }, 1)
    }

    return {
      path,
      props,
      show,
      updateProps,
      pushRoute
    }
  }

  const nothing = createRoute<null>({
    path: '',
    props: null,
    transition: panel.toSmall
  })

  const home = createRoute<null>({
    path: 'Home',
    props: null,
    transition: panel.toSmall
  })

  const config = createRoute({
    path: 'Configuração',
    props: null,
    transition: panel.toSmall
  })

  const card = createRoute<ICard>({
    path: 'Editar Card',
    props: { content: 'not found', id: '404', date: new Date(), tags: [''] },
    transition: panel.toSmall
  })

  const cardDelete = createRoute<null>({
    path: 'Deletar card',
    props: null,
    transition: panel.toSmall
  })

  const tags = createRoute<null>({
    path: 'Tags',
    props: null,
    transition: panel.toSmall
  })

  const tagCreate = createRoute<null>({
    path: 'Criar tag',
    props: null,
    transition: panel.toSmall
  })

  const tagUpdate = createRoute<null>({
    path: 'Editar tag',
    props: null,
    transition: panel.toSmall
  })

  const tagDelete = createRoute<null>({
    path: 'Deletar Tag',
    props: null,
    transition: panel.toSmall
  })

  const tagDeleteCards = createRoute<null>({
    path: 'Deletar cards com tag',
    props: null,
    transition: panel.toSmall
  })

  const tagsOptions = createRoute<ITag>({
    path: 'Tag opções',
    props: { content: 'not found', emoji: '', id: '404' },
    transition: panel.toSmall
  })

  const cardCreate = createRoute<null>({
    path: 'Criar card',
    props: null,
    transition: panel.toSmall
  })

  const filterCardsByTags = createRoute<null>({
    path: 'Filter cards com tags',
    props: null,
    transition: panel.toSmall
  })

  return {
    nothing,
    currentRoute,
    backRoute,
    home,
    config,
    tagCreate,
    tagUpdate,
    tagDelete,
    tagDeleteCards,
    tagsOptions,
    tags,
    card,
    cardCreate,
    filterCardsByTags,
    cardDelete
  }
}

export const usePanelControll = defineStore('panel', () => {
  const panel = panelComponent()

  const route = panelRoute(panel)

  return {
    panel,
    route
  }
})
