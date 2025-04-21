import { create } from 'zustand'
import { TCategoryItem, categories } from '../components/category/category.data'

export interface ICategoryStore {
  currentCategories: TCategoryItem[]
  setCurrentCategory: (category: TCategoryItem[]) => void
  getCategoryById: (id: number) => TCategoryItem | null
  selectTopCategories: (count: number, increasing?: boolean) => TCategoryItem[]
}

export const useCategoryStore = create<ICategoryStore>((set, get) => ({
  currentCategories: categories,
  setCurrentCategory: category => set({ currentCategories: category }),
  getCategoryById: id => get().currentCategories.find(category => category.id === id) || null,
  selectTopCategories: (count, increasing = false) =>
    get()
      .currentCategories.toSorted((a, b) => (increasing ? a.usageCount - b.usageCount : b.usageCount - a.usageCount))
      .slice(0, count),
  getCategoriesToView: () => get().currentCategories.filter(category => category.usageCount > 0),
}))
