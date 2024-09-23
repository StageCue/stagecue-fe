import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SessionState {
  isLoggined: boolean;
  username: string | null;
}

interface SessionAction {
  logoutSession: () => void;
  loginSession: () => void;
  setUsername: (useranme: string) => void;
}

const defaultState: SessionState = {
  isLoggined: false,
  username: null,
};

const useSessionStore = create(
  persist<SessionState & SessionAction>(
    (set) => ({
      ...defaultState,
      logoutSession: () =>
        set((state) => ({ ...state, isLoggined: false, username: null })),
      loginSession: () => set((state) => ({ ...state, isLoggined: true })),
      setUsername: (username: string) =>
        set((state) => ({ ...state, username })),
    }),
    { name: "userSessionStorage" }
  )
);

export default useSessionStore;
