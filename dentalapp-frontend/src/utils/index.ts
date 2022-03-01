import { RefObject } from 'react';
// import constants from './constants';

export { default as constants } from './constants';
export { default as localStorageManager } from './lsManager';

// export const getImageURL = (
//   imageUrl?: string,
//   width?: number,
//   height?: number,
//   fit: string = 'content'
// ) => {
//   if (imageUrl) return `${constants.BASE_PATH}${imageUrl}?w=${width}&h=${height}&fit=${fit}`;
//   return '';
// };

export const isEmpty = (item: any) => !item || item?.length === 0;
export const isBlank = (x: string | null) => x == null || isEmpty(x);

export const LS_KEYS = {
  exampleKey: 'example-key',
};

export const setOpacity = (value: number, ref: RefObject<HTMLImageElement | HTMLDivElement>) => {
  if (ref.current) ref.current.style.opacity = String(value);
};
