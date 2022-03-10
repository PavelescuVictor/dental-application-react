import { useCallback } from 'react';
import { useAppDispatch } from 'store/store';
import { unwrapResult } from '@reduxjs/toolkit';

const useUnwrapAsyncThunk = () => {
  const dispatch = useAppDispatch();
  return useCallback((asyncThunk) => dispatch(asyncThunk).then(unwrapResult), [dispatch]);
};

export default useUnwrapAsyncThunk;
