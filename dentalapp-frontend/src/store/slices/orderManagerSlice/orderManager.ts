/* eslint-disable @typescript-eslint/no-use-before-define */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'store/rootReducer';
import { orderManagerAPI } from 'api';
import { initialStateOrderManager, ORDER_MANAGER_KEY } from './constants';
import {
  OrderManagerState,
  Order,
  AddOrderPayload,
  EditOrderPayload,
  RemoveOrderPayload,
  AddOrderTypeEntryPayload,
  EditOrderTypeEntryPayload,
  RemoveOrderTypeEntryPayload,
} from './models';
import { OrdersDashboardTabs } from 'modules/ordersDashboard/models';

const requestOrders = createAsyncThunk('orderManager/requestOrders', async (_, thunkAPI) => {
  try {
    const { userToken } = (thunkAPI.getState() as RootState).userManager;
    const response = orderManagerAPI.requestOrders(userToken);
    return response;
  } catch (error) {
    thunkAPI.dispatch(orderManagerSlice.actions.resetOrders());
    console.log('Request Orders Error: ', error);
    return thunkAPI.rejectWithValue(error);
  }
});

const addOrder = createAsyncThunk(
  'orderManager/addOrder',
  async (addOrderPayload: AddOrderPayload, thunkAPI) => {
    try {
      const { user, userToken } = (thunkAPI.getState() as RootState).userManager;
      const response = orderManagerAPI.addOrder(userToken, addOrderPayload, user.id);
      return response;
    } catch (error) {
      console.log('Add Order Error: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const removeOrder = createAsyncThunk(
  'orderManager/removeOrder',
  async (removeOrderPayload: RemoveOrderPayload, thunkAPI) => {
    try {
      const { userToken } = (thunkAPI.getState() as RootState).userManager;
      const response = orderManagerAPI.removeOrder(userToken, removeOrderPayload);
      return response;
    } catch (error) {
      console.log('Remove Order Error:');
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const editOrder = createAsyncThunk(
  'orderManager/editOrder',
  async (editDoctorPayload: EditOrderPayload, thunkAPI) => {
    try {
      const { user, userToken } = (thunkAPI.getState() as RootState).userManager;
      const response = orderManagerAPI.editOrder(userToken as string, editDoctorPayload);
      return response;
    } catch (error) {
      console.log('Edit Order Error: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const requestOrderTypeEntryColors = createAsyncThunk(
  'orderTypeEntryManager/requestOrderTypeEntryColors',
  async (_, thunkAPI) => {
    try {
      const { userToken } = (thunkAPI.getState() as RootState).userManager;
      const response = orderManagerAPI.requestOrderTypeEntryColors(userToken as string);
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
      const response = orderManagerAPI.requestOrderTypeEntryStatus(userToken as string);
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
      const response = orderManagerAPI.requestOrderTypeEntries(userToken as string);
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
      const response = orderManagerAPI.addOrderTypeEntry(
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
      const response = orderManagerAPI.removeOrderTypeEntry(
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
      const response = orderManagerAPI.editOrderTypeEntry(
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

export const orderManagerSlice = createSlice({
  name: ORDER_MANAGER_KEY,
  initialState: initialStateOrderManager,
  reducers: {
    setOrders(state: OrderManagerState, action: PayloadAction<Order[]>) {
      state.orders = action.payload;
    },

    addOrder(state: OrderManagerState, action: PayloadAction<Order>) {
      state.orders.push(action.payload);
    },

    removeOrder(state: OrderManagerState, action: PayloadAction<number>) {
      state.orders = state.orders.filter((order: Order) => order.id !== action.payload);
    },

    editDoctor(state: OrderManagerState, action: PayloadAction<Order>) {
      state.orders = state.orders.filter((order: Order) =>
        order.id === action.payload.id ? action.payload : order
      );
    },

    resetOrders(state: OrderManagerState) {
      state.orders = initialStateOrderManager.orders;
    },

    setFilteredOrders(state: OrderManagerState, action: PayloadAction<Order[]>) {
      state.filteredOrders = action.payload;
    },

    resetFilteredOrders(state: OrderManagerState) {
      state.filteredOrders = [];
    },

    resetSelectedOrder(state: OrderManagerState) {
      state.selectedOrder = initialStateOrderManager.selectedOrder;
      state.hasSelectedOrder = false;
    },

    setSelectedOrder(state: OrderManagerState, action: PayloadAction<number>) {
      state.selectedOrder = action.payload;
      state.hasSelectedOrder = true;
    },

    setSelectedDashboardTab(state: OrderManagerState, action: PayloadAction<OrdersDashboardTabs>) {
      state.selectedDashboardTab = action.payload;
    },

    setOrderTypeEntries(state: OrderManagerState, action: PayloadAction<OrderTypeEntry[]>) {
      state.orderTypeEntries = action.payload;
    },

    addOrderTypeEntry(state: OrderManagerState, action: PayloadAction<OrderTypeEntry>) {
      state.orderTypeEntries.push(action.payload);
    },

    removeOrderTypeEntry(state: OrderManagerState, action: PayloadAction<number>) {
      state.orderTypeEntries = state.orderTypeEntries.filter(
        (order: OrderTypeEntry) => order.id !== action.payload
      );
    },

    editOrderTypeEntry(state: OrderManagerState, action: PayloadAction<OrderTypeEntry>) {
      state.orderTypeEntries = state.orderTypeEntries.filter((order: OrderTypeEntry) =>
        order.id === action.payload.id ? action.payload : order
      );
    },

    resetOrderTypeEntryColors(state: OrderManagerState) {
      state.orderTypeEntryColors = initialStateOrderManager.orderTypeEntryColors;
    },

    resetOrderTypeEntryStatus(state: OrderManagerState) {
      state.orderTypeEntryStatus = initialStateOrderManager.orderTypeEntryStatus;
    },

    resetOrderTypeEntries(state: OrderManagerState) {
      state.orderTypeEntries = initialStateOrderManager.orderTypeEntries;
    },

    setFilteredOrderTypeEntries(state: OrderManagerState, action: PayloadAction<OrderTypeEntry[]>) {
      state.filteredOrderTypeEntries = action.payload;
    },

    resetFilteredOrderTypeEntries(state: OrderManagerState) {
      state.filteredOrderTypeEntries = [];
    },

    resetSelectedOrderTypeEntry(state: OrderManagerState) {
      state.selectedOrderTypeEntry = initialStateOrderManager.selectedOrderTypeEntry;
      state.hasSelectedOrderTypeEntry = false;
    },

    setSelectedOrderTypeEntry(state: OrderManagerState, action: PayloadAction<number>) {
      state.selectedOrderTypeEntry = action.payload;
      state.hasSelectedOrderTypeEntry = true;
    },
  },
  extraReducers: (builder) => {
    // Request Orders
    builder.addCase(requestOrders.pending, (state: OrderManagerState) => {
      state.isLoadingOrders = true;
    });

    builder.addCase(
      requestOrders.fulfilled,
      (state: OrderManagerState, { payload }: PayloadAction<any>) => {
        state.orders = payload.data.results;
        state.isLoadingOrders = false;
        state.hasErrorLoadingOrders = false;
      }
    );

    builder.addCase(
      requestOrders.rejected,
      (state: OrderManagerState, action: PayloadAction<any>) => {
        state.hasErrorLoadingOrders = true;
        state.isLoadingOrders = false;
      }
    );

    // Add Order
    builder.addCase(
      addOrder.fulfilled,
      (state: OrderManagerState, { payload }: PayloadAction<any>) => {
        state.orders.push(payload.data.results);
      }
    );

    builder.addCase(addOrder.rejected, (state: OrderManagerState, action: PayloadAction<any>) => {
      state.hasErrorAddingOrder = true;
    });

    // Edit Order
    builder.addCase(
      editOrder.fulfilled,
      (state: OrderManagerState, { payload }: PayloadAction<any>) => {
        state.orders.filter((order: Order) => (order.id === payload.id ? payload : order));
      }
    );

    builder.addCase(editOrder.rejected, (state: OrderManagerState, action: PayloadAction<any>) => {
      state.hasErrorEditingOrder = true;
    });

    // Remove Order
    builder.addCase(
      removeOrder.fulfilled,
      (state: OrderManagerState, { payload }: PayloadAction<any>) => {
        state.orders = state.orders.filter((order: Order) => order.id !== payload.orderId);
      }
    );

    builder.addCase(
      removeOrder.rejected,
      (state: OrderManagerState, action: PayloadAction<any>) => {
        state.hasErrorRemovingOrder = true;
      }
    );

    // Request Order Type Entries
    builder.addCase(requestOrderTypeEntries.pending, (state: OrderManagerState) => {
      state.isLoadingOrderTypeEntries = true;
    });

    builder.addCase(
      requestOrderTypeEntries.fulfilled,
      (state: OrderManagerState, { payload }: PayloadAction<any>) => {
        state.orderTypeEntries = payload.data.results;
        state.isLoadingOrderTypeEntries = false;
        state.hasErrorLoadingOrderTypeEntries = false;
      }
    );

    builder.addCase(
      requestOrderTypeEntries.rejected,
      (state: OrderManagerState, action: PayloadAction<any>) => {
        state.hasErrorLoadingOrderTypeEntries = true;
        state.isLoadingOrderTypeEntries = false;
      }
    );

    // Add Order Type Entry
    builder.addCase(
      addOrderTypeEntry.fulfilled,
      (state: OrderManagerState, { payload }: PayloadAction<any>) => {
        state.orderTypeEntries.push(payload.data.results);
      }
    );

    builder.addCase(
      addOrderTypeEntry.rejected,
      (state: OrderManagerState, action: PayloadAction<any>) => {
        state.hasErrorAddingOrderTypeEntry = true;
      }
    );

    // Edit Order Type Entry
    builder.addCase(
      editOrderTypeEntry.fulfilled,
      (state: OrderManagerState, { payload }: PayloadAction<any>) => {
        state.orderTypeEntries.filter((orderTypeEntry: OrderTypeEntry) =>
          orderTypeEntry.id === payload.id ? payload : orderTypeEntry
        );
      }
    );

    builder.addCase(
      editOrderTypeEntry.rejected,
      (state: OrderManagerState, action: PayloadAction<any>) => {
        state.hasErrorEditingOrderTypeEntry = true;
      }
    );

    // Remove Order
    builder.addCase(
      removeOrderTypeEntry.fulfilled,
      (state: OrderManagerState, { payload }: PayloadAction<any>) => {
        state.orderTypeEntries = state.orderTypeEntries.filter(
          (orderTypeEntry: OrderTypeEntry) => orderTypeEntry.id !== payload.orderId
        );
      }
    );

    builder.addCase(
      removeOrderTypeEntry.rejected,
      (state: OrderManagerState, action: PayloadAction<any>) => {
        state.hasErrorRemovingOrderTypeEntry = true;
      }
    );
  },
});

export const orderManagerReducer = orderManagerSlice.reducer;

export const orderManagerActions = {
  ...orderManagerSlice.actions,
};

export const orderManagerAsyncThunk = {
  requestOrders,
  requestOrderTypeEntryColors,
  requestOrderTypeEntryStatus,
  requestOrderTypeEntries,
  addOrder,
  addOrderTypeEntry,
  removeOrder,
  removeOrderTypeEntry,
  editOrder,
  editOrderTypeEntry,
};
