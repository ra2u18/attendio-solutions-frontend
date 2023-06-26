import { useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { createStore, StateCreator, StoreApi, useStore } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';

import { COOKIE_KEYS, CookieService } from '@/lib/cookies';
import { verifyAccessToken } from '@/lib/jwt';
import { axiosPrivate } from '@/services/api/axios';
import { socketService } from '@/services/socket/socket.service';
import { UserState } from '@/types/auth';

type State = {
  accessToken: string | undefined;
  sessionId: string | undefined;
  isAuthenticated: boolean;
  user: UserState | undefined;
};

type Action = {
  setAccessToken: (token: State['accessToken']) => void;
  setSessionId: (session: State['sessionId']) => void;

  init: () => void;
  logout: () => void;
};

const authMiddlewares = (f: StateCreator<State & Action>) =>
  devtools(persist(f, { name: 'auth-storage' }), {
    name: 'auth-storage',
    enabled: !import.meta.env.PROD,
  });

const baseStore = (
  set: StoreApi<State & Action>['setState'],
  get: StoreApi<State & Action>['getState']
) => ({
  accessToken: undefined,
  user: undefined,
  sessionId: undefined,
  isAuthenticated: false,

  setAccessToken: async (token: State['accessToken']) => {
    const accessTokenData = async () => {
      try {
        return token ? await verifyAccessToken(token) : undefined;
      } catch (error) {
        return undefined;
      }
    };

    const userData = await accessTokenData();

    if (userData && token) {
      socketService.setupMainSocketConnection(token);
    }

    set({ accessToken: token, user: userData });
  },

  setSessionId: (sessionId: State['sessionId']) => set({ sessionId }),

  init: () => {
    get().setAccessToken(CookieService.get(COOKIE_KEYS.ACCESS_TOKEN));
    get().setSessionId(CookieService.get(COOKIE_KEYS.SESSION_ID));
  },

  logout: async () => {
    const _backendLogout = async () => {
      await axiosPrivate.post('/users/logout', {}, { withCredentials: true });
    };

    await _backendLogout(); // Logout from backend
    socketService.disconnectTenantSocket(); // Disconnect socket
    set({ accessToken: undefined, user: undefined, sessionId: undefined }); // Clear state
  },
});

const authStore = createStore<State & Action>()(authMiddlewares(baseStore));

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

const isAuthenticatedSelector = (state: ExtractState<typeof authStore>) => {
  return Boolean(state.accessToken && state.user);
};
const setAccessTokenSelector = (state: ExtractState<typeof authStore>) => state.setAccessToken;
const setSessionIdSelector = (state: ExtractState<typeof authStore>) => state.setSessionId;
const initSelector = (state: ExtractState<typeof authStore>) => state.init;
const logoutSelector = (state: ExtractState<typeof authStore>) => state.logout;

// Getters
export const getAccessToken = () => accessTokenSelector(authStore.getState());
export const getUser = () => userSelector(authStore.getState());
export const getSessionId = () => sessionIdSelector(authStore.getState());

// Hooks
function useAuthStore<U>(selector: Params<U>[1], equalityFn?: Params<U>[2]) {
  return useStore(authStore, selector, equalityFn);
}

// hooks - state
export const useAccessToken = () => useAuthStore(accessTokenSelector);
export const useSessionId = () => useAuthStore(sessionIdSelector);

// hooks - actions
export const useSetAccessToken = () => useAuthStore(setAccessTokenSelector);
export const useSetSessionId = () => useAuthStore(setSessionIdSelector);
export const useInit = () => useAuthStore(initSelector);

// Will only recompute only if accessToken or user changes
export const useIsAuthenticated = () => useAuthStore(isAuthenticatedSelector, shallow);

export const useLogout = () => {
  const logoutStore = useAuthStore(logoutSelector);
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  return async () => {
    // Execute store logout function
    logoutStore();

    // Additional actions
    navigate('/', { state: location, replace: true });
    queryClient.clear();
  };
};

// Shallow performs a shallow comparison between the previous and new state,
// and if the specific properties that you've selected don't change
// your component will not re-render
export const useUser = () => useAuthStore(userSelector);
export const useRoleAndPermissions = () =>
  useAuthStore(
    (userSelector) => ({
      accessToken: userSelector.accessToken,
      role: userSelector.user?.roleName,
      permissions: userSelector.user?.permissions,
    }),
    shallow
  );
