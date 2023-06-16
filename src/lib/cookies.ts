import Cookies from 'js-cookie';

export const COOKIE_KEYS = {
  ACCESS_TOKEN: 'token',
  SESSION_ID: 'session_id',
} as const;

type KeyType = (typeof COOKIE_KEYS)[keyof typeof COOKIE_KEYS];

export const CookieService = {
  get: (key: KeyType): string | undefined => {
    return Cookies.get(key);
  },

  set: (key: KeyType, value: string, opts?: Cookies.CookieAttributes): void => {
    Cookies.set(key, value, opts);
  },

  remove: (key: KeyType, options?: Cookies.CookieAttributes): void => {
    Cookies.remove(key, options);
  },

  clear: (): void => {
    Object.keys(COOKIE_KEYS).map((key) => CookieService.remove(key as KeyType));
  },
};
