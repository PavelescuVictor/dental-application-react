/* eslint-disable @typescript-eslint/no-use-before-define */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'store/rootReducer';
import { doctorManagerAPI } from 'api';
import { DoctorsDashboardTabs } from 'modules/doctorsDashboard/models';
import { initialStateDoctorManager, DOCTOR_MANAGER_KEY } from './constants';
import {
  DoctorManagerState,
  Doctor,
  AddDoctorPayload,
  EditDoctorPayload,
  RemoveDoctorPayload,
} from './models';

const requestDoctors = createAsyncThunk('doctorManager/requestDoctors', async (_, thunkAPI) => {
  try {
    const { userToken } = (thunkAPI.getState() as RootState).userManager;
    const response = doctorManagerAPI.requestDoctors(userToken);
    return response;
  } catch (error) {
    thunkAPI.dispatch(doctorManagerSlice.actions.resetDoctors());
    console.log('Request Doctors Error: ', error);
    return thunkAPI.rejectWithValue(error);
  }
});

const requestSelectedDoctorDetails = createAsyncThunk(
  'doctorManager/requestSelectedDoctorDetails',
  async (_, thunkAPI) => {
    try {
      console.log('here');
      const { userToken } = (thunkAPI.getState() as RootState).userManager;
      console.log('here');
      const response = doctorManagerAPI.requestSelectedDoctorDetails(userToken);
      return response;
    } catch (error) {
      thunkAPI.dispatch(doctorManagerSlice.actions.resetSelectedDoctorDetails());
      console.log('Request Selected Doctors Error: ', error);
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
      state.doctors = action.payload;
    },

    addDoctor(state: DoctorManagerState, action: PayloadAction<Doctor>) {
      state.doctors.push(action.payload);
    },

    removeDoctor(state: DoctorManagerState, action: PayloadAction<number>) {
      state.doctors = state.doctors.filter((doctor: Doctor) => doctor.id !== action.payload);
    },

    editDoctor(state: DoctorManagerState, action: PayloadAction<Doctor>) {
      state.doctors = state.doctors.filter((doctor: Doctor) =>
        doctor.id === action.payload.id ? action.payload : doctor
      );
    },

    resetDoctors(state: DoctorManagerState) {
      state.doctors = initialStateDoctorManager.doctors;
    },

    resetSelectedDoctorDetails(state: DoctorManagerState) {
      state.selectedDoctorDetails = initialStateDoctorManager.selectedDoctorDetails;
    },

    setFilteredDoctorList(state: DoctorManagerState, action: PayloadAction<Doctor[]>) {
      state.filteredDoctors = action.payload;
    },

    resetFilteredDoctors(state: DoctorManagerState) {
      state.filteredDoctors = [];
    },

    resetSelectedDoctor(state: DoctorManagerState) {
      state.selectedDoctor = initialStateDoctorManager.selectedDoctor;
      state.hasSelectedDoctor = false;
    },

    setSelectedDoctor(state: DoctorManagerState, action: PayloadAction<number>) {
      state.selectedDoctor = action.payload;
      state.hasSelectedDoctor = true;
    },

    setSelectedDashboardTab(
      state: DoctorManagerState,
      action: PayloadAction<DoctorsDashboardTabs>
    ) {
      state.selectedDashboardTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Request Doctors
    builder.addCase(requestDoctors.pending, (state: DoctorManagerState) => {
      state.isLoadingDoctors = true;
    });

    builder.addCase(
      requestDoctors.fulfilled,
      (state: DoctorManagerState, { payload }: PayloadAction<any>) => {
        state.doctors = payload.data.results;
        state.isLoadingDoctors = false;
        state.hasErrorLoadingDoctors = false;
      }
    );

    builder.addCase(
      requestDoctors.rejected,
      (state: DoctorManagerState, action: PayloadAction<any>) => {
        state.hasErrorLoadingDoctors = true;
        state.isLoadingDoctors = false;
      }
    );

    // Request Selected Doctor Details
    builder.addCase(requestSelectedDoctorDetails.pending, (state: DoctorManagerState) => {
      state.isLoadingSelectedDoctorDetails = true;
    });

    builder.addCase(
      requestSelectedDoctorDetails.fulfilled,
      (state: DoctorManagerState, { payload }: PayloadAction<any>) => {
        state.selectedDoctorDetails = payload.data.results;
        state.isLoadingSelectedDoctorDetails = false;
        state.hasErrorLoadingSelectedDoctorDetails = false;
      }
    );

    builder.addCase(
      requestSelectedDoctorDetails.rejected,
      (state: DoctorManagerState, action: PayloadAction<any>) => {
        state.hasErrorLoadingSelectedDoctorDetails = true;
        state.isLoadingSelectedDoctorDetails = false;
      }
    );

    // Add Doctor
    builder.addCase(
      addDoctor.fulfilled,
      (state: DoctorManagerState, { payload }: PayloadAction<any>) => {
        state.doctors.push(payload.data.results);
      }
    );

    builder.addCase(addDoctor.rejected, (state: DoctorManagerState, action: PayloadAction<any>) => {
      state.hasErrorAddingDoctor = true;
    });

    // Edit Doctor
    builder.addCase(
      editDoctor.fulfilled,
      (state: DoctorManagerState, { payload }: PayloadAction<any>) => {
        state.doctors.filter((doctor: Doctor) => (doctor.id === payload.id ? payload : doctor));
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
        state.doctors = state.doctors.filter((doctor: Doctor) => doctor.id !== payload.doctorId);
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

export const doctorManagerAsyncThunk = {
  requestDoctors,
  requestSelectedDoctorDetails,
  addDoctor,
  removeDoctor,
  editDoctor,
};
