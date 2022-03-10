import { Routes, Route } from 'react-router-dom';
import React, { Fragment, lazy } from 'react';
import {
  routePaths,
  RouteTypes,
  AllAccessRoutesTypes,
  OnlyAdminRoutesTypes,
  OnlyAuthenticatedRoutesTypes,
} from './models';

export const renderRoutes = (routesList: RouteItemType[] = []) => (
  <Routes>
    {routesList.map((route: RouteItemType) => {
      const Component = route.component || Fragment;
      const Guard = route.guard || Fragment;
      const Layout = route.layout || Fragment;
      const elementToRender = (
        <Guard>
          <Layout> {route.routes ? renderRoutes(route.routes) : <Component />}</Layout>
        </Guard>
      );
      return <Route key={route.path} path={route.path} element={elementToRender} />;
    })}
  </Routes>
);

interface RouteItemType {
  exact: boolean;
  path: string;
  routeType: RouteTypes;
  guard?: React.ComponentType;
  routes?: RouteItemType[];
  layout?: React.ComponentType;
  component: React.ComponentType;
}

type RoutesList = RouteItemType[];

const allAccessRoutes: RouteItemType[] = [
  {
    exact: true,
    path: routePaths.DEFAULT,
    routeType: AllAccessRoutesTypes.HOME,
    component: lazy(() => import('modules/home')),
  },
  {
    exact: true,
    path: routePaths.HOME,
    routeType: AllAccessRoutesTypes.HOME,
    component: lazy(() => import('modules/home')),
  },
  {
    exact: true,
    path: routePaths.LOGIN,
    routeType: AllAccessRoutesTypes.LOGIN,
    component: lazy(() => import('modules/login')),
  },
  {
    exact: false,
    path: routePaths.NOT_FOUND_PAGE,
    routeType: AllAccessRoutesTypes.NOT_FOUND_PAGE,
    component: lazy(() => import('modules/notFoundPage')),
  },
];

const onlyAuthenticatedRoutes: RouteItemType[] = [
  {
    exact: true,
    path: routePaths.DOCTORS,
    routeType: OnlyAuthenticatedRoutesTypes.DOCTORS,
    component: () => null,
  },
  {
    exact: true,
    path: routePaths.PATIENTS,
    routeType: OnlyAuthenticatedRoutesTypes.PATIENTS,
    component: () => null,
  },
  {
    exact: true,
    path: routePaths.ORDERS,
    routeType: OnlyAuthenticatedRoutesTypes.ORDERS,
    component: () => null,
  },
  {
    exact: true,
    path: routePaths.LOGOUT,
    routeType: OnlyAuthenticatedRoutesTypes.LOGOUT,
    component: () => null,
  },
  {
    exact: true,
    path: routePaths.PROFILE,
    routeType: OnlyAuthenticatedRoutesTypes.PROFILE,
    component: () => null,
  },
];

const onlyAdminRoutes: RouteItemType[] = [
  {
    exact: true,
    path: routePaths.ADMIN_PAGE,
    routeType: OnlyAdminRoutesTypes.ADMIN_PAGE,
    component: () => null,
  },
];

const routes: RoutesList = [...allAccessRoutes, ...onlyAuthenticatedRoutes, ...onlyAdminRoutes];

export default routes;
