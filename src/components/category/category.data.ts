export type TCategoryItem = {
  id: number
  name: string
  image: string
  href: string
  usageCount: number
}

export const generalCategory: TCategoryItem = {
  id: 0,
  name: 'Все',
  image: '',
  href: '/',
  usageCount: 0,
}

export const categories = [
  {
    id: 1,
    name: 'Пранки',
    image: '',
    href: '/category/pranks',
    usageCount: 5,
  },
  {
    id: 2,
    name: 'Право',
    image: '',
    href: '/category/rights',
    usageCount: 3,
  },
  {
    id: 3,
    name: 'Истории',
    image: '',
    href: '/category/history',
    usageCount: 10,
  },
  {
    id: 4,
    name: 'Дизайн',
    image: '/magic-fill-1.svg',
    href: '/category/disign',
    usageCount: 385,
  },
  {
    id: 5,
    name: 'Авто',
    image: '/steering-wheel-1.svg',
    href: '/category/auto',
    usageCount: 45,
  },
  {
    id: 6,
    name: 'Искусство',
    image: '/palette-fill-1.svg',
    href: '/category/art',
    usageCount: 12,
  },
  {
    id: 7,
    name: 'Бизнес',
    image: '/briefcase-fill-1.svg',
    href: '/category/business',
    usageCount: 173,
  },
  {
    id: 8,
    name: 'Figma',
    image: '',
    href: '/category/figma',
    usageCount: 293,
  },
  {
    id: 9,
    name: 'Инвестиции',
    image: '',
    href: '/category/investing',
    usageCount: 248,
  },
  {
    id: 10,
    name: 'Лайфхаки',
    image: '',
    href: '/category/lifehacks',
    usageCount: 118,
  },
  {
    id: 11,
    name: 'Эскизы',
    image: '',
    href: '/category/sketches',
    usageCount: 23,
  },
]
