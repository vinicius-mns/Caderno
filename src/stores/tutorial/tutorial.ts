import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import type { Itag } from '../tags/Interfaces'
import type { Icard } from '../cards/Interfaces'

export const useTutorial = defineStore('tutorial', () => {
  const filterContrutor = (initCards: Icard[], tags: Itag[]) => {
    const cards = ref<Icard[]>(initCards)

    const filter = reactive<{ include: Itag[]; exclude: Itag[] }>({
      include: [],
      exclude: []
    })

    const filterCards = () => {
      const cardsIncludeTags = initCards.filter((card: Icard) => {
        const cardTagNames = card.tags.map((t) => t[1])
        return filter.include.every((tag) => cardTagNames.includes(tag[1]))
      })

      const cardExludeTags = cardsIncludeTags.filter((card) => {
        const cardTagNames = card.tags.map((tag) => tag[1])
        return !filter.exclude.some((tag) => cardTagNames.includes(tag[1]))
      })

      cards.value = cardExludeTags
    }

    const handleFilter = (type: 'include' | 'exclude') => {
      const add = (name: string) => {
        const tagName = tags.find((t) => t[1] === name)

        if (tagName) {
          const oppositeType = type === 'include' ? 'exclude' : 'include'
          filter[oppositeType] = filter[oppositeType].filter((t) => t[1] !== name)
          filter[type] = [...filter[type], tagName]
        }

        filterCards()
      }

      const remove = (name: string) => {
        filter[type] = filter[type].filter((t) => t[1] !== name)

        filterCards()
      }

      const clear = () => {
        filter.include = []
        filter.exclude = []
      }

      return {
        add,
        remove,
        clear
      }
    }

    return {
      cards,
      tags,
      filter,
      handleFilter
    }
  }

  const diary: { tags: Itag[]; cards: Icard[] } = {
    tags: [
      ['📓', 'Diário'],
      ['💡', 'Autoajuda'],
      ['✅', 'Tarefas-Diárias'],
      ['🎉', 'Feito'],
      ['🏫', 'Faculdade'],
      ['📜', 'Citações'],
      ['💪', 'Desafios']
    ],
    cards: [
      {
        id: '1',
        content:
          'Hoje, escrevi sobre a importância de manter um equilíbrio entre estudos e vida pessoal. Senti que preciso dedicar mais tempo a mim mesmo para evitar o estresse.',
        date: new Date('2023-10-01'),
        tags: [
          ['📓', 'Diário'],
          ['💡', 'Autoajuda']
        ]
      },
      {
        id: '2',
        content:
          'Completei todas as tarefas do dia, incluindo a leitura de um capítulo do livro da faculdade. Senti uma grande satisfação ao riscar cada item da lista.',
        date: new Date('2023-10-02'),
        tags: [
          ['✅', 'Tarefas-Diárias'],
          ['🎉', 'Feito']
        ]
      },
      {
        id: '3',
        content:
          'Na aula de hoje, discutimos sobre ética e moral. Uma citação que me marcou foi: "A ética é saber a diferença entre o que você tem o direito de fazer e o que é certo fazer."',
        date: new Date('2023-10-03'),
        tags: [
          ['🏫', 'Faculdade'],
          ['📜', 'Citações']
        ]
      },
      {
        id: '4',
        content:
          'Enfrentei um desafio ao tentar entender um conceito difícil em matemática. Decidi pedir ajuda ao professor e isso me fez sentir mais confiante.',
        date: new Date('2023-10-04'),
        tags: [
          ['💪', 'Desafios'],
          ['🏫', 'Faculdade']
        ]
      },
      {
        id: '5',
        content:
          'Hoje, escrevi sobre a importância de manter uma rotina saudável. Isso me ajudou a me sentir mais produtivo e focado nos estudos.',
        date: new Date('2023-10-05'),
        tags: [
          ['📓', 'Diário'],
          ['💡', 'Autoajuda']
        ]
      },
      {
        id: '6',
        content:
          'Concluí um projeto importante da faculdade e me senti realizado. A sensação de dever cumprido é incrível!',
        date: new Date('2023-10-06'),
        tags: [
          ['✅', 'Tarefas-Diárias'],
          ['🎉', 'Feito']
        ]
      },
      {
        id: '7',
        content:
          'Hoje, li uma citação que me inspirou: "O sucesso é a soma de pequenos esforços repetidos dia após dia." Isso me motivou a continuar trabalhando duro.',
        date: new Date('2023-10-07'),
        tags: [
          ['📜', 'Citações'],
          ['💡', 'Autoajuda']
        ]
      },
      {
        id: '8',
        content:
          'Tive um dia desafiador na faculdade, mas consegui superar as dificuldades com a ajuda dos meus colegas. A colaboração é fundamental!',
        date: new Date('2023-10-08'),
        tags: [
          ['💪', 'Desafios'],
          ['🏫', 'Faculdade']
        ]
      },
      {
        id: '9',
        content:
          'Hoje, finalizei todas as tarefas do dia e me permiti um tempo para relaxar. É importante equilibrar trabalho e descanso.',
        date: new Date('2023-10-09'),
        tags: [
          ['✅', 'Tarefas-Diárias'],
          ['🎉', 'Feito']
        ]
      },
      {
        id: '10',
        content:
          'Refleti sobre uma citação que diz: "A única maneira de fazer um excelente trabalho é amar o que você faz." Isso me fez pensar sobre minha escolha de carreira.',
        date: new Date('2023-10-10'),
        tags: [
          ['📜', 'Citações'],
          ['📓', 'Diário']
        ]
      },
      {
        id: '11',
        content:
          'Hoje, enfrentei um desafio ao tentar equilibrar estudos e vida social. Aprendi que é essencial priorizar o que realmente importa.',
        date: new Date('2023-10-11'),
        tags: [
          ['💪', 'Desafios'],
          ['💡', 'Autoajuda']
        ]
      },
      {
        id: '12',
        content:
          'Concluí um trabalho em grupo e me senti muito satisfeito com o resultado. A colaboração realmente faz a diferença!',
        date: new Date('2023-10-12'),
        tags: [
          ['✅', 'Tarefas-Diárias'],
          ['🎉', 'Feito']
        ]
      }
    ]
  }

  const project: { cards: Icard[]; tags: Itag[] } = {
    tags: [
      ['📁', 'Projeto'],
      ['✅', 'Feito'],
      ['📝', 'Anotações'],
      ['⏰', 'Urgente']
    ],
    cards: [
      {
        id: '1',
        content:
          'Definição do escopo do projeto: O objetivo é desenvolver uma aplicação web para gerenciamento de tarefas. Precisamos identificar as funcionalidades principais e o público-alvo.',
        date: new Date('2023-10-01'),
        tags: [
          ['📁', 'Projeto'],
          ['📝', 'Anotações'],
          ['✅', 'Feito']
        ]
      },
      {
        id: '2',
        content:
          'Reunião com a equipe para discutir as tecnologias a serem utilizadas. Decidimos usar React para o front-end e Node.js para o back-end. Anotei as vantagens de cada tecnologia.',
        date: new Date('2023-10-02'),
        tags: [
          ['📁', 'Projeto'],
          ['📝', 'Anotações'],
          ['⏰', 'Urgente']
        ]
      },
      {
        id: '3',
        content:
          'Criação do cronograma do projeto. Estabelecemos prazos para cada fase: pesquisa, desenvolvimento, testes e lançamento. O prazo total é de 3 meses.',
        date: new Date('2023-10-03'),
        tags: [
          ['📁', 'Projeto'],
          ['✅', 'Feito'],
          ['⏰', 'Urgente']
        ]
      },
      {
        id: '4',
        content:
          'Pesquisa de mercado realizada. Identificamos concorrentes e suas funcionalidades. Anotei pontos fortes e fracos de cada um para melhorar nosso produto.',
        date: new Date('2023-10-04'),
        tags: [
          ['📁', 'Projeto'],
          ['📝', 'Anotações']
        ]
      },
      {
        id: '5',
        content:
          'Desenvolvimento do protótipo inicial. Criei wireframes para as principais telas da aplicação. Isso ajudará na visualização do produto final.',
        date: new Date('2023-10-05'),
        tags: [
          ['📁', 'Projeto'],
          ['✅', 'Feito'],
          ['⏰', 'Urgente']
        ]
      },
      {
        id: '6',
        content:
          'Revisão do protótipo com a equipe. Recebi feedbacks valiosos que serão implementados na próxima versão. Anotei as sugestões para não esquecer.',
        date: new Date('2023-10-06'),
        tags: [
          ['📁', 'Projeto'],
          ['📝', 'Anotações'],
          ['⏰', 'Urgente']
        ]
      },
      {
        id: '7',
        content:
          'Início do desenvolvimento do back-end. Configurei o servidor e a base de dados. Anotei as dependências necessárias para o projeto.',
        date: new Date('2023-10-07'),
        tags: [
          ['📁', 'Projeto'],
          ['✅', 'Feito']
        ]
      },
      {
        id: '8',
        content:
          'Desenvolvimento da funcionalidade de autenticação. Implementei o sistema de login e registro de usuários. Testei e anotei os bugs encontrados.',
        date: new Date('2023-10-08'),
        tags: [
          ['📁', 'Projeto'],
          ['📝', 'Anotações']
        ]
      },
      {
        id: '9',
        content:
          'Criação da interface do usuário. Utilizei o design do protótipo para desenvolver as telas. Anotei as alterações que precisam ser feitas com base no feedback.',
        date: new Date('2023-10-09'),
        tags: [
          ['📁', 'Projeto'],
          ['✅', 'Feito']
        ]
      },
      {
        id: '10',
        content:
          'Realização de testes de usabilidade. Convidei alguns usuários para testar a aplicação e anotei suas impressões e sugestões de melhorias.',
        date: new Date('2023-10-10'),
        tags: [
          ['📁', 'Projeto'],
          ['📝', 'Anotações']
        ]
      },
      {
        id: '11',
        content:
          'Preparação para o lançamento. Criei um plano de marketing para divulgar a aplicação. Anotei as plataformas e estratégias que serão utilizadas.',
        date: new Date('2023-10-11'),
        tags: [
          ['📁', 'Projeto'],
          ['⏰', 'Urgente']
        ]
      }
    ]
  }

  const diaryFilter = filterContrutor(diary.cards, diary.tags)

  const projectFilter = filterContrutor(project.cards, project.tags)

  return {
    diaryFilter,
    projectFilter
  }
})
