import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SessionState {
  isLoggined: boolean;
  username: string | null;
  email: string | null;
  phoneNumber: string | null;
  expirationTime: number | null;
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
  expirationTime: null,
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
        useSessionStore.persist.clearStorage();
        console.log("logout");
        alert("세션이 초기화되었습니당");
      },

      loginSession: ({ username, phoneNumber, email }: LoginParams) => {
        const accessToken = localStorage.getItem("accessToken");

        const expirationTime = Date.now() + 30 * 60 * 1000;

        if (accessToken) {
          set((state) => ({
            ...state,
            isLoggined: true,
            username,
            phoneNumber,
            email,
            expirationTime,
          }));
        }
      },
    }),
    { name: "userSessionStorage" }
  )
);

export default useSessionStore;
