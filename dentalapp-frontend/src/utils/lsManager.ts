import LocalStorage from './ls';

const getLS = () => window.localStorage || new LocalStorage();

export const localStorageManager = {
  set: (key: string, value: any) => {
    const ls = getLS();

    ls.setItem(key, JSON.stringify(value));
  },
  get: (key: string) => {
    const ls = getLS();

    const item = ls.getItem(key);
    if (item && item !== 'undefined') {
      try {
        return JSON.parse(item);
      } catch (e) {
        return '';
      }
    }
    return '';
  },
  removeAll: () => {
    const ls = getLS();

    return ls.clear();
  },
  removeItem: (key: string) => {
    const ls = getLS();

    return ls.removeItem(key);
  },
};

export default localStorageManager;
