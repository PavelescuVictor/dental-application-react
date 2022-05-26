import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

export type RootState = ReturnType<typeof rootReducer>;
export type Dispatch = ThunkDispatch<RootState, void, AnyAction>;
