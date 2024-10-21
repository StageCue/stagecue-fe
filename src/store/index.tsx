import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SessionState {
  isLoggined: boolean;
  username: string | null;
  email: string | null;
  phoneNumber: string | null;
}

interface LoginParams {
  username: string;
  email: string;
  phoneNumber: string;
}

interface SessionAction {
  logoutSession: () => void;
  loginSession: ({ username, email, phoneNumber }: LoginParams) => void;
}

const defaultState: SessionState = {
  isLoggined: false,
  username: null,
  email: null,
  phoneNumber: null,
};

const useSessionStore = create(
  persist<SessionState & SessionAction>(
    (set) => ({
      ...defaultState,
      logoutSession: () => {
        set(() => ({
          isLoggined: false,
          username: null,
          email: null,
          phoneNumber: null,
        }));
        localStorage.clear();
      },

      loginSession: ({ username, phoneNumber, email }: LoginParams) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          set((state) => ({
            ...state,
            isLoggined: true,
            username,
            phoneNumber,
            email,
          }));
        }
      },
    }),
    { name: "userSessionStorage" }
  )
);

export default useSessionStore;
