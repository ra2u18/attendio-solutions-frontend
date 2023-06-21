import Cookies from 'js-cookie';

export const COOKIE_KEYS = {
  ACCESS_TOKEN: 'token', // these can't be manipulated by JS -> http_only cookies
  SESSION_ID: 'sessionId', // -> http_only cookies
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
    Object.values(COOKIE_KEYS).forEach((value) => {
      CookieService.remove(value as KeyType);
    });
  },
};
