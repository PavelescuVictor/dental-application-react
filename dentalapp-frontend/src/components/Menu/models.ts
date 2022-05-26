import {
  AllAccessRoutesTypes,
  OnlyAdminRoutesTypes,
  OnlyAuthenticatedRoutesTypes,
  RouteTypes,
  routePaths,
} from 'routes/models';

export type MenuItemsValue = {
  displayName: string;
  route: string;
};

export type MenuItems = {
  [key in RouteTypes]: MenuItemsValue | null;
};

export const menuItems: MenuItems = {
  [AllAccessRoutesTypes.DEFAULT]: null,
  [AllAccessRoutesTypes.HOME]: { displayName: 'Home', route: routePaths.HOME },
  [AllAccessRoutesTypes.LOGIN]: { displayName: 'Login', route: routePaths.LOGIN },
  [AllAccessRoutesTypes.NOT_FOUND_PAGE]: {
    displayName: 'Not Found Page',
    route: routePaths.NOT_FOUND_PAGE,
  }, //TODO: NOT NEEDED FOR THE MENU ITEMS
  // [OnlyAuthenticatedRoutesTypes.PATIENTS]: { displayName: 'Patients', route: routePaths.PATIENTS },
  [OnlyAuthenticatedRoutesTypes.ORDERS]: { displayName: 'Orders', route: routePaths.ORDERS },
  [OnlyAuthenticatedRoutesTypes.LOGOUT]: { displayName: 'Logout', route: routePaths.LOGOUT },
  [OnlyAuthenticatedRoutesTypes.PROFILE]: { displayName: 'Profile', route: routePaths.PROFILE },
  [OnlyAdminRoutesTypes.ADMIN_PAGE]: { displayName: 'Admin', route: routePaths.ADMIN_PAGE },
  [OnlyAdminRoutesTypes.DOCTORS]: { displayName: 'Doctors', route: routePaths.DOCTORS },
  // [OnlyAdminRoutesTypes.PATIENTS]: { displayName: 'Patients', route: routePaths.PATIENTS },  //TODO: DISCUSS MORE ABOUT THE PATIENTS LOGIC
  [OnlyAdminRoutesTypes.ADD_DOCTOR]: { displayName: 'ADD_DOCTOR', route: routePaths.ADD_DOCTOR }, //TODO: NOT NEEDED FOR THE MENU ITEMS
  [OnlyAdminRoutesTypes.ADD_ORDER]: { displayName: 'ADD_COTOR', route: routePaths.ADD_ORDER }, //TODO: NOT NEEDED FOR THE MENU ITEMS
};

export type PreferredMenuOrder = {
  [key in RouteTypes]: number;
};

export const preferredMenuOrder: PreferredMenuOrder = {
  [AllAccessRoutesTypes.NOT_FOUND_PAGE]: -1, //TODO: NOT NEEDED FOR THE MENU ITEMS
  [AllAccessRoutesTypes.DEFAULT]: 0,
  [AllAccessRoutesTypes.HOME]: 1,
  [AllAccessRoutesTypes.LOGIN]: 2,
  // [OnlyAuthenticatedRoutesTypes.PATIENTS]: 4, //TODO: DISCUSS MORE ABOUT THE PATIENTS LOGIC
  [OnlyAdminRoutesTypes.DOCTORS]: 5,
  [OnlyAuthenticatedRoutesTypes.ORDERS]: 6,
  [OnlyAuthenticatedRoutesTypes.PROFILE]: 7,
  [OnlyAdminRoutesTypes.ADMIN_PAGE]: 8,
  [OnlyAuthenticatedRoutesTypes.LOGOUT]: 9,
  [OnlyAdminRoutesTypes.ADD_DOCTOR]: -1, //TODO: NOT NEEDED FOR THE MENU ITEMS
  [OnlyAdminRoutesTypes.ADD_ORDER]: -1, //TODO: NOT NEEDED FOR THE MENU ITEMS
};
