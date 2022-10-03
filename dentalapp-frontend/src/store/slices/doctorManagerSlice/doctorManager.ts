/* eslint-disable @typescript-eslint/no-use-before-define */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'store/rootReducer';
import { doctorManagerAPI } from 'api';
import { DoctorsDashboardTabs } from 'modules/doctorsDashboard/models';
import { initialStateDoctorManager, DOCTOR_MANAGER_KEY } from './constants';
import {
  DoctorManagerState,
  Doctor,
  RequestDoctorDetailsPayload,
  RequestDoctorInfoPayload,
  AddDoctorPayload,
  EditDoctorDetailsPayload,
  EditDoctorInfoPayload,
  RemoveDoctorDetailsPayload,
  RemoveDoctorInfoPayload,
  DoctorDetails,
  DoctorInfo,
} from './models';

const requestDoctors = createAsyncThunk('doctorManager/requestDoctors', async (_, thunkAPI) => {
  try {
    const { userToken } = (thunkAPI.getState() as RootState).userManager;
    const response = await doctorManagerAPI.requestDoctors(userToken);
    return response;
  } catch (error) {
    thunkAPI.dispatch(doctorManagerSlice.actions.resetDoctors());
    console.log('Request Doctors Error: ', error);
    return thunkAPI.rejectWithValue(error);
  }
});

