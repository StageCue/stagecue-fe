import { ApplyFilter, PassType } from '@/pages/biz/types/applicants';
import { createContext, useContext, useState, useMemo, ReactNode, Dispatch, SetStateAction } from 'react';

interface ShowingApplicantState {
  id: number;
  name: string;
}

interface ApplicantContextValue {
  page: number;
  setPage: (n: number) => void;
  selectedFilter: ApplyFilter;
  setSelectedFilter: (f: ApplyFilter) => void;
  selectedApplyIds: { id: number; name: string }[];
  setSelectedApplyIds: Dispatch<SetStateAction<{ id: number; name: string }[]>>;
  passType?: PassType;
  setPassType: (type?: PassType) => void;
  isPassModalOpen: boolean;
  setIsPassModalOpen: (v: boolean) => void;
  isFailModalOpen: boolean;
  setIsFailModalOpen: (v: boolean) => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (v: boolean) => void;
  showingApplicant?: ShowingApplicantState;
  setShowingApplicant: (s?: ShowingApplicantState) => void;
  favoriteFilter: boolean | undefined;
  setFavoriteFilter: (v: boolean | undefined) => void;
}

const ApplicantContext = createContext<ApplicantContextValue | null>(null);

export const ApplicantProvider = ({ children }: { children: ReactNode }) => {
  const [page, setPage] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<ApplyFilter>('전체');
  const [favoriteFilter, setFavoriteFilter] = useState<boolean | undefined>();
  const [selectedApplyIds, setSelectedApplyIds] = useState<{ id: number; name: string }[]>([]);
  const [passType, setPassType] = useState<PassType>();
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);
  const [isFailModalOpen, setIsFailModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [showingApplicant, setShowingApplicant] = useState<ShowingApplicantState>();

  const value = useMemo(
    () => ({
      page,
      setPage,
      selectedFilter,
      setSelectedFilter,
      selectedApplyIds,
      setSelectedApplyIds,
      passType,
      setPassType,
      isPassModalOpen,
      setIsPassModalOpen,
      isFailModalOpen,
      setIsFailModalOpen,
      isProfileModalOpen,
      setIsProfileModalOpen,
      showingApplicant,
      setShowingApplicant,
      favoriteFilter,
      setFavoriteFilter,
    }),
    [
      page,
      selectedFilter,
      selectedApplyIds,
      passType,
      isPassModalOpen,
      isFailModalOpen,
      isProfileModalOpen,
      showingApplicant,
      favoriteFilter,
      setFavoriteFilter,
    ]
  );

  return <ApplicantContext.Provider value={value}>{children}</ApplicantContext.Provider>;
};

export const useApplicantContext = () => {
  const context = useContext(ApplicantContext);
  if (!context) throw new Error('useApplicantContext must be used within an ApplicantProvider');
  return context;
};
