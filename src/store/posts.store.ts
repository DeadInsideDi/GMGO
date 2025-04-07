import { create } from 'zustand'
import { discussPosts, TDiscussPost } from '../components/discuss-post/discuss-post.data'
import { newsFeed, TNewsFeed } from '../components/news-feed/news-feed.data'

export interface IPostsStore {
  currentPosts: TDiscussPost[]
  currentNews: TNewsFeed[]
  setCurrentPosts: (posts: TDiscussPost[]) => void
}

export const usePostsStore = create<IPostsStore>((set, get) => ({
  currentPosts: discussPosts,
  currentNews: newsFeed,
  setCurrentPosts: posts => set({ currentPosts: posts }),
}))