const requestSelectedDoctorDetails = createAsyncThunk(
  'doctorManager/requestSelectedDoctorDetails',
  async (requestDoctorDetailsPayload: RequestDoctorDetailsPayload, thunkAPI) => {
    try {
      const { userToken } = (thunkAPI.getState() as RootState).userManager;
      const response = await doctorManagerAPI.requestSelectedDoctorDetails(
        userToken,
        requestDoctorDetailsPayload
      );
      return response;
    } catch (error) {
      thunkAPI.dispatch(doctorManagerSlice.actions.resetSelectedDoctorDetails());
      console.log('Request Selected Doctors Error: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const requestSelectedDoctorInfo = createAsyncThunk(
  'doctorManager/requestSelectedDoctorInfo',
  async (requestSelectedDoctorInfoPayload: RequestDoctorInfoPayload, thunkAPI) => {
    try {
      const { userToken } = (thunkAPI.getState() as RootState).userManager;
      const response = await doctorManagerAPI.requestSelectedDoctorInfo(
        userToken,
        requestSelectedDoctorInfoPayload
      );
      return response;
    } catch (error) {
      thunkAPI.dispatch(doctorManagerSlice.actions.resetSelectedDoctorInfo());
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
      const response = await doctorManagerAPI.addDoctor(userToken, addDoctorPayload, user.id);
      return response;
    } catch (error) {
      console.log('Add Doctor Error: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const editDoctorDetails = createAsyncThunk(
  'doctorManager/editDoctorDetails',
  async (editDoctorDetailsPayload: EditDoctorDetailsPayload, thunkAPI) => {
    try {
      const { user, userToken } = (thunkAPI.getState() as RootState).userManager;
      const response = await doctorManagerAPI.editDoctorDetails(
        userToken,
        editDoctorDetailsPayload,
        user.id
      );
      return response;
    } catch (error) {
      console.log('Edit Doctor Details Error: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const editDoctorInfo = createAsyncThunk(
  'doctorManager/editDoctorInfo',
  async (editDoctorInfoPayload: EditDoctorInfoPayload, thunkAPI) => {
    try {
      const { user, userToken } = (thunkAPI.getState() as RootState).userManager;
      const response = await doctorManagerAPI.editDoctorInfo(
        userToken,
        editDoctorInfoPayload,
        user.id
      );
      return response;
    } catch (error) {
      console.log('Edit Doctor Info Error: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const removeDoctorDetails = createAsyncThunk(
  'doctorManager/removeDoctorDetails',
  async (removeDoctorDetailsPayload: RemoveDoctorDetailsPayload, thunkAPI) => {
    try {
      const { userToken } = (thunkAPI.getState() as RootState).userManager;
      const response = await doctorManagerAPI.removeDoctorDetails(
        userToken,
        removeDoctorDetailsPayload
      );
      return response;
    } catch (error) {
      console.log('Remove Doctor Details Error:', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const removeDoctorInfo = createAsyncThunk(
  'doctorManager/removeDoctorInfo',
  async (removeDoctorInfoPayload: RemoveDoctorInfoPayload, thunkAPI) => {
    try {
      const { userToken } = (thunkAPI.getState() as RootState).userManager;
      const response = await doctorManagerAPI.removeDoctorInfo(userToken, removeDoctorInfoPayload);
      return response;
    } catch (error) {
      console.log('Remove Doctor Info Error:', error);
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

    editDoctorDetails(state: DoctorManagerState, action: PayloadAction<DoctorDetails>) {
      state.doctors = state.doctors.filter((doctor: Doctor) =>
        doctor.id === action.payload.id ? action.payload : doctor
      );
    },

    editDoctorInfo(state: DoctorManagerState, action: PayloadAction<DoctorInfo>) {
      state.selectedDoctorInfo = action.payload;
    },

    removeDoctor(state: DoctorManagerState, action: PayloadAction<number>) {
      state.doctors = state.doctors.filter((doctor: Doctor) => doctor.id !== action.payload);
    },

    resetDoctors(state: DoctorManagerState) {
      state.doctors = initialStateDoctorManager.doctors;
    },

    resetSelectedDoctorDetails(state: DoctorManagerState) {
      state.selectedDoctorDetails = initialStateDoctorManager.selectedDoctorDetails;
    },

    resetSelectedDoctorInfo(state: DoctorManagerState) {
      state.selectedDoctorInfo = initialStateDoctorManager.selectedDoctorInfo;
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
    /*
      REQUEST DOCTOR LIST
    ____________________________________________________________________________________________________
    */

    // Request Doctor List Pending
    builder.addCase(requestDoctors.pending, (state: DoctorManagerState) => {
      state.isLoadingDoctors = true;
    });

    // Request Doctor List Fullfilled
    builder.addCase(
      requestDoctors.fulfilled,
      (state: DoctorManagerState, { payload }: PayloadAction<any>) => {
        state.doctors = payload.data.results;
        state.isLoadingDoctors = false;
        state.hasErrorLoadingDoctors = false;
      }
    );

    // Request Doctor List Rejected
    builder.addCase(
      requestDoctors.rejected,
      (state: DoctorManagerState, action: PayloadAction<any>) => {
        state.hasErrorLoadingDoctors = true;
        state.isLoadingDoctors = false;
      }
    );

    /* 
      REQUEAT SELECTED DOCTOR DETAILS
    ____________________________________________________________________________________________________
    */

    // Request Selected Doctor Details Pending
    builder.addCase(requestSelectedDoctorDetails.pending, (state: DoctorManagerState) => {
      state.isLoadingSelectedDoctorDetails = true;
    });

    // Request Selected Doctor Details Fullfilled
    builder.addCase(
      requestSelectedDoctorDetails.fulfilled,
      (state: DoctorManagerState, { payload }: PayloadAction<any>) => {
        state.selectedDoctorDetails = payload.data;
        state.isLoadingSelectedDoctorDetails = false;
        state.hasErrorLoadingSelectedDoctorDetails = false;
      }
    );

    // Request Selected Doctor Details Rejected
    builder.addCase(
      requestSelectedDoctorDetails.rejected,
      (state: DoctorManagerState, action: PayloadAction<any>) => {
        state.hasErrorLoadingSelectedDoctorDetails = true;
        state.isLoadingSelectedDoctorDetails = false;
      }
    );

    /* 
      REQUEAT SELECTED DOCTOR INFO
    ____________________________________________________________________________________________________
    */

    // Request Selected Doctor Info Pending
    builder.addCase(requestSelectedDoctorInfo.pending, (state: DoctorManagerState) => {
      state.isLoadingSelectedDoctorInfo = true;
    });

    // Request Selected Doctor Info Fullfilled
    builder.addCase(
      requestSelectedDoctorInfo.fulfilled,
      (state: DoctorManagerState, { payload }: PayloadAction<any>) => {
        const doctorInfo = payload.data.results[0];
        state.selectedDoctorInfo = doctorInfo;
        state.isLoadingSelectedDoctorInfo = false;
        state.hasErrorLoadingSelectedDoctorInfo = false;
      }
    );

    // Request Selected Doctor Info Rejected
    builder.addCase(
      requestSelectedDoctorInfo.rejected,
      (state: DoctorManagerState, action: PayloadAction<any>) => {
        state.hasErrorLoadingSelectedDoctorInfo = true;
        state.isLoadingSelectedDoctorInfo = false;
      }
    );

    /*
      ADD DOCTOR
    ____________________________________________________________________________________________________
    */

    // Add Doctor Fullfilled
    builder.addCase(
      addDoctor.fulfilled,
      (state: DoctorManagerState, { payload }: PayloadAction<any>) => {
        state.doctors.push(payload.data);
      }
    );

    // Add Doctor Rejected
    builder.addCase(addDoctor.rejected, (state: DoctorManagerState, action: PayloadAction<any>) => {
      state.hasErrorAddingDoctor = true;
    });

    /* 
      EDIT DOCTOR DETAILS
    ____________________________________________________________________________________________________
    */

    // Edit Doctor Details Fullfilled
    builder.addCase(
      editDoctorDetails.fulfilled,
      (state: DoctorManagerState, { payload }: PayloadAction<any>) => {
        state.doctors.filter((doctor: Doctor) => (doctor.id === payload.id ? payload : doctor));
      }
    );

    // Edit Doctor Details Rejected
    builder.addCase(
      editDoctorDetails.rejected,
      (state: DoctorManagerState, action: PayloadAction<any>) => {
        state.hasErrorEditingDoctorDetails = true;
      }
    );

    /* 
      EDIT DOCTOR INFO
    ____________________________________________________________________________________________________
    */

    // Edit Doctor Info Fullfilled
    builder.addCase(
      editDoctorInfo.fulfilled,
      (state: DoctorManagerState, { payload }: PayloadAction<any>) => {
        state.doctors.filter((doctor: Doctor) => (doctor.id === payload.id ? payload : doctor));
      }
    );

    // Edit Doctor Info Rejected
    builder.addCase(
      editDoctorInfo.rejected,
      (state: DoctorManagerState, action: PayloadAction<any>) => {
        state.hasErrorEditingDoctorInfo = true;
      }
    );

    /*
      REMOVE DOCTOR DETAILS
    ____________________________________________________________________________________________________
    */

    // Remove Doctor Details Fullfilled
    builder.addCase(
      removeDoctorDetails.fulfilled,
      (state: DoctorManagerState, { payload }: PayloadAction<any>) => {
        state.doctors = state.doctors.filter((doctor: Doctor) => doctor.id !== payload.data.id);
      }
    );

    // Remove Doctor Info Rejected
    builder.addCase(
      removeDoctorDetails.rejected,
      (state: DoctorManagerState, action: PayloadAction<any>) => {
        state.hasErrorRemovingDoctorDetails = true;
      }
    );

    /*
      REMOVE DOCTOR INFO
    ____________________________________________________________________________________________________
    */

    // Remove Doctor Fullfilled
    builder.addCase(
      removeDoctorInfo.fulfilled,
      (state: DoctorManagerState, { payload }: PayloadAction<any>) => {
        state.doctors = state.doctors.filter((doctor: Doctor) => doctor.id !== payload.data.id);
      }
    );

    // Remove Doctor Rejected
    builder.addCase(
      removeDoctorInfo.rejected,
      (state: DoctorManagerState, action: PayloadAction<any>) => {
        state.hasErrorRemovingDoctorInfo = true;
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
  requestSelectedDoctorInfo,
  addDoctor,
  editDoctorDetails,
  editDoctorInfo,
  removeDoctorDetails,
  removeDoctorInfo,
};
