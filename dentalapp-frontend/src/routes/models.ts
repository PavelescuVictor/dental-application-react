import { ReactElement, ReactNode } from 'react';

// All Access

export enum AllAccessRoutesTypes {
  HOME = 'HOME',
  LOGIN = 'LOGIN',
  NOT_FOUND_PAGE = 'NOT_FOUND_PAGE',
}

export type AllAccessRoutePaths = {
  [key in keyof typeof AllAccessRoutesTypes]: string;
};

export const allAccessRoutePaths: AllAccessRoutePaths = {
  [AllAccessRoutesTypes.HOME]: '/home',
  [AllAccessRoutesTypes.LOGIN]: '/login',
  [AllAccessRoutesTypes.NOT_FOUND_PAGE]: '*',
};

// Only authenticated

export enum OnlyAuthenticatedRoutesTypes {
  DOCTORS = 'DOCTORS',
  PATIENTS = 'PATIENTS',
  ORDERS = 'ORDERS',
  PROFILE = 'PROFILE',
  LOGOUT = 'LOGOUT',
}

export type OnlyAuthenticatedRoutePaths = {
  [key in keyof typeof OnlyAuthenticatedRoutesTypes]: string;
};

export const onlyAuthenticatedRoutePaths: OnlyAuthenticatedRoutePaths = {
  [OnlyAuthenticatedRoutesTypes.DOCTORS]: '/doctors',
  [OnlyAuthenticatedRoutesTypes.PATIENTS]: '/patients',
  [OnlyAuthenticatedRoutesTypes.ORDERS]: '/orders',
  [OnlyAuthenticatedRoutesTypes.PROFILE]: '/profile',
  [OnlyAuthenticatedRoutesTypes.LOGOUT]: '/logout',
};

// Only admin

export enum OnlyAdminRoutesTypes {
  ADMIN_PAGE = 'ADMIN_PAGE',
}

export type OnlyAdminRoutePaths = {
  [key in keyof typeof OnlyAdminRoutesTypes]: string;
};

export const onlyAdminRoutePaths: OnlyAdminRoutePaths = {
  [OnlyAdminRoutesTypes.ADMIN_PAGE]: '/admin-page',
};

export type RoutePaths = AllAccessRoutePaths & OnlyAuthenticatedRoutePaths & OnlyAdminRoutePaths;
export type RouteTypes = AllAccessRoutesTypes | OnlyAuthenticatedRoutesTypes | OnlyAdminRoutesTypes;

export const routePaths: RoutePaths = {
  ...allAccessRoutePaths,
  ...onlyAuthenticatedRoutePaths,
  ...onlyAdminRoutePaths,
};

export enum RouteAccessTypes {
  ALL_ACCESS = 'ALL_ACCESS',
  ONLY_AUTHENTICATED = 'ONLY_AUTHENTICATED',
  ONLY_ADMINS = 'ONLY_ADMINS',
}

export const RouteAccesLevels = {
  [AllAccessRoutesTypes.HOME]: RouteAccessTypes.ALL_ACCESS,
  [AllAccessRoutesTypes.LOGIN]: RouteAccessTypes.ALL_ACCESS,
  [AllAccessRoutesTypes.NOT_FOUND_PAGE]: RouteAccessTypes.ALL_ACCESS,
  [OnlyAuthenticatedRoutesTypes.DOCTORS]: RouteAccessTypes.ONLY_AUTHENTICATED,
  [OnlyAuthenticatedRoutesTypes.PATIENTS]: RouteAccessTypes.ONLY_AUTHENTICATED,
  [OnlyAuthenticatedRoutesTypes.ORDERS]: RouteAccessTypes.ONLY_AUTHENTICATED,
  [OnlyAuthenticatedRoutesTypes.LOGOUT]: RouteAccessTypes.ONLY_AUTHENTICATED,
  [OnlyAuthenticatedRoutesTypes.PROFILE]: RouteAccessTypes.ONLY_AUTHENTICATED,
  [OnlyAdminRoutesTypes.ADMIN_PAGE]: RouteAccessTypes.ONLY_ADMINS,
};
