import { createStore, StateCreator, StoreApi, useStore } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';

import { COOKIE_KEYS, CookieService } from '@/lib/cookies';
import { verifyAccessToken } from '@/lib/jwt';
import { UserState } from '@/types/auth';

type State = {
  accessToken: string | undefined;
  sessionId: string | undefined;
  user: UserState | undefined;

  actions: {
    setAccessToken: (token: State['accessToken']) => void;
    setSessionId: (session: State['sessionId']) => void;

    init: () => void;
    clear: () => void;
  };
};

const authMiddlewares = (f: StateCreator<State>) =>
  devtools(persist(f, { name: 'auth-storage' }), {
    name: 'auth-storage',
  });

const store = (set: StoreApi<State>['setState'], get: StoreApi<State>['getState']) => ({
  accessToken: undefined,
  user: undefined,
  sessionId: undefined,
  actions: {
    setAccessToken: async (token: State['accessToken']) => {
      const accessTokenData = async () => {
        try {
          return token ? await verifyAccessToken(token) : undefined;
        } catch (error) {
          console.log(error);
          return undefined;
        }
      };

      set({ accessToken: token, user: await accessTokenData() });
    },

    setSessionId: (sessionId: State['sessionId']) => set({ sessionId }),
    init: () => {
      const { setAccessToken, setSessionId } = get().actions;

      setAccessToken(CookieService.get(COOKIE_KEYS.ACCESS_TOKEN));
      setSessionId(CookieService.get(COOKIE_KEYS.SESSION_ID));
    },
    clear: () =>
      set({
        accessToken: undefined,
        user: undefined,
        sessionId: undefined,
      }),
  },
});

const authStore = createStore<State>()(authMiddlewares(store));

/**
 * Rules of zustand:
 * https://tkdodo.eu/blog/working-with-zustand#separate-actions-from-state
 * https://doichevkostia.dev/blog/authentication-store-with-zustand/
 */
export type ExtractState<S> = S extends {
  getState: () => infer T;
}
  ? T
  : never;

type Params<U> = Parameters<typeof useStore<typeof authStore, U>>;

// Selectors
const accessTokenSelector = (state: ExtractState<typeof authStore>) => state.accessToken;
const userSelector = (state: ExtractState<typeof authStore>) => state.user;
const sessionIdSelector = (state: ExtractState<typeof authStore>) => state.sessionId;
const actionsSelector = (state: ExtractState<typeof authStore>) => state.actions;

// Getters
export const getAccessToken = () => accessTokenSelector(authStore.getState());
export const getUser = () => userSelector(authStore.getState());
export const getSessionId = () => sessionIdSelector(authStore.getState());
export const getActions = () => actionsSelector(authStore.getState());

function useAuthStore<U>(selector: Params<U>[1], equalityFn?: Params<U>[2]) {
  return useStore(authStore, selector, equalityFn);
}

// Hooks
export const useAccessToken = () => useAuthStore(accessTokenSelector);
export const useSessionId = () => useAuthStore(sessionIdSelector);

// Shallow performs a shallow comparison between the previous and new state,
// and if the specific properties that you've selected don't change
// your component will not re-render
export const useUser = () => useAuthStore(userSelector, shallow);
export const useActions = () => useAuthStore(actionsSelector);
