/* eslint-disable @typescript-eslint/no-use-before-define */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'store/models';
import { orderTypeEntryManagerAPI } from 'api';
import { initialStateOrderTypeEntryManager, ORDER_TYPE_ENTRY_MANAGER_KEY } from './constants';
import {
  OrderTypeEntryManagerState,
  OrderTypeEntry,
  AddOrderTypeEntryPayload,
  EditOrderTypeEntryPayload,
  RemoveOrderTypeEntryPayload,
} from './models';

const requestOrderTypeEntryColors = createAsyncThunk(
  'orderTypeEntryManager/requestOrderTypeEntryColors',
  async (_, thunkAPI) => {
    try {
      const { userToken } = (thunkAPI.getState() as RootState).userManager;
      const response = orderTypeEntryManagerAPI.requestOrderTypeEntryColors(userToken as string);
      return response;
    } catch (error) {
      thunkAPI.dispatch(orderTypeEntryManagerSlice.actions.resetOrderTypeEntryColors());
      console.log('Request Order Type Entry Colors Error: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const requestOrderTypeEntryStatus = createAsyncThunk(
  'orderTypeEntryManager/requestOrderTypeEntryStatus',
  async (_, thunkAPI) => {
    try {
      const { userToken } = (thunkAPI.getState() as RootState).userManager;
      const response = orderTypeEntryManagerAPI.requestOrderTypeEntryStatus(userToken as string);
      return response;
    } catch (error) {
      thunkAPI.dispatch(orderTypeEntryManagerSlice.actions.resetOrderTypeEntryStatus());
      console.log('Request Order Type Entry Status Error: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const requestOrderTypeEntries = createAsyncThunk(
  'orderTypeEntryManager/requestOrderTypeEntries',
  async (_, thunkAPI) => {
    try {
      const { userToken } = (thunkAPI.getState() as RootState).userManager;
      const response = orderTypeEntryManagerAPI.requestOrderTypeEntries(userToken as string);
      return response;
    } catch (error) {
      thunkAPI.dispatch(orderTypeEntryManagerSlice.actions.resetOrderTypeEntries());
      console.log('Request Order Type Entries Error: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const addOrderTypeEntry = createAsyncThunk(
  'orderTypeEntryManager/addOrderTypeEntry',
  async (addOrderTypeEntryPayload: AddOrderTypeEntryPayload, thunkAPI) => {
    try {
      const { user, userToken } = (thunkAPI.getState() as RootState).userManager;
      const response = orderTypeEntryManagerAPI.addOrderTypeEntry(
        userToken as string,
        addOrderTypeEntryPayload,
        user?.id as string
      );
      return response;
    } catch (error) {
      console.log('Add Order Type Entry Error: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const removeOrderTypeEntry = createAsyncThunk(
  'orderTypeEntryManager/removeOrderTypeEntry',
  async (removeOrderTypeEntryPayload: RemoveOrderTypeEntryPayload, thunkAPI) => {
    try {
      const { userToken } = (thunkAPI.getState() as RootState).userManager;
      const response = orderTypeEntryManagerAPI.removeOrderTypeEntry(
        userToken as string,
        removeOrderTypeEntryPayload
      );
      return response;
    } catch (error) {
      console.log('Remove Order Type Entry Error:');
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const editOrderTypeEntry = createAsyncThunk(
  'orderTypeEntryManager/editOrderTypeEntry',
  async (editOrderTypeEntryPayload: EditOrderTypeEntryPayload, thunkAPI) => {
    try {
      const { user, userToken } = (thunkAPI.getState() as RootState).userManager;
      const response = orderTypeEntryManagerAPI.editOrderTypeEntry(
        userToken as string,
        editOrderTypeEntryPayload,
        user?.id as string
      );
      return response;
    } catch (error) {
      console.log('Edit Order Type Entry Error: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const orderTypeEntryManagerSlice = createSlice({
  name: ORDER_TYPE_ENTRY_MANAGER_KEY,
  initialState: initialStateOrderTypeEntryManager,
  reducers: {
    setOrderTypeEntries(
      state: OrderTypeEntryManagerState,
      action: PayloadAction<OrderTypeEntry[]>
    ) {
      state.orderTypeEntries = action.payload;
    },

    addOrderTypeEntry(state: OrderTypeEntryManagerState, action: PayloadAction<OrderTypeEntry>) {
      state.orderTypeEntries.push(action.payload);
    },

    removeOrderTypeEntry(state: OrderTypeEntryManagerState, action: PayloadAction<number>) {
      state.orderTypeEntries = state.orderTypeEntries.filter(
        (order: OrderTypeEntry) => order.id !== action.payload
      );
    },

    editOrderTypeEntry(state: OrderTypeEntryManagerState, action: PayloadAction<OrderTypeEntry>) {
      state.orderTypeEntries = state.orderTypeEntries.filter((order: OrderTypeEntry) =>
        order.id === action.payload.id ? action.payload : order
      );
    },

    resetOrderTypeEntryColors(state: OrderTypeEntryManagerState) {
      state.orderTypeEntryColors = initialStateOrderTypeEntryManager.orderTypeEntryColors;
    },

    resetOrderTypeEntryStatus(state: OrderTypeEntryManagerState) {
      state.orderTypeEntryStatus = initialStateOrderTypeEntryManager.orderTypeEntryStatus;
    },

    resetOrderTypeEntries(state: OrderTypeEntryManagerState) {
      state.orderTypeEntries = initialStateOrderTypeEntryManager.orderTypeEntries;
    },

    setFilteredOrderTypeEntries(
      state: OrderTypeEntryManagerState,
      action: PayloadAction<OrderTypeEntry[]>
    ) {
      state.filteredOrderTypeEntries = action.payload;
    },

    resetFilteredOrderTypeEntries(state: OrderTypeEntryManagerState) {
      state.filteredOrderTypeEntries = [];
    },

    resetSelectedOrderTypeEntry(state: OrderTypeEntryManagerState) {
      state.selectedOrderTypeEntry = initialStateOrderTypeEntryManager.selectedOrderTypeEntry;
      state.hasSelectedOrderTypeEntry = false;
    },

    setSelectedOrderTypeEntry(state: OrderTypeEntryManagerState, action: PayloadAction<number>) {
      state.selectedOrderTypeEntry = action.payload;
      state.hasSelectedOrderTypeEntry = true;
    },
  },
  extraReducers: (builder) => {
    // Request Order Type Entries
    builder.addCase(requestOrderTypeEntries.pending, (state: OrderTypeEntryManagerState) => {
      state.isLoadingOrderTypeEntries = true;
    });

    builder.addCase(
      requestOrderTypeEntries.fulfilled,
      (state: OrderTypeEntryManagerState, { payload }: PayloadAction<any>) => {
        state.orderTypeEntries = payload.data.results;
        state.isLoadingOrderTypeEntries = false;
        state.hasErrorLoadingOrderTypeEntries = false;
      }
    );

    builder.addCase(
      requestOrderTypeEntries.rejected,
      (state: OrderTypeEntryManagerState, action: PayloadAction<any>) => {
        state.hasErrorLoadingOrderTypeEntries = true;
        state.isLoadingOrderTypeEntries = false;
      }
    );

    // Add Order Type Entry
    builder.addCase(
      addOrderTypeEntry.fulfilled,
      (state: OrderTypeEntryManagerState, { payload }: PayloadAction<any>) => {
        state.orderTypeEntries.push(payload.data.results);
      }
    );

    builder.addCase(
      addOrderTypeEntry.rejected,
      (state: OrderTypeEntryManagerState, action: PayloadAction<any>) => {
        state.hasErrorAddingOrderTypeEntry = true;
      }
    );

    // Edit Order Type Entry
    builder.addCase(
      editOrderTypeEntry.fulfilled,
      (state: OrderTypeEntryManagerState, { payload }: PayloadAction<any>) => {
        state.orderTypeEntries.filter((orderTypeEntry: OrderTypeEntry) =>
          orderTypeEntry.id === payload.id ? payload : orderTypeEntry
        );
      }
    );

    builder.addCase(
      editOrderTypeEntry.rejected,
      (state: OrderTypeEntryManagerState, action: PayloadAction<any>) => {
        state.hasErrorEditingOrderTypeEntry = true;
      }
    );

    // Remove Order
    builder.addCase(
      removeOrderTypeEntry.fulfilled,
      (state: OrderTypeEntryManagerState, { payload }: PayloadAction<any>) => {
        state.orderTypeEntries = state.orderTypeEntries.filter(
          (orderTypeEntry: OrderTypeEntry) => orderTypeEntry.id !== payload.orderId
        );
      }
    );

    builder.addCase(
      removeOrderTypeEntry.rejected,
      (state: OrderTypeEntryManagerState, action: PayloadAction<any>) => {
        state.hasErrorRemovingOrderTypeEntry = true;
      }
    );
  },
});

export const orderTypeEntryManagerReducer = orderTypeEntryManagerSlice.reducer;

export const orderTypeEntryManagerActions = {
  ...orderTypeEntryManagerSlice.actions,
};

export const orderTypeEntryManagerAsyncThunk = {
  requestOrderTypeEntryColors,
  requestOrderTypeEntryStatus,
  requestOrderTypeEntries,
  addOrderTypeEntry,
  removeOrderTypeEntry,
  editOrderTypeEntry,
};
