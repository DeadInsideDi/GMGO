export type TDiscussPost = {
  id: number
  title: string
  comments: number
  views: number
  categoryId: number
}

export const discussPosts = [
  {
    id: 1,
    title:
      'Госдума приняла закон об удалёнке: работодатели смогут увольнять за два «прогула» и должны соблюдать «право на офлайн»',
    comments: 183,
    views: 22803,
    categoryId: 2,
  },
  {
    id: 2,
    title:
      'Adidas готовится продать Reebok за $1–2 млрд: почему бренд столько стоит, а партнёры не могут работать вместе',
    comments: 84,
    views: 18299,
    categoryId: 3,
  },
  {
    id: 3,
    title: 'Девять правил сильного дизайнера',
    comments: 56,
    views: 16340,
    categoryId: 4,
  },
  {
    id: 4,
    title: 'Десять главных тенденций 2021 года в разработке логотипов',
    comments: 32,
    views: 15930,
    categoryId: 4,
  },
]
