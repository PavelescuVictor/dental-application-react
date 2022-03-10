import { ReactChild, ReactNode } from 'react';

export interface PageProps {
  className?: string;
  children: ReactNode | ReactChild;
  viewType: ViewType;
}

export enum ViewType {
  FULL_VIEWPORT = 'FULL_VIEWPORT',
  LEFT_SIDE_CONTENT = 'LEFT_SIDE_CONTENT',
  RIGHT_SIDE_CONTENT = 'RIGHT_SIDE_CONTENT',
}

export interface StyledPageProps {
  viewType: ViewType;
}
