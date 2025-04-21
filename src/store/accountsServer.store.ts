import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { TAccount, useAccountStore } from './account.store'

const serverAccounts: TAccount[] = [
  {
    id: 1,
    name: 'Анна',
    fullName: 'Анна Герасимова',
    avatar: '/avatar-Anna.png',
    privacyInfo: {
      unreadMessages: 1,
      email: 'anna@ya.ru',
      password: '1234',
      viewedStoryIds: [1],
      viewedPostIds: [1],
      likedPostIds: [2],
      dislikedPostIds: [3],
      favoritePostIds: [2],
      subscribedAccountIds: [3],
    },
  },
  {
    id: 2,
    name: 'Артур',
    fullName: 'Артур Самойлов',
    avatar: '/avatar-Artur.png',
    privacyInfo: {
      unreadMessages: 2,
      email: 'artur@ya.ru',
      password: '1234',
      viewedStoryIds: [2],
      viewedPostIds: [1],
      likedPostIds: [1],
      dislikedPostIds: [2],
      favoritePostIds: [1],
      subscribedAccountIds: [1],
    },
  },
  {
    id: 3,
    name: 'Иван',
    fullName: 'Иван Илларионов',
    avatar: '/avatar-Ivan.png',
    privacyInfo: {
      unreadMessages: 3,
      email: 'ivan@ya.ru',
      password: '1234',
      viewedStoryIds: [3],
      viewedPostIds: [1],
      likedPostIds: [1],
      dislikedPostIds: [2],
      favoritePostIds: [1],
      subscribedAccountIds: [1],
    },
  },
  {
    id: 4,
    name: 'Мария',
    fullName: 'Мария Придумонава',
    avatar: '/avatar-Maria.png',
    privacyInfo: {
      unreadMessages: 4,
      email: 'maria@flatonica.com',
      password: '1234',
      viewedStoryIds: [1],
      viewedPostIds: [1],
      likedPostIds: [1],
      dislikedPostIds: [2],
      favoritePostIds: [2],
      subscribedAccountIds: [1],
    },
  },
  {
    id: 5,
    name: 'Елизавета',
    fullName: 'Елизавета Придумонава',
    avatar: '/avatar-Elizaveta.png',
    privacyInfo: {
      unreadMessages: 5,
      email: 'elizaveta@flatonica.com',
      password: '1234',
      viewedStoryIds: [1],
      viewedPostIds: [1],
      likedPostIds: [1],
      dislikedPostIds: [2],
      favoritePostIds: [2],
      subscribedAccountIds: [1],
    },
  },
  {
    id: 6,
    name: 'Владислав',
    fullName: 'Владислав Придумонов',
    avatar: '/avatar-Vlad.png',
    privacyInfo: {
      unreadMessages: 6,
      email: 'vlad@flatonica.com',
      password: '1234',
      viewedStoryIds: [1],
      viewedPostIds: [1],
      likedPostIds: [2],
      dislikedPostIds: [3],
      favoritePostIds: [2],
      subscribedAccountIds: [3],
    },
  },
]

export type TAccountContent = {
  email: string
  password: string
}

export interface IAccountsStore {
  serverAccounts: TAccount[]
  addAccount: (content: TAccountContent) => void
  deleteAccount: (id: number) => void
  getAccountByEmail: (email: string) => TAccount | null
  isExistAccountByEmail: (email: string) => boolean
}

export const useAccountsStore = create<IAccountsStore>()(
  persist(
    immer((set, get) => ({
      serverAccounts: serverAccounts,
      addAccount: ({ email, password }) => {
        useAccountStore.getState().setEmail(email)
        useAccountStore.getState().setPassword(password)
        set(state => ({
          serverAccounts: state.serverAccounts.concat({
            ...useAccountStore.getState().account,
            id: state.serverAccounts.length + 1,
            avatar: '/avatar-Vlad.png', // base img
          }),
        }))
      },
      deleteAccount: id =>
        set(state => ({ serverAccounts: state.serverAccounts.filter(account => account.id !== id) })),

      getAccountByEmail: email => get().serverAccounts.find(account => account.privacyInfo.email === email) || null,
      isExistAccountByEmail: email => get().serverAccounts.some(account => account.privacyInfo.email === email),
    })),
    {
      name: 'accounts-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
