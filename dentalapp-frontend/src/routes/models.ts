// All Access

export enum AllAccessRoutesTypes {
  DEFAULT = 'DEFAULT',
  HOME = 'HOME',
  LOGIN = 'LOGIN',
  NOT_FOUND_PAGE = 'NOT_FOUND_PAGE',
}

export type AllAccessRoutePaths = {
  [key in keyof typeof AllAccessRoutesTypes]: string;
};

export const allAccessRoutePaths: AllAccessRoutePaths = {
  [AllAccessRoutesTypes.DEFAULT]: '/',
  [AllAccessRoutesTypes.HOME]: '/home',
  [AllAccessRoutesTypes.LOGIN]: '/login',
  [AllAccessRoutesTypes.NOT_FOUND_PAGE]: '*',
};

// Only authenticated

export enum OnlyAuthenticatedRoutesTypes {
  ORDERS = 'ORDERS',
  PROFILE = 'PROFILE',
  LOGOUT = 'LOGOUT',
}

export type OnlyAuthenticatedRoutePaths = {
  [key in keyof typeof OnlyAuthenticatedRoutesTypes]: string;
};

export const onlyAuthenticatedRoutePaths: OnlyAuthenticatedRoutePaths = {
  [OnlyAuthenticatedRoutesTypes.ORDERS]: '/orders',
  [OnlyAuthenticatedRoutesTypes.PROFILE]: '/profile',
  [OnlyAuthenticatedRoutesTypes.LOGOUT]: '/logout',
};

// Only admin

export enum OnlyAdminRoutesTypes {
  ADMIN_PAGE = 'ADMIN_PAGE',
  DOCTORS = 'DOCTORS',
  // PATIENTS = 'PATIENTS',
  ADD_DOCTOR = 'ADD_DOCTOR',
  // ADD_PATIENT = 'ADD_PATIENT',
  ADD_ORDER = 'ADD_ORDER',
}

export type OnlyAdminRoutePaths = {
  [key in keyof typeof OnlyAdminRoutesTypes]: string;
};

export const onlyAdminRoutePaths: OnlyAdminRoutePaths = {
  [OnlyAdminRoutesTypes.ADMIN_PAGE]: '/admin-page',
  [OnlyAdminRoutesTypes.DOCTORS]: '/doctors',
  // [OnlyAuthenticatedRoutesTypes.PATIENTS]: '/patients',
  [OnlyAdminRoutesTypes.ADD_DOCTOR]: '/add-doctor',
  // [OnlyAdminRoutesTypes.ADD_PATIENT]: '/add-patient',
  [OnlyAdminRoutesTypes.ADD_ORDER]: '/add-order',
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
  [AllAccessRoutesTypes.DEFAULT]: RouteAccessTypes.ALL_ACCESS,
  [AllAccessRoutesTypes.HOME]: RouteAccessTypes.ALL_ACCESS,
  [AllAccessRoutesTypes.LOGIN]: RouteAccessTypes.ALL_ACCESS,
  [AllAccessRoutesTypes.NOT_FOUND_PAGE]: RouteAccessTypes.ALL_ACCESS,
  [OnlyAuthenticatedRoutesTypes.ORDERS]: RouteAccessTypes.ONLY_AUTHENTICATED,
  [OnlyAuthenticatedRoutesTypes.LOGOUT]: RouteAccessTypes.ONLY_AUTHENTICATED,
  [OnlyAuthenticatedRoutesTypes.PROFILE]: RouteAccessTypes.ONLY_AUTHENTICATED,
  [OnlyAdminRoutesTypes.DOCTORS]: RouteAccessTypes.ONLY_ADMINS,
  // [OnlyAdminRoutesTypes.PATIENTS]: RouteAccessTypes.ONLY_ADMINS,
  [OnlyAdminRoutesTypes.ADMIN_PAGE]: RouteAccessTypes.ONLY_ADMINS,
  [OnlyAdminRoutesTypes.ADD_DOCTOR]: RouteAccessTypes.ONLY_ADMINS,
  // [OnlyAdminRoutesTypes.ADD_PATIENT]: RouteAccessTypes.ONLY_ADMINS,
  [OnlyAdminRoutesTypes.ADD_ORDER]: RouteAccessTypes.ONLY_ADMINS,
};
