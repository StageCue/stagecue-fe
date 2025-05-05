import { createContext, useContext, useState } from 'react';
import { ManageRecruitFilterType } from '../../hooks/useManagePost';

export type PostSortType = 'RECENT' | 'VIEW' | 'APPLY_COUNT' | 'END_DATE' | null;

interface PostListContextValue {
  page: number;
  setPage: (page: number) => void;
  selectedFilter: ManageRecruitFilterType;
  setSelectedFilter: (filter: ManageRecruitFilterType) => void;
  favoriteFilter: boolean | undefined;
  setFavoriteFilter: (value: boolean | undefined) => void;
  sort: PostSortType | undefined;
  setSort: (sort: PostSortType | undefined) => void;
  sortDirection?: 'ASC' | 'DESC' | undefined;
  setSortDirection: (v: 'ASC' | 'DESC' | undefined) => void;
  term: string | null | undefined;
  setTerm: (term: string | null | undefined) => void;
}

const PostListContext = createContext<PostListContextValue | undefined>(undefined);

export const PostListProvider = ({ children }: { children: React.ReactNode }) => {
  const [page, setPage] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<ManageRecruitFilterType>('전체');
  const [favoriteFilter, setFavoriteFilter] = useState<boolean | undefined>();
  const [sort, setSort] = useState<PostSortType>();
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC' | undefined>();
  const [term, setTerm] = useState<string | null>();

  return (
    <PostListContext.Provider
      value={{
        page,
        setPage,
        selectedFilter,
        setSelectedFilter,
        favoriteFilter,
        setFavoriteFilter,
        sort,
        setSort,
        sortDirection,
        setSortDirection,
        term,
        setTerm,
      }}
    >
      {children}
    </PostListContext.Provider>
  );
};

export const usePostListContext = () => {
  const context = useContext(PostListContext);
  if (!context) throw new Error('usePostListContext must be used within PostListProvider');
  return context;
};
