import { ForkKnife, Newspaper, Triangle, User, VideoCamera } from '../../../public'

export type TMenuItem = {
  id: number
  title: string
  image: React.ReactNode
  href: string
}

export const menuSections = [
  {
    id: 1,
    title: 'Моя страница',
    image: <User />,
    href: '/me',
  }, // 'Моя страница' always first
  {
    id: 2,
    title: 'Лента',
    image: <Newspaper />,
    href: '/',
  },
  {
    id: 3,
    title: 'Фильмы',
    image: <VideoCamera />,
    href: '/films',
  },
  {
    id: 4,
    title: 'Рецепты',
    image: <ForkKnife />,
    href: '/recipes',
  },
  {
    id: 5,
    title: 'Гороскоп',
    image: <Triangle />,
    href: '/horoscope',
  },
]
