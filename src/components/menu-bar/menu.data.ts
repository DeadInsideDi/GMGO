export type TMenuItem = {
  id: number
  title: string
  image: string
  href: string
}

export const menuSections = [
  {
    id: 1,
    title: 'Моя страница',
    image: '/user.svg',
    href: '/me',
  },
  {
    id: 2,
    title: 'Лента',
    image: '/newspaper.svg',
    href: '/',
  },
  {
    id: 3,
    title: 'Фильмы',
    image: '/video-camera.svg',
    href: '/films',
  },
  {
    id: 4,
    title: 'Рецепты',
    image: '/fork-knife.svg',
    href: '/recipes',
  },
  {
    id: 5,
    title: 'Гороскоп',
    image: '/triangle.svg',
    href: '/horoscope',
  },
]
