/* eslint-disable @typescript-eslint/no-use-before-define */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from 'store/rootReducer';
import { doctorManagerAPI } from 'api';
import { initialStateDoctorManager, DOCTOR_MANAGER_KEY } from './constants';
import { DoctorManagerState, Doctor } from './models';

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

// filterDoctorList({ commit, getters }, query) {
//     commit("filteredDoctorList_empty");
//     const filteredDoctorList = [];
//     getters.doctorList.forEach((item) => {
//         if (
//             (query.filteredInputFirstName === "") &
//             item.lastName.includes(query.filteredInputLastName)
//         )
//             filteredDoctorList.push(item);
//         else if (
//             (query.filteredInputLastName === "") &
//             item.firstName.includes(query.filteredInputFirstName)
//         )
//             filteredDoctorList.push(item);
//         else if (
//             (query.filteredInputFirstName != "") &
//             (query.filteredInputLastName != "")
//         ) {
//             if (
//                 item.firstName.includes(query.filteredInputFirstName) &
//                 item.lastName.includes(query.filteredInputLastName)
//             )
//                 filteredDoctorList.push(item);
//         }
//     });
//     commit("filteredDoctorList_success", filteredDoctorList);
// },

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
    } catch {
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
      state.doctorList = state.doctorList.filter((doctor) =>
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
    builder.addCase(
      requestDoctorList.pending,
      (state: DoctorManagerState, { payload }: ActionPayload<Doctor[]>) => {
        state.isLoadingDoctors = true;
      }
    );

    builder.addCase(login.fulfilled, (state: UserManagerState, { payload }: PayloadAction<any>) => {
      const { user, userToken, userTokenExpiry } = payload;
      state.user = user;
      state.userToken = userToken;
      state.userTokenExpiry = userTokenExpiry;
    });

    builder.addCase(login.rejected, (state: UserManagerState) => {
      state.hasErrorLoggingIn = true;
    });
  },
});

export const doctorManagerReducer = doctorManagerSlice.reducer;

export const doctorManagerActions = {
  ...doctorManagerSlice.actions,
};
