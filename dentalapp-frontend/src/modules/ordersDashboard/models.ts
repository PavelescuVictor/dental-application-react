// All access tabs

export enum AllAccessOrdersTabsTypes {
  LIST = 'LIST',
  DETAILS = 'DETAILS',
}

export type AllAccessOrdersTabsDisplayNames = {
  [key in keyof typeof AllAccessOrdersTabsTypes]: string;
};

export const allAccessOrdersDisplayNames: AllAccessOrdersTabsDisplayNames = {
  [AllAccessOrdersTabsTypes.LIST]: 'List',
  [AllAccessOrdersTabsTypes.DETAILS]: 'Details',
};

// Only Admin Tabs

export enum OnlyAdminOrdersTabsTypes {
  EDIT = 'EDIT',
  ADD = 'ADD',
}

export type OnlyAdminOrdersTabsDisplayName = {
  [key in keyof typeof OnlyAdminOrdersTabsTypes]: string;
};

export const onlyAdminOrdersTabsDisplayNames: OnlyAdminOrdersTabsDisplayName = {
  [OnlyAdminOrdersTabsTypes.EDIT]: 'Edit',
  [OnlyAdminOrdersTabsTypes.ADD]: 'Add',
};

export type OrderTabsDisplayNames = AllAccessOrdersTabsDisplayNames &
  OnlyAdminOrdersTabsDisplayName;
export type OrdersTabsTypes = AllAccessOrdersTabsTypes | OnlyAdminOrdersTabsTypes;

export const ordersTabsDisplayNames: OrderTabsDisplayNames = {
  ...allAccessOrdersDisplayNames,
  ...onlyAdminOrdersTabsDisplayNames,
};

export enum TabsAccessTypes {
  ALL_ACCESS = 'ALL_ACCESS',
  ONLY_ADMINS = 'ONLY_ADMINS',
}

export const OrdersDashboardTabsAccess = {
  [AllAccessOrdersTabsTypes.LIST]: TabsAccessTypes.ALL_ACCESS,
  [AllAccessOrdersTabsTypes.DETAILS]: TabsAccessTypes.ONLY_ADMINS,
  [OnlyAdminOrdersTabsTypes.EDIT]: TabsAccessTypes.ONLY_ADMINS,
  [OnlyAdminOrdersTabsTypes.ADD]: TabsAccessTypes.ONLY_ADMINS,
};

export default {};
