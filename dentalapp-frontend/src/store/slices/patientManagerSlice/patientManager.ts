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

const requestPatients = createAsyncThunk('patientManager/requestPatients', async (_, thunkAPI) => {
  try {
    const { userToken } = (thunkAPI.getState() as RootState).userManager;
    const response = patientManagerAPI.requestPatients(userToken as string);
    return response;
  } catch (error) {
    thunkAPI.dispatch(patientManagerSlice.actions.resetPatients());
    console.log('Request Patients Error: ', error);
    return thunkAPI.rejectWithValue(error);
  }
});

const addPatient = createAsyncThunk(
  'patientManager/addPatient',
  async (addPatientPayload: AddPatientPayload, thunkAPI) => {
    try {
      const { user, userToken } = (thunkAPI.getState() as RootState).userManager;
      const response = patientManagerAPI.addPatient(
        userToken as string,
        addPatientPayload,
        user?.id as string
      );
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
      const response = patientManagerAPI.removePatient(userToken as string, removePatientPayload);
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
      const response = patientManagerAPI.editPatient(
        userToken as string,
        editPatientPayload,
        user?.id as string
      );
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
      state.patients = action.payload;
    },

    addPatient(state: PatientManagerState, action: PayloadAction<Patient>) {
      state.patients.push(action.payload);
    },

    removePatient(state: PatientManagerState, action: PayloadAction<string>) {
      state.patients.filter((patient: Patient) => patient.id !== action.payload);
    },

    editPatient(state: PatientManagerState, action: PayloadAction<Patient>) {
      state.patients.filter((patient: Patient) =>
        patient.id === action.payload.id ? action.payload : patient
      );
    },

    resetPatients(state: PatientManagerState) {
      state.patients = initialStatePatientManager.patients;
    },

    setFilteredPatients(state: PatientManagerState, action: PayloadAction<Patient[]>) {
      state.filteredPatients = action.payload;
    },

    resetFilteredPatients(state: PatientManagerState) {
      state.filteredPatients = [];
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
    // Request Patients
    builder.addCase(requestPatients.pending, (state: PatientManagerState) => {
      state.isLoadingPatients = true;
    });

    builder.addCase(
      requestPatients.fulfilled,
      (state: PatientManagerState, { payload }: PayloadAction<any>) => {
        state.patients = payload.data.results;
      }
    );

    builder.addCase(
      requestPatients.rejected,
      (state: PatientManagerState, action: PayloadAction<any>) => {
        state.hasErrorLoadingPatients = true;
      }
    );

    // Add Patient
    builder.addCase(
      addPatient.fulfilled,
      (state: PatientManagerState, { payload }: PayloadAction<any>) => {
        state.patients.push(payload.data.results);
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
        state.patients.filter((patient: Patient) =>
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
      removePatient.fulfilled,
      (state: PatientManagerState, { payload }: PayloadAction<any>) => {
        state.patients = state.patients.filter(
          (patient: Patient) => patient.id !== payload.patientId
        );
      }
    );

    builder.addCase(
      removePatient.rejected,
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
