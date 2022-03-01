import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ExampleState {
  exampleProp: string | null;
}

export const EXAMPLE_KEY = 'example';

const initialStateExample: ExampleState = {
  exampleProp: '',
};

export const exampleSlice = createSlice({
  name: EXAMPLE_KEY,
  initialState: initialStateExample,
  reducers: {
    setProp: (state: ExampleState, action: PayloadAction<string>) => {
      state.exampleProp = action.payload;
    },
  },
});

export const exampleReducer = exampleSlice.reducer;

export const exampleActions = {
  ...exampleSlice.actions,
};
