import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SessionState {
  isLoggined: boolean;
}

interface SessionAction {
  logoutSession: () => void;
  loginSession: () => void;
}

const defaultState: SessionState = {
  isLoggined: false,
};

const useSessionStore = create(
  persist<SessionState & SessionAction>(
    (set) => ({
      ...defaultState,
      logoutSession: () => set((state) => ({ ...state, isLoggined: false })),
      loginSession: () => set((state) => ({ ...state, isLoggined: true })),
    }),
    { name: "userSessionStorage" }
  )
);

export default useSessionStore;
