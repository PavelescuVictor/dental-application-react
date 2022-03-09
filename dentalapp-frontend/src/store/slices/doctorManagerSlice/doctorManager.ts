/* eslint-disable @typescript-eslint/no-use-before-define */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'store/rootReducer';
import { doctorManagerAPI } from 'api';
import { initialStateDoctorManager, DOCTOR_MANAGER_KEY } from './constants';
import {
  DoctorManagerState,
  Doctor,
  AddDoctorPayload,
  EditDoctorPayload,
  RemoveDoctorPayload,
} from './models';

const requestDoctorList = createAsyncThunk(
  'doctorManager/requestDoctorList',
  async (_, thunkAPI) => {
    try {
      const { userToken } = (thunkAPI.getState() as RootState).userManager;
      const response = doctorManagerAPI.requestDoctorList(userToken);
      return response;
    } catch (error) {
      thunkAPI.dispatch(doctorManagerSlice.actions.resetDoctorList());
      console.log('Request Doctor List Error: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const addDoctor = createAsyncThunk(
  'doctorManager/addDoctor',
  async (addDoctorPayload: AddDoctorPayload, thunkAPI) => {
    try {
      const { user, userToken } = (thunkAPI.getState() as RootState).userManager;
      const response = doctorManagerAPI.addDoctor(userToken, addDoctorPayload, user.id);
      return response;
    } catch (error) {
      console.log('Add Doctor Error: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const removeDoctor = createAsyncThunk(
  'doctorManager/removeDoctor',
  async (removeDoctorPayload: RemoveDoctorPayload, thunkAPI) => {
    try {
      const { userToken } = (thunkAPI.getState() as RootState).userManager;
      const response = doctorManagerAPI.removeDoctor(userToken, removeDoctorPayload);
      return response;
    } catch (error) {
      console.log('Remove Doctor Error:');
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const editDoctor = createAsyncThunk(
  'doctorManager/editDoctor',
  async (editDoctorPayload: EditDoctorPayload, thunkAPI) => {
    try {
      const { user, userToken } = (thunkAPI.getState() as RootState).userManager;
      const response = doctorManagerAPI.editDoctor(userToken, editDoctorPayload, user.id);
      return response;
    } catch (error) {
      console.log('Edit Doctor Error: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const doctorManagerSlice = createSlice({
  name: DOCTOR_MANAGER_KEY,
  initialState: initialStateDoctorManager,
  reducers: {
    setDoctors(state: DoctorManagerState, action: PayloadAction<Doctor[]>) {
      state.doctorList = action.payload;
    },

    addDoctor(state: DoctorManagerState, action: PayloadAction<Doctor>) {
      state.doctorList.push(action.payload);
    },

    removeDoctor(state: DoctorManagerState, action: PayloadAction<string>) {
      state.doctorList = state.doctorList.filter((doctor: Doctor) => doctor.id !== action.payload);
    },

    editDoctor(state: DoctorManagerState, action: PayloadAction<Doctor>) {
      state.doctorList = state.doctorList.filter((doctor: Doctor) =>
        doctor.id === action.payload.id ? action.payload : doctor
      );
    },

    resetDoctorList(state: DoctorManagerState) {
      state.doctorList = initialStateDoctorManager.doctorList;
    },

    setFilteredDoctorList(state: DoctorManagerState, action: PayloadAction<Doctor[]>) {
      state.filteredDoctorList = action.payload;
    },

    resetFilteredDoctorLisrt(state: DoctorManagerState) {
      state.filteredDoctorList = [];
    },

    resetSelectedDoctor(state: DoctorManagerState) {
      state.selectedDoctor = initialStateDoctorManager.selectedDoctor;
      state.hasSelectedDoctor = false;
    },

    setSelectedDoctor(state: DoctorManagerState, action: PayloadAction<Doctor>) {
      state.selectedDoctor = action.payload;
      state.hasSelectedDoctor = true;
    },
  },
  extraReducers: (builder) => {
    // Request Doctor List
    builder.addCase(requestDoctorList.pending, (state: DoctorManagerState) => {
      state.isLoadingDoctors = true;
    });

    builder.addCase(
      requestDoctorList.fulfilled,
      (state: DoctorManagerState, { payload }: PayloadAction<any>) => {
        state.doctorList = payload.data.results;
      }
    );

    builder.addCase(
      requestDoctorList.rejected,
      (state: DoctorManagerState, action: PayloadAction<any>) => {
        state.hasErrorLoadingDoctors = true;
      }
    );

    // Add Doctor
    builder.addCase(
      addDoctor.fulfilled,
      (state: DoctorManagerState, { payload }: PayloadAction<any>) => {
        state.doctorList.push(payload.data.results);
      }
    );

    builder.addCase(addDoctor.rejected, (state: DoctorManagerState, action: PayloadAction<any>) => {
      state.hasErrorAddingDoctor = true;
    });

    // Edit Doctor
    builder.addCase(
      editDoctor.fulfilled,
      (state: DoctorManagerState, { payload }: PayloadAction<any>) => {
        state.doctorList.filter((doctor: Doctor) => (doctor.id === payload.id ? payload : doctor));
      }
    );

    builder.addCase(
      editDoctor.rejected,
      (state: DoctorManagerState, action: PayloadAction<any>) => {
        state.hasErrorEditingDoctor = true;
      }
    );

    // Remove Doctor
    builder.addCase(
      removeDoctor.fulfilled,
      (state: DoctorManagerState, { payload }: PayloadAction<any>) => {
        state.doctorList = state.doctorList.filter(
          (doctor: Doctor) => doctor.id !== payload.doctorId
        );
      }
    );

    builder.addCase(
      removeDoctor.rejected,
      (state: DoctorManagerState, action: PayloadAction<any>) => {
        state.hasErrorRemovingDoctor = true;
      }
    );
  },
});

export const doctorManagerReducer = doctorManagerSlice.reducer;

export const doctorManagerActions = {
  ...doctorManagerSlice.actions,
};
