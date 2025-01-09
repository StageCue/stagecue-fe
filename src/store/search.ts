import { create } from "zustand";

interface SearchState {
  query: string | null;
  setSearchQuery: ({ query }: { query: string | null }) => void;
}

const useSearchStore = create<SearchState>((set) => ({
  query: "",

  setSearchQuery: ({ query }) => {
    set({ query });
  },
}));

export default useSearchStore;
