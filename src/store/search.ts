import { create } from 'zustand';
import { devtools, combine } from 'zustand/middleware';

interface SearchState {
  query: string;
}

interface SearchActions {
  setSearchQuery: (query: string) => void;
}

const initialState: SearchState = {
  query: '',
};

type searchStoreType = SearchState & SearchActions;

const useSearchStore = create<searchStoreType>()(
  devtools(
    combine<SearchState, SearchActions>(initialState, set => ({
      setSearchQuery: (query: string) => set({ query }),
    }))
  )
);

export default useSearchStore;
