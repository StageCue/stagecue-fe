import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SessionState {
  isLoggined: boolean;
  username: string | null;
  email: string | null;
  phoneNumber: string | null;
}

interface SessionAction {
  logoutSession: () => void;
  loginSession: () => void;
  setUsername: (useranme: string) => void;
  setEmail: (email: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
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
      logoutSession: () =>
        set((state) => ({ ...state, isLoggined: false, username: null })),
      loginSession: () => set((state) => ({ ...state, isLoggined: true })),
      setUsername: (username: string) =>
        set((state) => ({ ...state, username })),
      setEmail: (email: string) => set((state) => ({ ...state, email })),
      setPhoneNumber: (phoneNumber: string) =>
        set((state) => ({ ...state, phoneNumber })),
    }),
    { name: "userSessionStorage" }
  )
);

export default useSessionStore;
