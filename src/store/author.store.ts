import { create } from 'zustand'
import { TAuthor, authors } from '../components/news-feed/author.data'

export interface IAuthorStore {
  currentAuthors: TAuthor[]
  setCurrentAuthor: (author: TAuthor[]) => void
  getAuthorById: (id: number) => TAuthor | null
}

export const useAuthorStore = create<IAuthorStore>((set, get) => ({
  currentAuthors: authors,
  setCurrentAuthor: author => set({ currentAuthors: author }),
  getAuthorById: id => get().currentAuthors.find(author => author.id === id) || null,
}))
