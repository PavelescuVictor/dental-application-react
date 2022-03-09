/* eslint-disable import/prefer-default-export */
import { VALID_TOKEN_THRESHOLD } from './constants';

export const isTokenValid = (userTokenExpiry: string) => {
  const expiryDate = new Date(Date.parse(userTokenExpiry));
  const currentDate = new Date(Date.now());
  const threshHoldDate = new Date(
    expiryDate.setHours(expiryDate.getHours() - VALID_TOKEN_THRESHOLD)
  );
  if (currentDate.getTime() > threshHoldDate.getTime()) return false;
  return true;
};
