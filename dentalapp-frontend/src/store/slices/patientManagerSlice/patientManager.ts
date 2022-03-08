/* eslint-disable @typescript-eslint/no-use-before-define */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'store/rootReducer';
import { patientManagerAPI } from 'api';
import { initialStatePatientManager, PATIENT_MANAGER_KEY } from './constants';
import {
  PatientManagerState,
  Patient,
  AddPatientPayload,
  EditPatientPayload,
  RemovePatientPayload,
} from './models';

const requestPatientList = createAsyncThunk(
  'patientManager/requestPatientList',
  async (_, thunkAPI) => {
    try {
      const { userToken } = (thunkAPI.getState() as RootState).userManager;
      const response = patientManagerAPI.requestPatientList(userToken);
      return response;
    } catch (error) {
      thunkAPI.dispatch(patientManagerSlice.actions.resetPatientList());
      console.log('Request Patient List Error: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const addPatient = createAsyncThunk(
  'patientManager/addPatient',
  async (addPatientPayload: AddPatientPayload, thunkAPI) => {
    try {
      const { user, userToken } = (thunkAPI.getState() as RootState).userManager;
      const response = patientManagerAPI.addPatient(userToken, addPatientPayload, user.id);
      return response;
    } catch (error) {
      console.log('Add Patient Error: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const removePatient = createAsyncThunk(
  'patientManager/removePatient',
  async (removePatientPayload: RemovePatientPayload, thunkAPI) => {
    try {
      const { userToken } = (thunkAPI.getState() as RootState).userManager;
      const response = patientManagerAPI.removePatient(userToken, removePatientPayload);
      return response;
    } catch (error) {
      console.log('Remove Patient Error:');
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const editPatient = createAsyncThunk(
  'patientManager/editPatient',
  async (editPatientPayload: EditPatientPayload, thunkAPI) => {
    try {
      const { user, userToken } = (thunkAPI.getState() as RootState).userManager;
      const response = patientManagerAPI.editPatient(userToken, editPatientPayload, user.id);
      return response;
    } catch (error) {
      console.log('Edit Patient Error: ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const patientManagerSlice = createSlice({
  name: PATIENT_MANAGER_KEY,
  initialState: initialStatePatientManager,
  reducers: {
    setPatients(state: PatientManagerState, action: PayloadAction<Patient[]>) {
      state.patientList = action.payload;
    },

    addPatient(state: PatientManagerState, action: PayloadAction<Patient>) {
      state.patientList.push(action.payload);
    },

    removePatient(state: PatientManagerState, action: PayloadAction<string>) {
      state.patientList.filter((patient: Patient) => patient.id !== action.payload);
    },

    editPatient(state: PatientManagerState, action: PayloadAction<Patient>) {
      state.patientList.filter((patient: Patient) =>
        patient.id === action.payload.id ? action.payload : patient
      );
    },

    resetPatientList(state: PatientManagerState) {
      state.patientList = initialStatePatientManager.patientList;
    },

    setFilteredPatientList(state: PatientManagerState, action: PayloadAction<Patient[]>) {
      state.filteredPatientList = action.payload;
    },

    resetFilteredPatientLisrt(state: PatientManagerState) {
      state.filteredPatientList = [];
    },

    resetSelectedPatient(state: PatientManagerState) {
      state.selectedPatient = initialStatePatientManager.selectedPatient;
      state.hasSelectedPatient = false;
    },

    setSelectedPatient(state: PatientManagerState, action: PayloadAction<Patient>) {
      state.selectedPatient = action.payload;
      state.hasSelectedPatient = true;
    },
  },
  extraReducers: (builder) => {
    // Request Patient List
    builder.addCase(requestPatientList.pending, (state: PatientManagerState) => {
      state.isLoadingPatients = true;
    });

    builder.addCase(
      requestPatientList.fulfilled,
      (state: PatientManagerState, { payload }: PayloadAction<any>) => {
        state.patientList = payload.data.results;
      }
    );

    builder.addCase(
      requestPatientList.rejected,
      (state: PatientManagerState, action: PayloadAction<any>) => {
        state.hasErrorLoadingPatients = true;
      }
    );

    // Add Patient
    builder.addCase(
      addPatient.fulfilled,
      (state: PatientManagerState, { payload }: PayloadAction<any>) => {
        state.patientList.push(payload.data.results);
      }
    );

    builder.addCase(
      addPatient.rejected,
      (state: PatientManagerState, action: PayloadAction<any>) => {
        state.hasErrorAddingPatient = true;
      }
    );

    // Edit Patient
    builder.addCase(
      editPatient.fulfilled,
      (state: PatientManagerState, { payload }: PayloadAction<any>) => {
        state.patientList.filter((patient: Patient) =>
          patient.id === payload.id ? payload : patient
        );
      }
    );

    builder.addCase(
      editPatient.rejected,
      (state: PatientManagerState, action: PayloadAction<any>) => {
        state.hasErrorEditingPatient = true;
      }
    );

    // Remove Patient
    builder.addCase(
      requestPatientList.fulfilled,
      (state: PatientManagerState, { payload }: PayloadAction<any>) => {
        state.patientList = state.patientList.filter(
          (patient: Patient) => patient.id !== payload.patientId
        );
      }
    );

    builder.addCase(
      requestPatientList.rejected,
      (state: PatientManagerState, action: PayloadAction<any>) => {
        state.hasErrorRemovingPatient = true;
      }
    );
  },
});

export const patientManagerReducer = patientManagerSlice.reducer;

export const patientManagerActions = {
  ...patientManagerSlice.actions,
};
