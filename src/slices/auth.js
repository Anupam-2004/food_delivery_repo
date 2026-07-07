import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import AuthService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));

// ========== REGISTER ==========
export const register = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }, thunkAPI) => {
    try {
     // console.log(username, email, password);
      const response = await AuthService.register(username, email, password);
      thunkAPI.dispatch(setMessage(response.data.message));
     // console.log("response",response);
      return response.data;
    } catch (error) {
      const message =
        (error.response?.data?.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

// ========== LOGIN ==========
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(username, password);
      return { user: data };
    } catch (error) {
      const message =
        (error.response?.data?.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

// ========== LOGOUT ==========
export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

// ========== INITIAL STATE ==========
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

// ========== SLICE ==========
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(register.fulfilled, (state) => {
        state.isLoggedIn = false;
      })
      .addCase(register.rejected, (state) => {
        state.isLoggedIn = false;
      })
      // Login cases
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      // Logout case
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
      });
  },
});

export default authSlice.reducer;
