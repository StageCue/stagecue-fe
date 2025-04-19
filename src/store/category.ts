import { create } from 'zustand';
import { devtools, combine } from 'zustand/middleware';

export interface CategoryState {
  category: '연극' | '뮤지컬' | '댄스';
}

interface CategoryActions {
  setCategory: (category: CategoryState['category']) => void;
}

const initialState: CategoryState = {
  category: '연극',
};

type categoryStoreType = CategoryState & CategoryActions;

const useCategoryStore = create<categoryStoreType>()(
  devtools(
    combine<CategoryState, CategoryActions>(initialState, set => ({
      setCategory: (category: CategoryState['category']) => set({ category }),
    }))
  )
);

export default useCategoryStore;
