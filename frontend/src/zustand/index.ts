import { type User } from '@prisma-app/client';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type UserStore = {
  user: Omit<User, 'password'> | null;
  token: string | null;
  setUser: (data: User | null) => void;
  setToken: (token: string | null) => void;
};

export const userInitialStore: Omit<User, 'password'> = {
  id: '',
  firstName: '',
  lastName: '',
  gender: 'MALE',
  email: '',
  phone: '',
  address: '',
  role: 'CLIENT',
  avatar: '',
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      token: '',
      setUser: (data: Omit<User, 'password'> | null) =>
        set(() => ({
          user: data,
        })),
      setToken: (token: string | null) => set(() => ({ token })),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => sessionStorage),
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...(persistedState as UserStore),
      }),
    },
  ),
);
