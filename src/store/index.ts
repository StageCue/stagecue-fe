import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SessionState {
  isLoggined: boolean;
  username: string | null;
  email: string | null;
  phoneNumber: string | null;
  expirationTime: number | null;
  userType: "TROUPE" | "PERFORMER" | null;
}

interface LoginParams {
  username: string;
  email: string;
  phoneNumber: string;
  userType: "TROUPE" | "PERFORMER";
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
  userType: null,
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
      },

      loginSession: ({
        username,
        phoneNumber,
        email,
        userType,
      }: LoginParams) => {
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
            userType,
          }));
        }
      },
    }),
    { name: "userSessionStorage" }
  )
);

export default useSessionStore;
