export type TNewsFeed = {
  id: number
  categoryIds: number[]
  authorId: number
  title: string
  content: string
  timeUnix: number
  image: string
  likes: number
  dislikes: number
  comments: number
  views: number
}

export const newsFeed = [
  {
    id: 1,
    categoryIds: [4, 11, 8, 10, 9, 7, 2, 1, 3, 5, 6],
    authorId: 1,
    title: 'Конструктивный формирование имиджа глазами современников',
    content:
      'Рыночная ситуация разнородно ускоряет тактический фирменный стиль, оптимизируя бюджеты. Product placement, следовательно, это PR-эффект. ',
    timeUnix: 1745146974,
    image: '/img-post-1.png',
    likes: 36,
    dislikes: 8,
    comments: 40,
    views: 22807,
  },
  {
    id: 2,
    categoryIds: [4, 11, 8, 10, 7],
    authorId: 2,
    title: 'Композиционный фабульный каркас его методология и особенности',
    content:
      'Рыночная ситуация разнородно ускоряет тактический фирменный стиль, оптимизируя бюджеты. Product placement, следовательно, это PR-эффект. ',
    timeUnix: 1740058649,
    image: '/img-post-2.png',
    likes: 87,
    dislikes: 23,
    comments: 67,
    views: 22837,
  },
  {
    id: 3,
    categoryIds: [4, 11, 8, 10, 9, 7],
    authorId: 3,
    title: 'Как мы меняли лица, делали голограммы и фантастические переходы',
    content:
      'Рыночная ситуация разнородно ускоряет тактический фирменный стиль, оптимизируя бюджеты. Product placement, следовательно, это PR-эффект. ',
    timeUnix: 1730058649,
    image: '/img-post-3.png',
    likes: 56,
    dislikes: 17,
    comments: 40,
    views: 22820,
  },
]
