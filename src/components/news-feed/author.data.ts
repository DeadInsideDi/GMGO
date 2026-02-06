import { TAccount } from '../../store/account.store'
export type TAuthor = Omit<TAccount, 'privacyInfo'>

export const authors = [
  {
    id: 1,
    name: 'Анна',
    fullName: 'Анна Герасимова',
    avatar: '/avatar-Anna.png',
  },
  {
    id: 2,
    name: 'Артур',
    fullName: 'Артур Самойлов',
    avatar: '/avatar-Artur.png',
  },
  {
    id: 3,
    name: 'Иван',
    fullName: 'Иван Илларионов',
    avatar: '/avatar-Ivan.png',
  },
  {
    id: 4,
    name: 'Мария',
    fullName: 'Мария Придумонава',
    avatar: '/avatar-Maria.png',
  },
  {
    id: 5,
    name: 'Елизавета',
    fullName: 'Елизавета Придумонава',
    avatar: '/avatar-Elizaveta.png',
  },
  {
    id: 6,
    name: 'Владислав',
    fullName: 'Владислав Придумонов',
    avatar: '/avatar-Vlad.png',
  },
]
