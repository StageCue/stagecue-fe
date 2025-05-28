import { navigateTo } from '@/utils/navigator';
import { getQueryClient } from '@/utils/queryClientAccessor';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SessionState {
  isLoggined: boolean;
  username: string | null;
  email: string | null;
  birthday: string | null;
  phoneNumber: string | null;
  expirationTime: number | null;
  userType: 'TROUPE' | 'PERFORMER' | null;
}

interface LoginParams {
  username: string;
  email: string;
  phoneNumber: string;
  birthday: string;
  userType?: 'TROUPE' | 'PERFORMER' | null;
}

interface SessionAction {
  logoutSession: () => void;
  loginSession: ({ username, email, phoneNumber, birthday, userType }: LoginParams) => void;
  setUserType: (userType: 'TROUPE' | 'PERFORMER' | null) => void;
}

const defaultState: SessionState = {
  isLoggined: false,
  username: null,
  email: null,
  birthday: null,
  phoneNumber: null,
  expirationTime: null,
  userType: null,
};

const useSessionStore = create(
  persist<SessionState & SessionAction>(
    set => ({
      ...defaultState,

      logoutSession: () => {
        set(() => ({
          isLoggined: false,
          username: null,
          email: null,
          phoneNumber: null,
          birthday: null,
          userType: null,
        }));
        sessionStorage.clear();
        getQueryClient().clear();
        useSessionStore.persist.clearStorage();
        navigateTo('/auth/login');
      },

      loginSession: ({ username, phoneNumber, email, birthday, userType }: LoginParams) => {
        const expirationTime = Date.now() + 30 * 60 * 1000;

        set(state => ({
          ...state,
          isLoggined: true,
          username,
          phoneNumber,
          email,
          birthday,
          expirationTime,
          userType,
        }));
      },

      setUserType: (userType: 'TROUPE' | 'PERFORMER' | null) => {
        set(state => ({
          ...state,
          userType,
        }));
      },
    }),
    { name: 'userSessionStorage', storage: createJSONStorage(() => sessionStorage) }
  )
);

export default useSessionStore;
