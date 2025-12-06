import { create } from 'zustand'
import { IAuthState, TAuthStatus } from './types'
export const useAuth = create<IAuthState>((set) => ({
    user: null,
    authStatus: 'idle',
    setStatus: (authStatus: TAuthStatus) => set({authStatus}),
    setUser: (user) => set({ user }),
    applySignedIn: (user) =>
    set({
      user,
      authStatus: "authenticated",
    }),

    applySignedOut: () =>
    set({
    user: null,
    authStatus: "unauthenticated",
    }),

})
)