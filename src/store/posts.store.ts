import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { discussPosts, TDiscussPost } from '../components/discuss-post/discuss-post.data'
import { newsFeed, TNewsFeed } from '../components/news-feed/news-feed.data'
import { TPostsFilterState } from '../store/app.store'
import { useAccountStore } from './account.store'

export interface IPostsStore {
  currentPosts: TDiscussPost[]
  currentNews: TNewsFeed[]
  setCurrentPosts: (posts: TDiscussPost[]) => void
  addNewsPost: (post: TNewsFeed) => void

  incrementViews: (id: number) => void

  // addComment: (id: number, content: string) => void
  incrementComments: (id: number) => void
  incrementLikes: (id: number) => void
  incrementDislikes: (id: number) => void

  // deleteComment: (id: number) => void
  decrementComments: (id: number) => void
  decrementLikes: (id: number) => void
  decrementDislikes: (id: number) => void

  sortPostsByFilterState: (state: TPostsFilterState) => TNewsFeed[]
}

export const usePostsStore = create<IPostsStore>()(
  persist(
    (set, get) => ({
      currentPosts: discussPosts,
      currentNews: newsFeed,
      setCurrentPosts: posts => set({ currentPosts: posts }),
      addNewsPost: post => set({ currentNews: get().currentNews.concat(post) }),

      incrementViews: id =>
        set({
          currentPosts: get().currentPosts.map(post => (post.id === id ? { ...post, views: post.views + 1 } : post)),
        }),
      // addComment: (id, content) =>
      //   set({
      //     currentNews: get().currentNews.map(post => (post.id === id ? { ...post, comments: post.comments + 1 } : post)),
      //   }),
      incrementComments: id =>
        set({
          currentNews: get().currentNews.map(post =>
            post.id === id ? { ...post, comments: post.comments + 1 } : post,
          ),
        }),
      incrementLikes: id =>
        set({
          currentNews: get().currentNews.map(post => (post.id === id ? { ...post, likes: post.likes + 1 } : post)),
        }),
      incrementDislikes: id =>
        set({
          currentNews: get().currentNews.map(post =>
            post.id === id ? { ...post, dislikes: post.dislikes + 1 } : post,
          ),
        }),

      // deleteComment: id =>
      //   set({
      //     currentNews: get().currentNews.map(post => (post.id === id ? { ...post, comments: post.comments - 1 } : post)),
      //   }),
      decrementComments: id =>
        set({
          currentNews: get().currentNews.map(post =>
            post.id === id ? { ...post, comments: post.comments - 1 } : post,
          ),
        }),
      decrementLikes: id =>
        set({
          currentNews: get().currentNews.map(post => (post.id === id ? { ...post, likes: post.likes - 1 } : post)),
        }),
      decrementDislikes: id =>
        set({
          currentNews: get().currentNews.map(post =>
            post.id === id ? { ...post, dislikes: post.dislikes - 1 } : post,
          ),
        }),

      sortPostsByFilterState: state => {
        switch (state) {
          case 'Popular':
            return get().currentNews.toSorted((a, b) => b.likes - a.likes)
          case 'Latest':
            return get().currentNews.toSorted((a, b) => b.timeUnix - a.timeUnix)
          case 'My Subscriptions':
            const { isSubscribedAccount } = useAccountStore.getState()
            return get().currentNews.filter(post => isSubscribedAccount(post.authorId))
        }
      },
    }),
    {
      name: 'posts-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
