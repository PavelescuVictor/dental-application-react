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
  },
});

export const orderManagerReducer = orderManagerSlice.reducer;

export const orderManagerActions = {
  ...orderManagerSlice.actions,
};

export const orderManagerAsyncThunk = {
  requestOrders,
  addOrder,
  removeOrder,
  editOrder,
};
